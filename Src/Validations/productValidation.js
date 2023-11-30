import joi from "joi";
import { generalFields } from "../Middleware/validation.js";
export const createProduct = joi.object({
    name: joi.string().min(3).max(20).required(),
    description: joi.string().min(3).max(15000),
    price: joi.number().positive().required(),
    discount: joi.number().positive().min(1).required(),
    stock: joi.number().positive().required(),
    file: joi.object({
        mainImage: joi.array().items(generalFields.file.required()).length(1),
        subImages: joi.array().items(generalFields.file.required()).min(2).max(4),
    }),
    status: joi.string().valid("Active", "InActive"),
    // categoryId:
    // subCategoryId: 
}).required();