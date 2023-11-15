import { Router } from "express";
const router = Router();
import * as productsController from "../Controllers/productsController.js";
import { auth } from "../Middleware/auth.js";
import { endPoints } from "../EndPoints/productEndPoint.js";
import fileUpload, { fileValidation } from "../Services/multer.js";
router.get("/", productsController.getProducts);
router.post("/", auth(endPoints.create), fileUpload(fileValidation.image).fields([
    {name: "mainImage", maxCount:1},
    {name: "subImages", maxCount:4},
]), productsController.createProduct)
export default router;