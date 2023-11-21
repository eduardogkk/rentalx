/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe'
/* eslint-disable no-useless-constructor */
import { ICategoryRepository } from '../../repositories/IcategoriesRepository'
import { AppError } from '../../../../shared/errors/AppError'

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateCategoryUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository,
  ) { }

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExist = await this.categoriesRepository.findByName(
      name,
    )

    if (categoryAlreadyExist) {
      throw new AppError('Category already exist!')
    }

    this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase }
