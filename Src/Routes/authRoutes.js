import { Router } from "express";
const router = Router();
import * as authController from "../Controllers/authController.js";
import fileUpload, {fileValidation } from '../Services/multer.js';
router.post("/signUp", fileUpload(fileValidation.image).single("image"), authController.signUp);
router.post("/signIn", authController.signIn);
export default router;
