import { Category } from '../../infra/typeorm/entities/category'
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from '../IcategoriesRepository'

class CategoriesRepositoryInMemory implements ICategoryRepository {
  categories: Category[] = []

  async findByName(name: string): Promise<Category> {
    return this.categories.find((category) => category.name === name)
  }

  async list(): Promise<Category[]> {
    const all = this.categories
    return all
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category()

    Object.assign(category, {
      name,
      description,
    })

    this.categories.push(category)
  }
}

export { CategoriesRepositoryInMemory }
