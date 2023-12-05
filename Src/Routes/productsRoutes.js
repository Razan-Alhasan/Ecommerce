import { Router } from "express";
const router = Router();
import * as productsController from "../Controllers/productsController.js";
import { auth } from "../Middleware/auth.js";
import { endPoints } from "../EndPoints/productEndPoint.js";
import fileUpload, { fileValidation } from "../Services/multer.js";
import { asyncHandler } from "../Services/errorHandling.js";
import { validation } from "../Middleware/validation.js";
import * as validators from "../Validations/productValidation.js"
router.get("/", asyncHandler(productsController.getProducts));
router.get("/:id", asyncHandler(productsController.getProductById));
router.get("/:catId", asyncHandler(productsController.getProductsByCategory));
router.post("/", auth(endPoints.create), fileUpload(fileValidation.image).fields([
    {name: "mainImage", maxCount:1},
    {name: "subImages", maxCount:4},
])
    // , validation(validators.createProduct)
    , asyncHandler(productsController.createProduct));
export default router;