import categoryModel from "../../DB/Models/categoryModel.js";
import subCategoryModel from "../../DB/Models/subCategoryModel.js";
import cloudinary from "../Services/cloudinary.js";
import slugify from "slugify";
export const createSubCategory = async (req, res) => {
    try {
        const { name, categoryId } = req.body;
        const subCategory = await subCategoryModel.findOne({ name });
        if (subCategory) {
            return res.status(409).json({ message: `This sub category ${name} is already exist!` })
        }
        const category = await categoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'This category is not exist!' })
        }
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path,
            { folder: `${process.env.APP_NAME}/${category.name}/subCategory` }
            );
            const create = await subCategoryModel.create({name, slug: slugify(name), categoryId, image: {secure_url, public_id}})
            res.status(201).json({message: "success", create})
        } catch(err){
        res.json(err)
            
        }
};
export const getSubCategories = async (req, res) => {
    const categoryId = req.params.id;
    const category = await categoryModel.findById(categoryId);
    if (!category) {
        return res.status(404).json({ message: "category not found" });
    }
    const subCatgeories = await subCategoryModel.find().populate({
        path: 'categoryId'
    })
    return res.status(200).json({ message: "success", subCatgeories });
}