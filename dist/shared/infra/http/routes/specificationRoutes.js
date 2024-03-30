"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specificationRoutes = void 0;
var _express = require("express");
var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");
var _createSpecificationController = require("../../../../modules/cars/useCases/createSpecification/createSpecificationController");
var _ensureAdmin = require("../middlewares/ensureAdmin");
const specificationRoutes = exports.specificationRoutes = (0, _express.Router)();
const createSpecificationController = new _createSpecificationController.CreateSpecificationController();
specificationRoutes.post('/', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createSpecificationController.handle);