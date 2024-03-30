"use strict";

var _tsyringe = require("tsyringe");
require("./providers/index");
var _categoriesRepository = require("../../modules/cars/infra/typeorm/repositories/categoriesRepository");
var _SpecificationRepository = require("../../modules/cars/infra/typeorm/repositories/SpecificationRepository");
var _usersRepository = require("../../modules/accounts/infra/typeorm/repositories/usersRepository");
var _CarsRepository = require("../../modules/cars/infra/typeorm/repositories/CarsRepository");
var _CarsImagesRepository = require("../../modules/cars/infra/typeorm/repositories/CarsImagesRepository");
var _RentalsRepository = require("../../modules/rentals/infra/typeorm/repositories/RentalsRepository");
var _UserTokensRepository = require("../../modules/accounts/infra/typeorm/repositories/UserTokensRepository");
_tsyringe.container.registerSingleton('CategoriesRepository', _categoriesRepository.CategoriesRepository);
_tsyringe.container.registerSingleton('SpecificationRepository', _SpecificationRepository.SpecificationRepository);
_tsyringe.container.registerSingleton('UsersRepository', _usersRepository.UsersRepository);
_tsyringe.container.registerSingleton('CarsRepository', _CarsRepository.CarsRepository);
_tsyringe.container.registerSingleton('CarsImagesRepository', _CarsImagesRepository.CarsImagesRepository);
_tsyringe.container.registerSingleton('RentalsRepository', _RentalsRepository.RentalsRepository);
_tsyringe.container.registerSingleton('UserTokensRepository', _UserTokensRepository.UserTokensRepository);