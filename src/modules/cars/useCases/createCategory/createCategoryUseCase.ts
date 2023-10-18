/* eslint-disable no-useless-constructor */
import { ICategoryRepository } from '../../repositories/IcategoriesRepository'

interface IRequest {
  name: string
  description: string
}

class CreateCategoryUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private categoriesRepository: ICategoryRepository) { }

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExist = await this.categoriesRepository.findByName(
      name,
    )

    if (categoryAlreadyExist) {
      throw new Error('Category already exist!')
    }

    this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase }
