"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarSpecificationController = void 0;
var _tsyringe = require("tsyringe");
var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");
/* eslint-disable camelcase */

class CreateCarSpecificationController {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const {
      specification_id
    } = request.body;
    const createCarSpecificationUseCase = _tsyringe.container.resolve(_CreateCarSpecificationUseCase.CreateCarSpecificationUseCase);
    const cars = await createCarSpecificationUseCase.execute({
      car_id: id,
      specification_id
    });
    return response.json(cars);
  }
}
exports.CreateCarSpecificationController = CreateCarSpecificationController;