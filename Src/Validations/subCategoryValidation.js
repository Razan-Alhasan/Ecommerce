import joi from "joi";
import { generalFields } from "../Middleware/validation.js";
export const createSubCategory = joi.object({
    name: joi.string().required(),
    // categoryId:
    file: generalFields.file.required()
})
export const getSubCategories = joi.object({
    // categoryId:
})