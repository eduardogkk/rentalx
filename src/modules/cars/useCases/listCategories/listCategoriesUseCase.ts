/* eslint-disable no-useless-constructor */
import { Category } from '../../model/category'
import { ICategoryRepository } from '../../repositories/IcategoriesRepository'

class ListCategoriesUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private categoriesRepository: ICategoryRepository) { }

  execute(): Category[] {
    const categories = this.categoriesRepository.list()
    return categories
  }
}

export { ListCategoriesUseCase }
