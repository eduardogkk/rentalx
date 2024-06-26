"use strict";

var _AppError = require("../../../../shared/errors/AppError");
var _CategoriesRepositoryInMemory = require("../../repositories/in-memory/CategoriesRepositoryInMemory");
var _createCategoryUseCase = require("./createCategoryUseCase");
/* eslint-disable no-undef */

let createCategoryUseCase;
let categoriesRepositoryInMemory;
describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new _CategoriesRepositoryInMemory.CategoriesRepositoryInMemory();
    createCategoryUseCase = new _createCategoryUseCase.CreateCategoryUseCase(categoriesRepositoryInMemory);
  });
  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category test',
      description: 'Category description test'
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });
    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
    expect(categoryCreated).toHaveProperty('id');
  });
  it('should not be able to create a new category with name exists', async () => {
    const category = {
      name: 'Category test',
      description: 'Category description test'
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });
    await expect(createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    })).rejects.toEqual(new _AppError.AppError('Category already exists!'));
  });
});