import { Router } from "express";
const router = Router();
import * as couponController from "../Controllers/couponController.js"

router.post("/create", couponController.createCoupon);
router.get("/", couponController.getCoupons);
router.patch("/update/:id", couponController.updateCoupon);
router.patch("/softDelete/:id", couponController.softDeleteCoupon);
router.delete("/forceDelete/:id", couponController.forceDeleteCoupon);
router.patch("/restore/:id", couponController.restoreCoupon);
export default router;