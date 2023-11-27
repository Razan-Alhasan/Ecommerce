import joi from "joi";
import { generalFields } from "../Middleware/validation.js";
export const createCategory = joi.object({
    name: joi.string().min(3).max(10).required(),
    description: joi.string().required(),
    file: generalFields.file.required(),
});
export const getCategoryById = joi.object({
    // id: 
})
export const updateCategory = joi.object({
    name: joi.string().min(3).max(10).required(),
    description: joi.string().required(),
    file: generalFields.file.required(),
});