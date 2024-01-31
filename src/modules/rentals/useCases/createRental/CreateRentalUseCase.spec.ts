/* eslint-disable camelcase */
/* eslint-disable no-undef */
import dayjs from 'dayjs'
import { AppError } from '../../../../shared/errors/AppError'
import { RentalsRepositoryInMemory } from '../../repositories/in-memory/RentalsRepositoryInMemory'
import { CreateRentalUseCase } from './CreateRentalUseCase'
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { CarsRepositoryInMemory } from '../../../cars/repositories/in-memory/CarsRepositoryInMemory'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate()
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    )
  })

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'test',
      description: 'Car test',
      daily_rate: 80,
      license_plate: 'XXXXX',
      fine_amount: 40,
      category_id: '1234',
      brand: 'test'
    })

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: 'UserTest',
      expected_return_date: dayAdd24Hours,
    })

    console.log(rental)

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'test',
      description: 'Car test',
      daily_rate: 80,
      license_plate: 'XXXXX',
      fine_amount: 40,
      category_id: '1234',
      brand: 'test'
    })

    await rentalsRepositoryInMemory.create({
      car_id: '1111',
      user_id: '12345',
      expected_return_date: dayAdd24Hours,
    })

    await expect(createRentalUseCase.execute({
      car_id: car1.id,
      user_id: '12345',
      expected_return_date: dayAdd24Hours,
    })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"))
  })

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: 'test',
      user_id: '12345',
      expected_return_date: dayAdd24Hours,
    })

    await expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'test',
        user_id: '321',
        expected_return_date: dayAdd24Hours,
      })
    }).rejects.toEqual(new AppError('Car is unavailable!'))
  })

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(createRentalUseCase.execute({
      car_id: 'test',
      user_id: '123',
      expected_return_date: dayjs().toDate(),
    })
    ).rejects.toEqual(new AppError('Invalid return time!'))
  })
})
