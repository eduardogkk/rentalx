/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'
import { ICarsRepository } from '../../repositories/ICarsRepository'
import { AppError } from '../../../../shared/errors/AppError'

interface IRequest {
  car_id: string
  specification_id: string[]
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    // @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) { }

  async execute({ car_id, specification_id }: IRequest): Promise<void> {
    const carExist = await this.carsRepository.findById(car_id)

    if (!carExist) {
      throw new AppError('Car does not exists!')
    }
  }
}

export { CreateCarSpecificationUseCase }
