"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAvailableCarsUseCase = void 0;
var _tsyringe = require("tsyringe");
var _ICarsRepository = require("../../repositories/ICarsRepository");
var _dec, _dec2, _dec3, _dec4, _class;
/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
let ListAvailableCarsUseCase = exports.ListAvailableCarsUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CarsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListAvailableCarsUseCase {
  constructor(carsRepository) {
    this.carsRepository = carsRepository;
  }
  async execute({
    category_id,
    name,
    brand
  }) {
    const cars = await this.carsRepository.findAvailable(brand, name, category_id);
    return cars;
  }
}) || _class) || _class) || _class) || _class);