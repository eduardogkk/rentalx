"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserAddAvatar1699623837448 = void 0;
var _typeorm = require("typeorm");
/* eslint-disable prettier/prettier */

class AlterUserAddAvatar1699623837448 {
  async up(queryRunner) {
    await queryRunner.addColumn('users', new _typeorm.TableColumn({
      name: 'avatar',
      type: 'varchar',
      isNullable: true
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropColumn('users', 'avatar');
  }
}
exports.AlterUserAddAvatar1699623837448 = AlterUserAddAvatar1699623837448;