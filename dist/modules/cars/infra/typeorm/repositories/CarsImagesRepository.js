"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsImagesRepository = void 0;
var _typeorm = require("typeorm");
var _carImage = require("../entities/carImage");
/* eslint-disable camelcase */

class CarsImagesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_carImage.CarImage);
  }
  async create(car_id, image_name) {
    const carImage = this.repository.create({
      car_id,
      image_name
    });
    await this.repository.save(carImage);
    return carImage;
  }
}
exports.CarsImagesRepository = CarsImagesRepository;