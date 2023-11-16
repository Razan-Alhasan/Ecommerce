import { Router } from 'express';
import { auth } from '../Middleware/auth.js';
import { endPoints } from '../EndPoints/cartEndPoint.js';
import * as cartController from "../Controllers/cartController.js";
const router = Router();

router.post("/", auth(endPoints.create), cartController.createCart)
router.patch("/removeProduct", auth(endPoints.remove), cartController.removeProduct)
router.patch("/clearCart", auth(endPoints.clear), cartController.clearCart)
router.get("/", auth(endPoints.get), cartController.getCart)
export default router