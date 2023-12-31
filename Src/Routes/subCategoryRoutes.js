import { Router } from "express";
const router = Router({mergeParams: true});
import * as subCategoryController from "../Controllers/subCategoryController.js";
import fileUpload, { fileValidation } from "../Services/multer.js";
import { asyncHandler } from "../Services/errorHandling.js";
import * as validators from "../Validations/subCategoryValidation.js";
import {validation} from "../Middleware/validation.js";
router.post("/", fileUpload(fileValidation.image).single("image"), validation(validators.createSubCategory), asyncHandler(subCategoryController.createSubCategory));
router.get("/", validation(validators.getSubCategories), asyncHandler(subCategoryController.getSubCategories));
export default router;
