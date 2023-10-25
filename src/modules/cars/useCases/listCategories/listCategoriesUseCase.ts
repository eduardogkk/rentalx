/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-constructor */
import { Category } from '../../entities/category'
import { ICategoryRepository } from '../../repositories/IcategoriesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository,
  ) { }

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list()
    return categories
  }
}

export { ListCategoriesUseCase }
