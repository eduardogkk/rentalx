"use strict";

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");
var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");
/* eslint-disable no-undef */

let listAvailableCarsUseCase;
let carsRepositoryInMemory;
describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    listAvailableCarsUseCase = new _ListAvailableCarsUseCase.ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 90.0,
      license_plate: 'ZZZ-111',
      fine_amount: 45.0,
      brand: 'Car_brand',
      category_id: 'category_id'
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car2',
      description: 'Car description',
      daily_rate: 90.0,
      license_plate: 'ZZZ-111',
      fine_amount: 45.0,
      brand: 'Car_brand_test',
      category_id: 'category_id'
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: 'car_brand_test'
    });
    expect(cars).toEqual([car]);
  });
  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car3',
      description: 'Car description',
      daily_rate: 90.0,
      license_plate: 'ZZZ-111',
      fine_amount: 45.0,
      brand: 'Car_brand_test',
      category_id: 'category_id'
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car3'
    });
    expect(cars).toEqual([car]);
  });
  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car4',
      description: 'Car description',
      daily_rate: 90.0,
      license_plate: 'ZZZ-111',
      fine_amount: 45.0,
      brand: 'Car_brand_test',
      category_id: '12345'
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: '12345'
    });
    expect(cars).toEqual([car]);
  });
});