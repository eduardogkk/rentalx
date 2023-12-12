/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'
import { ICarsRepository } from '../../repositories/ICarsRepository'
import { AppError } from '../../../../shared/errors/AppError'
import { ISpecificationsRepository } from '../../repositories/ISpecificationRepository'
import { Car } from '../../infra/typeorm/entities/cars'

interface IRequest {
  car_id: string
  specification_id: string[]
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('SpecificationRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) { }

  async execute({ car_id, specification_id }: IRequest): Promise<Car> {
    const carExist = await this.carsRepository.findById(car_id)

    if (!carExist) {
      throw new AppError('Car does not exists!')
    }

    const specifications = await this.specificationsRepository.findByIds(
      specification_id,
    )

    carExist.specifications = specifications

    await this.carsRepository.create(carExist)

    return carExist
  }
}

export { CreateCarSpecificationUseCase }
