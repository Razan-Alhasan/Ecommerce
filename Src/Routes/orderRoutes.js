import { Router } from "express";
const router = Router();
import * as orderController from "../Controllers/orderController.js";
import { asyncHandler } from "../Services/errorHandling.js";
import { auth } from "../Middleware/auth.js";
import { endPoints } from "../EndPoints/orderEndPoint.js";
router.post('/', auth(endPoints.create), asyncHandler(orderController.createOrder))
export default router;
