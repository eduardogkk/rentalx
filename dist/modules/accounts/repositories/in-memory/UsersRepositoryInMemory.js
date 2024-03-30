"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepositoryInMemory = void 0;
var _Users = require("../../infra/typeorm/entities/Users");
/* eslint-disable camelcase */

class UsersRepositoryInMemory {
  constructor() {
    this.users = [];
  }
  async create({
    name,
    driver_license,
    password,
    email
  }) {
    const user = new _Users.User();
    Object.assign(user, {
      name,
      driver_license,
      password,
      email
    });
    this.users.push(user);
  }
  async findByEmail(email) {
    return this.users.find(user => user.email === email);
  }
  async findById(id) {
    return this.users.find(user => user.id === id);
  }
}
exports.UsersRepositoryInMemory = UsersRepositoryInMemory;