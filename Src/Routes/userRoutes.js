import { Router } from "express";
import { asyncHandler } from "../Services/errorHandling.js";
import * as userController from "../Controllers/userController.js";
import { auth } from "../Middleware/auth.js";
import roles from "../Middleware/roles.js";
const router = Router();

router.get('/profile', auth(Object.values(roles)), asyncHandler(userController.getProfile))
export default router;
