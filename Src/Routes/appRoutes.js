import connectDB from "../../DB/connection.js";
import categoriesRoutes from "./categoriesRoutes.js";
import productsRoutes from "./productsRoutes.js";

const initApp = (app, express) => {
    app.use(express.json());
    connectDB();
    app.get("/", ((req, res) => res.json({ message: "welcome" })));
    app.use("/categories", categoriesRoutes);
    app.use("/products", productsRoutes);
    app.get("*", ((req, res) => res.json({ message: "page not found" })));
};
export default initApp;