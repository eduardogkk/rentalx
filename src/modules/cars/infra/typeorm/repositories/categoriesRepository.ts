import { Repository, getRepository } from 'typeorm'
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from '../../../repositories/IcategoriesRepository'
import { Category } from '../entities/category'

class CategoriesRepository implements ICategoryRepository {
  private repository: Repository<Category>

  // eslint-disable-next-line no-use-before-define
  constructor() {
    this.repository = getRepository(Category)
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    })

    await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find()
    return categories
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name })
    return category
  }
}

export { CategoriesRepository }
