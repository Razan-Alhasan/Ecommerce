import joi from "joi";
import { generalFields } from "../Middleware/validation.js";
export const createProduct = joi.object({
    name: joi.string().required(),
    price: joi.number().min(1).required(),
    discount: joi.number().required(),
    // categoryId:
    // subCategoryId: 
    // mainImage: generalFields.file.required(),
    // subImages: 
})