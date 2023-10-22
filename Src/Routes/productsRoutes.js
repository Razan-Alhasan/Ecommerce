import { Router } from "express";
const router = Router();
import * as productsController from "../Controllers/productsController.js";
router.get("/", productsController.getProducts);
export default router