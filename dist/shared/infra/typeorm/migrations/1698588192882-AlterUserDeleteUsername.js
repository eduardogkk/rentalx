"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserDeleteUsername1698588192882 = void 0;
var _typeorm = require("typeorm");
/* eslint-disable prettier/prettier */

class AlterUserDeleteUsername1698588192882 {
  async up(queryRunner) {
    await queryRunner.dropColumn('users', 'username');
  }
  async down(queryRunner) {
    await queryRunner.addColumn('users', new _typeorm.TableColumn({
      name: 'username',
      type: 'varchar',
      isUnique: true
    }));
  }
}
exports.AlterUserDeleteUsername1698588192882 = AlterUserDeleteUsername1698588192882;