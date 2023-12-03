import joi from "joi";
export const createCoupon = joi.object({
    name: joi.string().required(),
    amount: joi.number().required(),
    expireDate: joi.date().greater('now').required()
});
export const updateCoupon = joi.object({
    name: joi.string(),
    amount: joi.number()
    // id:
});
export const softDeleteCoupon = joi.object({
    // id:
})
export const forceDeleteCoupon = joi.object({
    // id:
})
export const restoreCoupon = joi.object({
    // id:
})
