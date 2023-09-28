import express from "express";
import { categoriesRoutes } from "./routes/categories.routes";
import { specificationRoutes } from "./routes/specificationRoutes";

const app = express();

app.use(express.json());

app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationRoutes)

app.listen(5555, () => console.log("server is running!"));