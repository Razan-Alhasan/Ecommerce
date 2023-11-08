import connectDB from "../../DB/connection.js";
import categoriesRoutes from "./categoriesRoutes.js";
import productsRoutes from "./productsRoutes.js";
import subCategoryRoutes from "./subCategoryRoutes.js";
import authRoutes from "./authRoutes.js";
import couponRoutes from "./couponRoutes.js";

const initApp = (app, express) => {
    app.use(express.json());
    connectDB();
    app.get("/", ((req, res) => res.json({ message: "welcome" })));
    app.use("/categories", categoriesRoutes);
    app.use("/subCategory", subCategoryRoutes);
    app.use("/auth", authRoutes);
    app.use("/products", productsRoutes);
    app.use("/coupon", couponRoutes);
    app.get("*", ((req, res) => res.json({ message: "page not found" })));
};
export default initApp;