import { Router } from "express";
const router = Router();
import * as categoriesController from "../Controllers/categoriesController.js";
import fileUpload, { fileValidation } from "../Services/multer.js";
router.get("/", categoriesController.getCategories);
router.post("/", fileUpload(fileValidation.image).single("image"), categoriesController.createCategory);
export default router;
