import { Router } from "express";
const router = Router();
import * as authController from "../Controllers/authController.js";
import fileUpload, {fileValidation } from '../Services/multer.js';
import { asyncHandler } from "../Services/errorHandling.js";
import { validation } from "../Middleware/validation.js";
import * as validators from "../Validations/authValidation.js";

router.post("/signUp", fileUpload(fileValidation.image).single("image"), validation(validators.signUp), asyncHandler(authController.signUp));
router.post("/signIn", validation(validators.signIn), asyncHandler(authController.signIn));
router.get("/confirmEmail/:token", asyncHandler(authController.confirmEmail));
router.patch("/sendCode", validation(validators.sendCode), asyncHandler(authController.sendCode));
router.patch("/resetPass", validation(validators.resetPass), asyncHandler(authController.resetPassword));
router.delete("/deleteUnconfirmed", asyncHandler(authController.deleteUnConfirmedUsers));
export default router;
