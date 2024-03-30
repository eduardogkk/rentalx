"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportCategoryController = void 0;
var _importCategoryUseCase = require("./importCategoryUseCase");
var _tsyringe = require("tsyringe");
/* eslint-disable no-useless-constructor */

class ImportCategoryController {
  async handle(request, response) {
    const {
      file
    } = request;
    const importCategoryUseCase = _tsyringe.container.resolve(_importCategoryUseCase.ImportCategoryUseCase);
    await importCategoryUseCase.execute(file);
    return response.status(201).send();
  }
}
exports.ImportCategoryController = ImportCategoryController;