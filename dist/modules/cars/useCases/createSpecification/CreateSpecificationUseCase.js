"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationUseCase = void 0;
var _AppError = require("../../../../shared/errors/AppError");
var _ISpecificationRepository = require("../../repositories/ISpecificationRepository");
var _tsyringe = require("tsyringe");
var _dec, _dec2, _dec3, _dec4, _class;
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-constructor */
let CreateSpecificationUseCase = exports.CreateSpecificationUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('SpecificationRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ISpecificationRepository.ISpecificationsRepository === "undefined" ? Object : _ISpecificationRepository.ISpecificationsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateSpecificationUseCase {
  constructor(specificationsRepository) {
    this.specificationsRepository = specificationsRepository;
  }
  async execute({
    description,
    name
  }) {
    const specificationAlreadyExist = await this.specificationsRepository.findByName(name);
    if (specificationAlreadyExist) {
      throw new _AppError.AppError('Specification already exist!');
    }
    await this.specificationsRepository.create({
      name,
      description
    });
  }
}) || _class) || _class) || _class) || _class);