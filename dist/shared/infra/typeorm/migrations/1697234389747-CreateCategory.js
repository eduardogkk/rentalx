"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategory1697234389747 = void 0;
var _typeorm = require("typeorm");
/* eslint-disable prettier/prettier */

class CreateCategory1697234389747 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'categories',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'description',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable("categories");
  }
}
exports.CreateCategory1697234389747 = CreateCategory1697234389747;