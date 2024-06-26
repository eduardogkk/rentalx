"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAvailableCarsController = void 0;
var _tsyringe = require("tsyringe");
var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");
/* eslint-disable camelcase */

class ListAvailableCarsController {
  async handle(request, response) {
    const {
      category_id,
      name,
      brand
    } = request.query;
    const listAvailableCarsUseCase = _tsyringe.container.resolve(_ListAvailableCarsUseCase.ListAvailableCarsUseCase);
    const listCars = await listAvailableCarsUseCase.execute({
      category_id: category_id,
      name: name,
      brand: brand
    });
    return response.json(listCars);
  }
}
exports.ListAvailableCarsController = ListAvailableCarsController;