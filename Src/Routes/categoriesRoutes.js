import { Router } from "express";
const router = Router();
import * as categoriesController from "../Controllers/categoriesController.js";
import fileUpload, { fileValidation } from "../Services/multer.js";
import subCategoryRoutes from "./subCategoryRoutes.js"

router.use("/:id/subcategory", subCategoryRoutes)
router.get("/", categoriesController.getCategories);
router.get("/active", categoriesController.getActiveCategory);
router.get("/:id", categoriesController.getCategoryById);
router.patch("/:id", fileUpload(fileValidation.image).single("image"), categoriesController.updateCategory);
router.post("/", fileUpload(fileValidation.image).single("image"), categoriesController.createCategory);
export default router;
