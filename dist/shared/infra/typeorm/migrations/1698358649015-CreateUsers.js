"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUsers1698358649015 = void 0;
var _typeorm = require("typeorm");
/* eslint-disable prettier/prettier */

class CreateUsers1698358649015 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'username',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'password',
        type: 'varchar'
      }, {
        name: 'email',
        type: 'varchar'
      }, {
        name: 'driver_license',
        type: 'varchar'
      }, {
        name: 'isAdmin',
        type: 'boolean',
        default: false
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable('users');
  }
}
exports.CreateUsers1698358649015 = CreateUsers1698358649015;