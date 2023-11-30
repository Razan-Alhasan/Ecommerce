import slugify from "slugify";
import productModel from "../../DB/Models/productModel.js";
import cloudinary from "../Services/cloudinary.js";
import categoryModel from "../../DB/Models/categoryModel.js";
import subCategoryModel from "../../DB/Models/subCategoryModel.js";

export const getProducts = async(req, res, next) => {
    const products = await productModel.find();
    res.status(200).json({message: "success", products});
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
        folder: `${process.env.APP_NAME}/Products/${name}/mainImage`
    })
    req.body.mainImage = { secure_url, public_id };
    req.body.subImages = [];
    for (const image of req.files.subImages) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(image.path, {
            folder: `${process.env.APP_NAME}/Products/${name}/subImages`
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
