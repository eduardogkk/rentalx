import express from "express";
import { categoriesRoutes } from "./routes/categories.routes";
import { specificationRoutes } from "./routes/specificationRoutes";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router)

app.listen(5555, () => console.log("server is running!"));