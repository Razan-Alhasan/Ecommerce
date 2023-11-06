import { Router } from "express";
const router = Router({mergeParams: true});
import * as subCategoryController from "../Controllers/subCategoryController.js";
import fileUpload, { fileValidation } from "../Services/multer.js";


router.post("/",fileUpload(fileValidation.image).single("image"),subCategoryController.createSubCategory);
router.get("/", subCategoryController.getSubCategories);
export default router;
