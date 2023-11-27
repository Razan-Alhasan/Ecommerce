import categoryModel from "../../DB/Models/categoryModel.js";
import slugify from "slugify";
import cloudinary from "../Services/cloudinary.js";

export const getCategories = async(req, res) => {
  const categories = await categoryModel.find().populate('SubCategory');
  return res.status(200).json({ message: "success", categories });
};
export const getActiveCategory = async(req, res) => {
  const categories = await categoryModel.find({status: "Active"}).select('name image');
  return res.status(200).json({ message: "success", categories });
};
export const createCategory = async(req, res, next) => {
  const name = req.body.name.toLowerCase();
  if (await categoryModel.findOne({ name })) {
    return next(new Error("category is already exist !", { cause : 404 }));

  }
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.APP_NAME}/categories` }
    );
    const category = await categoryModel.create({ name, slug: slugify(name), image: {secure_url, public_id}, createdBy: req.user._id, updatedBy: req.user._id});
    return res.status(200).json({message: "sucess", category})
};
export const getCategoryById = async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.findById(id)
    return res.status(200).json({ message: "success", category });
}
export const updateCategory = async (req, res, next) => {
  const category = await categoryModel.findById(req.params.id);
  if (!category) {
    return next(new Error("invalid category id !", { cause : 404 }));
  }
  if (req.body.name) {
    if (await categoryModel.findOne({ name: req.body.name})) {
      return next(new Error(`Category name exist :: ${req.body.name}`, { cause : 409 }));
    }
    category.name = req.body.name;
    category.slug = slugify(req.body.name);
  }
  if (req.body.status) {
    category.status = req.body.status;
  }
  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `${process.env.APP_NAME}/categories` }
    );
    await cloudinary.uploader.upload.destroy(category.image.public_id);
    category.image = { secure_url, public_id };
  }
  category.updatedBy = req.user._id;
  await category.save();
  return res.status(200).json({message: "success", category})
}
  