/* eslint-disable no-undef */
import { AppError } from '../../../../shared/errors/AppError'
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'name car',
      description: 'description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    })

    expect(car).toHaveProperty('id')
  })

  it('should not be able to create a car with a exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'Car1',
      description: 'description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    })

    await expect(createCarUseCase.execute({
      name: 'Car2',
      description: 'description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    })
    ).rejects.toEqual(new AppError('Car already exist!'))
  })

  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car available',
      description: 'description car',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    })

    expect(car.available).toBe(true)
  })
})
