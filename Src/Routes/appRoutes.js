import connectDB from "../../DB/connection.js";
import categoriesRoutes from "./categoriesRoutes.js";
import productsRoutes from "./productsRoutes.js";
import subCategoryRoutes from "./subCategoryRoutes.js";
import authRoutes from "./authRoutes.js";
import cartRoutes from "./cartRoutes.js";
import couponRoutes from "./couponRoutes.js";
import orderRoutes from "./orderRoutes.js";
import { globalErrorHandling } from "../Services/errorHandling.js";

const initApp = (app, express) => {
    app.use(express.json());
    connectDB();
    app.get("/", ((req, res) => res.json({ message: "welcome" })));
    app.use("/categories", categoriesRoutes);
    app.use("/subCategory", subCategoryRoutes);
    app.use("/auth", authRoutes);
    app.use("/products", productsRoutes);
    app.use("/coupon", couponRoutes);
    app.use("/order", orderRoutes);
    app.use("/cart", cartRoutes);
    app.get("*", ((req, res) => res.json({ message: "page not found" })));
    app.use(globalErrorHandling);
};
export default initApp;