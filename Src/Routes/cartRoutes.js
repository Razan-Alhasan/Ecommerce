import { Router } from 'express';
import { auth } from '../Middleware/auth.js';
import { endPoints } from '../EndPoints/cartEndPoint.js';
import * as cartController from "../Controllers/cartController.js";
import { asyncHandler } from '../Services/errorHandling.js';
import * as validators from "../Validations/cartValidation.js";
import { validation }from "../Middleware/validation.js"
const router = Router();

router.post("/", auth(endPoints.create), validation(validators.createCart), asyncHandler(cartController.createCart))
router.patch("/removeProduct", auth(endPoints.remove), validation(validators.removeProduct), asyncHandler(cartController.removeProduct))
router.patch("/clearCart", auth(endPoints.clear), asyncHandler(cartController.clearCart))
router.get("/", auth(endPoints.get), asyncHandler(cartController.getCart))
export default router