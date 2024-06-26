"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;
var _typeorm = require("typeorm");
var _cars = require("../entities/cars");
/* eslint-disable camelcase */

class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_cars.Car);
  }
  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id
  }) {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id
    });
    await this.repository.save(car);
    return car;
  }
  async findByLicensePlate(license_plate) {
    const car = await this.repository.findOne({
      license_plate
    });
    return car;
  }
  async findAvailable(brand, name, category_id) {
    const carQuery = await this.repository.createQueryBuilder('c').where('available = :available', {
      available: true
    });
    if (brand) {
      carQuery.andWhere('brand = :brand', {
        brand
      });
    }
    if (name) {
      carQuery.andWhere('name= :name', {
        name
      });
    }
    if (category_id) {
      carQuery.andWhere('category_id = :category_id', {
        category_id
      });
    }
    const cars = await carQuery.getMany();
    return cars;
  }
  async findById(id) {
    const car = await this.repository.findOne(id);
    return car;
  }
  async updateAvailable(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where('id = :id').setParameters({
      id
    }).execute();
  }
}
exports.CarsRepository = CarsRepository;