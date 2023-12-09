import { Router } from "express";
const router = Router();
import * as orderController from "../Controllers/orderController.js";
import { asyncHandler } from "../Services/errorHandling.js";
import { auth } from "../Middleware/auth.js";
import { endPoints } from "../EndPoints/orderEndPoint.js";
router.get('/', auth(endPoints.getAll), asyncHandler(orderController.getOrders))
router.post('/', auth(endPoints.create), asyncHandler(orderController.createOrder))
router.patch('/cancel/:orderId', auth(endPoints.cancelOrder), asyncHandler(orderController.cancelOrder));
router.patch('/change/:orderId', auth(endPoints.changeOrderStatus), asyncHandler(orderController.changeOrderStatus));
export default router;
