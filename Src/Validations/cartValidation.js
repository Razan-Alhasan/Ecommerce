import joi from "joi";
export const createCart = joi.object({
    // productId: 
    quantity: joi.number().min(1).required()
})
export const removeProduct = joi.object({
    // productId: 
})


