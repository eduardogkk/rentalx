"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategoryUseCase = void 0;
var _tsyringe = require("tsyringe");
var _IcategoriesRepository = require("../../repositories/IcategoriesRepository");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _class;
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-constructor */
let CreateCategoryUseCase = exports.CreateCategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CategoriesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IcategoriesRepository.ICategoryRepository === "undefined" ? Object : _IcategoriesRepository.ICategoryRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateCategoryUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }
  async execute({
    description,
    name
  }) {
    const categoryAlreadyExist = await this.categoriesRepository.findByName(name);
    if (categoryAlreadyExist) {
      throw new _AppError.AppError('Category already exist!');
    }
    this.categoriesRepository.create({
      name,
      description
    });
  }
}) || _class) || _class) || _class) || _class);