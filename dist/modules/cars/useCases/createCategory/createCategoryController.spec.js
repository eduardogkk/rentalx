"use strict";

var _supertest = _interopRequireDefault(require("supertest"));
var _app = require("../../../../shared/infra/http/app");
var _typeorm = _interopRequireDefault(require("../../../../shared/infra/typeorm"));
var _bcryptjs = require("bcryptjs");
var _uuid = require("uuid");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-undef */

let connection;
describe('Create category controller', () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.default)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcryptjs.hash)('admin', 8);
    await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentalx.com.br', '${password}', true, 'now()', 'XXXXXX')
    `);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should be able to create a new category', async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post('/sessions').send({
      email: 'admin@rentalx.com.br',
      password: 'admin'
    });
    const {
      token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post('/categories').send({
      name: 'category supertest',
      description: 'category supertest'
    }).set({
      Authorization: `Bearer ${token}`
    });
    expect(response.status).toBe(201);
  });
  it('should not be able to create a new category with name exists', async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post('/sessions').send({
      email: 'admin@rentalx.com.br',
      password: 'admin'
    });
    const {
      token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post('/categories').send({
      name: 'category supertest',
      description: 'category supertest'
    }).set({
      Authorization: `Bearer ${token}`
    });
    expect(response.status).toBe(400);
  });
});