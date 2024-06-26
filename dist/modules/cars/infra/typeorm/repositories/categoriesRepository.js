"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepository = void 0;
var _typeorm = require("typeorm");
var _category = require("../entities/category");
class CategoriesRepository {
  // eslint-disable-next-line no-use-before-define
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_category.Category);
  }
  async create({
    description,
    name
  }) {
    const category = this.repository.create({
      name,
      description
    });
    await this.repository.save(category);
  }
  async list() {
    const categories = await this.repository.find();
    return categories;
  }
  async findByName(name) {
    const category = await this.repository.findOne({
      name
    });
    return category;
  }
}
exports.CategoriesRepository = CategoriesRepository;