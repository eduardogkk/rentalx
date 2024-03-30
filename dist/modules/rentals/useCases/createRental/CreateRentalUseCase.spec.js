"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));
var _AppError = require("../../../../shared/errors/AppError");
var _RentalsRepositoryInMemory = require("../../repositories/in-memory/RentalsRepositoryInMemory");
var _CreateRentalUseCase = require("./CreateRentalUseCase");
var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var _CarsRepositoryInMemory = require("../../../cars/repositories/in-memory/CarsRepositoryInMemory");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable camelcase */
/* eslint-disable no-undef */

let createRentalUseCase;
let rentalsRepositoryInMemory;
let dayjsDateProvider;
let carsRepositoryInMemory;
describe('Create rental', () => {
  const dayAdd24Hours = (0, _dayjs.default)().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
  });
  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'test',
      description: 'Car test',
      daily_rate: 80,
      license_plate: 'XXXXX',
      fine_amount: 40,
      category_id: '1234',
      brand: 'test'
    });
    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: 'UserTest',
      expected_return_date: dayAdd24Hours
    });
    console.log(rental);
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });
  it('should not be able to create a new rental if there is another open to the same user', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'test',
      description: 'Car test',
      daily_rate: 80,
      license_plate: 'XXXXX',
      fine_amount: 40,
      category_id: '1234',
      brand: 'test'
    });
    await rentalsRepositoryInMemory.create({
      car_id: '1111',
      user_id: '12345',
      expected_return_date: dayAdd24Hours
    });
    await expect(createRentalUseCase.execute({
      car_id: car1.id,
      user_id: '12345',
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("There's a rental in progress for user!"));
  });
  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: 'test',
      user_id: '12345',
      expected_return_date: dayAdd24Hours
    });
    await expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'test',
        user_id: '321',
        expected_return_date: dayAdd24Hours
      });
    }).rejects.toEqual(new _AppError.AppError('Car is unavailable!'));
  });
  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(createRentalUseCase.execute({
      car_id: 'test',
      user_id: '123',
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _AppError.AppError('Invalid return time!'));
  });
});