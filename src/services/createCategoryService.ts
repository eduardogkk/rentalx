import { ICategoryRepository } from "../repositories/IcategoriesRepository";
import { CategoriesRepository } from "../repositories/categoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {

  constructor(private categoriesRepository: ICategoryRepository) {};
  
  execute({description, name}: IRequest): void {
    const categoryAlreadyExist = this.categoriesRepository.findByName(name);

  if (categoryAlreadyExist) {
    throw new Error("Category already exist!")
  };

  this.categoriesRepository.create({name, description})
  };
};

export { CreateCategoryService }