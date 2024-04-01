import { Router } from "express";
const router = Router();
import * as categoriesController from "../Controllers/categoriesController.js";
import fileUpload, { fileValidation } from "../Services/multer.js";
import subCategoryRoutes from "./subCategoryRoutes.js"
import { auth } from "../Middleware/auth.js";
import { endPoints } from "../EndPoints/categoryEndPoint.js";
import { asyncHandler } from "../Services/errorHandling.js";
import { validation } from "../Middleware/validation.js";
import * as validators from "../Validations/categoriesValidation.js"
import roles from "../Middleware/roles.js";
router.use("/:id/subcategory", subCategoryRoutes);
router.get("/", auth(endPoints.getAll), asyncHandler(categoriesController.getCategories));
router.get("/active", asyncHandler(categoriesController.getActiveCategory));
router.get("/:id", asyncHandler(categoriesController.getCategoryById));
router.patch("/:id", auth(endPoints.update), fileUpload(fileValidation.image).single("image"), validation(validators.updateCategory), asyncHandler(categoriesController.updateCategory));
router.post("/", auth(endPoints.create), fileUpload(fileValidation.image).single("image"),
    asyncHandler(categoriesController.createCategory));
export default router;
