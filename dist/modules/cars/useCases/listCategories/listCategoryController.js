"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCategoryController = void 0;
var _tsyringe = require("tsyringe");
var _listCategoriesUseCase = require("./listCategoriesUseCase");
/* eslint-disable no-useless-constructor */

class ListCategoryController {
  async handle(request, response) {
    const listCategoriesUseCase = _tsyringe.container.resolve(_listCategoriesUseCase.ListCategoriesUseCase);
    const all = await listCategoriesUseCase.execute();
    return response.json(all);
  }
}
exports.ListCategoryController = ListCategoryController;