import { Router } from "express";
import { CategoriesRepository } from "../repositories/categoriesRepository";
import { CreateCategoryService } from "../services/createCategoryService";
import { PostgresCategoriesRepository } from "../repositories/postgresCategoriesRepository";
import { ICategoryRepository } from "../repositories/IcategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post("/", (request, response) => {
  const { name , description } = request.body;

  const CreateCategotyService = new CreateCategoryService(categoriesRepository);

  CreateCategotyService.execute({ name, description })

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const all = categoriesRepository.list();

  return response.json(all);
});

export { categoriesRoutes };