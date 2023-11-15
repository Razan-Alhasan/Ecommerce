import slugify from "slugify";
import productModel from "../../DB/Models/productModel.js";
import cloudinary from "../Services/cloudinary.js";
import categoryModel from "../../DB/Models/categoryModel.js";
import subCategoryModel from "../../DB/Models/subCategoryModel.js";

export const getProducts = (req, res) => {
    return res.json({message: "products"})
};
export const createProduct = async (req, res) => {
    const { name, price, discount, categoryId, subCategoryId } = req.body;
    const checkCategory = await categoryModel.findById(categoryId);
    if (!checkCategory) {
        return res.status(404).json({message:"Category not found!"})
    }
    const checkSubCategory = await subCategoryModel.findById(subCategoryId);
    if (!checkSubCategory) {
        return res.status(404).json({message:"SubCategory not found!"})
    }
    req.body.slug = slugify(name);
    req.body.finalPrice = price - (price * (discount || 0) / 100);
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
        return res.status(400).json({message: "error while creating product"})
    }
    return res.status(201).json({message: "success", product})
    

}