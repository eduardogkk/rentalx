/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-constructor */
import { ISpecificationsRepository } from '../../repositories/ISpecificationRepository'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) { }

  async execute({ description, name }: IRequest): Promise<void> {
    const specificationAlreadyExist =
      await this.specificationsRepository.findByName(name)

    if (specificationAlreadyExist) {
      throw new Error('Specification already exist!')
    }

    await this.specificationsRepository.create({
      name,
      description,
    })
  }
}

export { CreateSpecificationUseCase }
