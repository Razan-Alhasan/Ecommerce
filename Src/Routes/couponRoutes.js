import { Router } from "express";
const router = Router();
import * as couponController from "../Controllers/couponController.js"
import { asyncHandler } from "../Services/errorHandling.js";
import { validation } from "../Middleware/validation.js";
import * as validators from "../Validations/couponValidation.js"
router.post("/create", validation(validators.createCoupon), asyncHandler(couponController.createCoupon));
router.get("/", asyncHandler(couponController.getCoupons));
router.patch("/update/:id", validation(validators.updateCoupon), asyncHandler(couponController.updateCoupon));
router.patch("/softDelete/:id", validation(validators.softDeleteCoupon), asyncHandler(couponController.softDeleteCoupon));
router.delete("/forceDelete/:id", validation(validators.forceDeleteCoupon), asyncHandler(couponController.forceDeleteCoupon));
router.patch("/restore/:id", validation(validators.restoreCoupon), asyncHandler(couponController.restoreCoupon));
export default router;