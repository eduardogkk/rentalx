"use strict";

var _AppError = require("../../../../shared/errors/AppError");
var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");
var _CreateUserUseCase = require("../createUser/CreateUserUseCase");
var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");
/* eslint-disable no-undef */

let authenticateUserUseCase;
let usersRepositoryInMemory;
let createUserUseCase;
describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it('should be able to authenticate an user', async () => {
    const user = {
      driver_license: '000123',
      email: 'user@test.com',
      password: '1234',
      name: 'User Test'
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty('token');
  });
  it('should not be able to authenticate a nonexistent user', async () => {
    await expect(authenticateUserUseCase.execute({
      email: 'false@email.com',
      password: '1234'
    })).rejects.toEqual(new _AppError.AppError('Email or password incorrect!'));
  });
  it('should not be able to authenticate with incorrect password', async () => {
    const user = {
      driver_license: '9999',
      email: 'user@user.com',
      password: '1234',
      name: 'user test error'
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: 'incorrectPassword'
    })).rejects.toEqual(new _AppError.AppError('Email or password incorrect!'));
  });
});