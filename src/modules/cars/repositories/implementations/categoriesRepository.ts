import { Category } from '../../model/category'
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from '../IcategoriesRepository'

class CategoriesRepository implements ICategoryRepository {
  private categories: Category[]

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: CategoriesRepository

  private constructor() {
    this.categories = []
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository()
    }
    return CategoriesRepository.INSTANCE
  }

  create({ description, name }: ICreateCategoryDTO): void {
    const category = new Category()

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    })

    this.categories.push(category)
  }

  list(): Category[] {
    return this.categories
  }

  findByName(name: string): Category | undefined {
    const category = this.categories.find((category) => category.name === name)
    return category
  }
}

export { CategoriesRepository }
