"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarUseCase = void 0;
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _ICarsRepository = require("../../repositories/ICarsRepository");
var _dec, _dec2, _dec3, _dec4, _class;
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
let CreateCarUseCase = exports.CreateCarUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CarsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateCarUseCase {
  constructor(carsRepository) {
    this.carsRepository = carsRepository;
  }
  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }) {
    const carAlreadyExist = await this.carsRepository.findByLicensePlate(license_plate);
    if (carAlreadyExist) {
      throw new _AppError.AppError('Car already exist!');
    }
    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    });
    return car;
  }
}) || _class) || _class) || _class) || _class);