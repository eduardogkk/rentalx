"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoriesRoutes = void 0;
var _express = require("express");
var _multer = _interopRequireDefault(require("multer"));
var _createCategoryController = require("../../../../modules/cars/useCases/createCategory/createCategoryController");
var _importCategoryController = require("../../../../modules/cars/useCases/importCategory/importCategoryController");
var _listCategoryController = require("../../../../modules/cars/useCases/listCategories/listCategoryController");
var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");
var _ensureAdmin = require("../middlewares/ensureAdmin");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const categoriesRoutes = exports.categoriesRoutes = (0, _express.Router)();
const upload = (0, _multer.default)({
  dest: './tmp'
});
const createCategoryController = new _createCategoryController.CreateCategoryController();
const importCategoryController = new _importCategoryController.ImportCategoryController();
const listCategoryController = new _listCategoryController.ListCategoryController();
categoriesRoutes.post('/', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCategoryController.handle);
categoriesRoutes.get('/', listCategoryController.handle);
categoriesRoutes.post('/import', upload.single('file'), _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, importCategoryController.handle);