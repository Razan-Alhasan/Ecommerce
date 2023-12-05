import slugify from "slugify";
import productModel from "../../DB/Models/productModel.js";
import cloudinary from "../Services/cloudinary.js";
import categoryModel from "../../DB/Models/categoryModel.js";
import subCategoryModel from "../../DB/Models/subCategoryModel.js";
import { pagination } from "../Services/pagination.js";

export const getProducts = async (req, res, next) => {
    const {skip,limit} = pagination(req.query.page,req.query.limit);
    let queryObject = { ...req.query };
    const execQuery = ['skip', 'limit', 'page', 'sort', 'search'];
    execQuery.map((ele) => {
        delete queryObject[ele];
    })
    queryObject = JSON.stringify(queryObject);
    queryObject = queryObject.replace(/\b(lt|lte|gt|gte|in|nin|neq|eq)\b/g, match=>`$${match}`);
    queryObject = JSON.parse(queryObject);
    const mongooseQuery = productModel.find(queryObject).limit(limit).skip(skip)
    mongooseQuery.find({
        $or :[
            { name:{$regex: new RegExp(req.query.search), $options: 'i' } },
            { description:{$regex: new RegExp(req.query.search), $options: 'i' } }
        ]
    })
    mongooseQuery.select('name mainImage')
    const products = await mongooseQuery.sort(req.query.sort?.replaceAll(',', ' '));
    return res.json({message:"success",products});
};
export const createProduct = async (req, res, next) => {
        const { name, price, discount, categoryId, subCategoryId } = req.body;
        const checkCategory = await categoryModel.findById(categoryId);
        if (!checkCategory) {
        return next(new Error("category not found!", { cause : 404 }));
    }
    const checkSubCategory = await subCategoryModel.findById(subCategoryId);
    if (!checkSubCategory) {
        return next(new Error("sub category not found!", { cause : 404 }));
    }
    req.body.slug = slugify(name);
    req.body.finalPrice = price - (price * (discount || 0) / 100).toFixed(2);
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.mainImage[0].path, {
        folder: `${process.env.APP_NAME}/Products/mainImage`
    })
    req.body.mainImage = { secure_url, public_id };
    req.body.subImages = [];
    for (const image of req.files.subImages) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(image.path, {
            folder: `${process.env.APP_NAME}/Products/subImages`
        })
        req.body.subImages.push({ secure_url, public_id });
    }
    req.body.createdBy = req.user._id;
    req.body.updatedBy = req.user._id;
    const product = await productModel.create(req.body);
    if (!product) {
        return next(new Error("error while creating product", { cause : 400 }));
    }
    return res.status(201).json({message: "success", product})
};
export const getProductById = async (req, res, next) => {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
        return next (new Error('product not found'), {cause: 404});
    }
    return res.status(200).json({message: "success", product})
}
export const getProductsByCategory = async (req, res, next) => {
    const { catId } = req.params;
    const products = await productModel.find({ categoryId: catId });;
    if (!products) {
        return next (new Error('products not found'), {cause: 404});
    }
    return res.status(200).json({message: "success", products})
}
