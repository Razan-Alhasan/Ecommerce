import joi from 'joi';
import { generalFields } from '../Middleware/validation.js';
export const signUp = joi.object({
    userName: joi.string().min(3).required(),
    email: generalFields.email,
    password: generalFields.password,
    file: generalFields.file.required()
})
export const signIn = joi.object({
    email: generalFields.email,
    password: generalFields.password,
});
export const sendCode = joi.object({
    email: generalFields.email,
});
export const resetPass = joi.object({
    email: generalFields.email,
    password: generalFields.password,
    code: joi.number().min(6).max(6).required()
});
