"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationsCars1701439354397 = void 0;
var _typeorm = require("typeorm");
/* eslint-disable prettier/prettier */

class CreateSpecificationsCars1701439354397 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "specifications_cars",
      columns: [{
        name: "car_id",
        type: "uuid"
      }, {
        name: "specification_id",
        type: "uuid"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
    await queryRunner.createForeignKey("specifications_cars", new _typeorm.TableForeignKey({
      name: "FKSpecificationCar",
      referencedTableName: "specifications",
      referencedColumnNames: ["id"],
      columnNames: ["specification_id"],
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
    await queryRunner.createForeignKey("specifications_cars", new _typeorm.TableForeignKey({
      name: "FKCarSpecification",
      referencedTableName: "cars",
      referencedColumnNames: ["id"],
      columnNames: ["car_id"],
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropForeignKey("specifications_cars", "FKCarSpecification");
    await queryRunner.dropForeignKey("specifications_cars", "FKSpecificationCar");
    await queryRunner.dropTable("specifications_cars");
  }
}
exports.CreateSpecificationsCars1701439354397 = CreateSpecificationsCars1701439354397;