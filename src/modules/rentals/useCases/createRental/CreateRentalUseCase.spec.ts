/* eslint-disable camelcase */
/* eslint-disable no-undef */
import dayjs from 'dayjs'
import { AppError } from '../../../../shared/errors/AppError'
import { RentalsRepositoryInMemory } from '../../repositories/in-memory/RentalsRepositoryInMemory'
import { CreateRentalUseCase } from './CreateRentalUseCase'
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider

describe('Create rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate()
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
    )
  })

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '1234',
      user_id: 'UserTest',
      expected_return_date: dayAdd24Hours,
    })

    console.log(rental)

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '1234',
        user_id: 'UserTest',
        expected_return_date: dayAdd24Hours,
      })

      await createRentalUseCase.execute({
        car_id: '1234',
        user_id: 'UserTest',
        expected_return_date: dayAdd24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'test',
        user_id: '123',
        expected_return_date: dayAdd24Hours,
      })

      await createRentalUseCase.execute({
        car_id: 'test',
        user_id: '456',
        expected_return_date: dayAdd24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'test',
        user_id: '123',
        expected_return_date: dayjs().toDate(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
