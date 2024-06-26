"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepository = void 0;
var _typeorm = require("typeorm");
var _Users = require("../entities/Users");
/* eslint-disable camelcase */

class UsersRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Users.User);
  }
  async create({
    name,
    email,
    password,
    driver_license,
    avatar,
    id
  }) {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id
    });
    await this.repository.save(user);
  }
  async findByEmail(email) {
    const user = await this.repository.findOne({
      email
    });
    return user;
  }
  async findById(id) {
    const user = await this.repository.findOne(id);
    return user;
  }
}
exports.UsersRepository = UsersRepository;