import { Router } from "express";
const router = Router();
import * as categoriesController from "../Controllers/categoriesController.js";
import fileUpload, { fileValidation } from "../Services/multer.js";
import subCategoryRoutes from "./subCategoryRoutes.js"
import { auth } from "../Middleware/auth.js";
import { endPoints } from "../EndPoints/categoryEndPoint.js";

router.use("/:id/subcategory", subCategoryRoutes);
router.get("/", auth(endPoints.getAll), categoriesController.getCategories);
router.get("/active", auth(endPoints.getActive), categoriesController.getActiveCategory);
router.get("/:id", auth(endPoints.getById), categoriesController.getCategoryById);
router.patch("/:id", auth(endPoints.update), fileUpload(fileValidation.image).single("image"), categoriesController.updateCategory);
router.post("/", auth(endPoints.create), fileUpload(fileValidation.image).single("image"), categoriesController.createCategory);
export default router;
