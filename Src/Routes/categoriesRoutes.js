import { Router } from "express";
const router = Router();
import * as categoriesController from "../Controllers/categoriesController.js";
router.get("/", categoriesController.getCategories);
export default router;