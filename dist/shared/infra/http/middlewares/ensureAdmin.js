"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAdmin = ensureAdmin;
var _usersRepository = require("../../../../modules/accounts/infra/typeorm/repositories/usersRepository");
var _AppError = require("../../../errors/AppError");
async function ensureAdmin(request, response, next) {
  const {
    id
  } = request.user;
  const usersRepository = new _usersRepository.UsersRepository();
  const user = await usersRepository.findById(id);
  request.user = {
    id: user.id
  };
  if (!user.isAdmin) {
    throw new _AppError.AppError('User is not admin!');
  }
  return next();
}