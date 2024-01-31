/* eslint-disable no-undef */
/* eslint-disable camelcase */
import { AppError } from '../../../../shared/errors/AppError'
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { SpecificationRepositoryInMemory } from '../../repositories/in-memory/SpecificationRepositoryInMemory'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationRepositoryInMemory: SpecificationRepositoryInMemory

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory,
    )
  })

  it('should not be able to add a new specification to a now-existent car', async () => {
    const car_id = '1234'
    const specification_id = ['54321']

    await expect(createCarSpecificationUseCase.execute({ car_id, specification_id })
    ).rejects.toEqual(new AppError('Car does not exists!'))
  })

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car2',
      description: 'Car description',
      daily_rate: 90.0,
      license_plate: 'ZZZ-111',
      fine_amount: 45.0,
      brand: 'Car_brand_test',
      category_id: 'category_id',
    })

    const specification = await specificationRepositoryInMemory.create({
      name: 'test',
      description: 'test',
    })

    const specification_id = [specification.id]

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id,
    })

    expect(specificationsCars).toHaveProperty('specifications')
    expect(specificationsCars.specifications.length).toBe(1)
  })
})
