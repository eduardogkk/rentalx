import { Router } from "express";
import { CategoriesRepository } from "../modules/cars/repositories/categoriesRepository";
import { CreateCategoryService } from "../modules/cars/services/createCategoryService";
import { PostgresCategoriesRepository } from "../modules/cars/repositories/postgresCategoriesRepository";
import { ICategoryRepository } from "../modules/cars/repositories/IcategoriesRepository";

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