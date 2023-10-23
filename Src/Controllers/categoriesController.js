import categoryModel from "../../DB/Models/categoryModel.js";
import slugify from "slugify";
import cloudinary from "../Services/cloudinary.js";
export const getCategories = (req, res) => {
  return res.json({ message: "Categories" });
};
export const createCategory = async(req, res) => {
  const name = req.body.name.toLowerCase();
  if (await categoryModel.findOne({ name })) {
    return res.status(404).json("category is already exist !")
  }
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.APP_NAME}/categories` }
  );
  const category = await categoryModel.create({ name, slug: slugify(name), image: {secure_url, public_id} });
  return res.status(200).json({message: "sucess", category})
};
