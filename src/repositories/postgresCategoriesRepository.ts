import { Category } from "../model/category";
import { ICategoryRepository, ICreateCategoryDTO } from "./IcategoriesRepository";


class PostgresCategoriesRepository implements ICategoryRepository {

  findByName(name: string): Category {
    console.log(name);
    return null;
  }
  list(): Category [] {
    return null;
  }
  create({name, description}: ICreateCategoryDTO): void {
    console.log(name, description)
  }
  
};

export { PostgresCategoriesRepository, ICategoryRepository }