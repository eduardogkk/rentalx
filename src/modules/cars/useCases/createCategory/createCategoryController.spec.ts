/* eslint-disable no-undef */
import request from 'supertest'
import { app } from '../../../../shared/infra/http/app'
import CreateConnection from '../../../../shared/infra/typeorm'
import { Connection } from 'typeorm'
import { hash } from 'bcryptjs'
import { v4 as uuidV4 } from 'uuid'

let connection: Connection

describe('Create category controller', () => {
  beforeAll(async () => {
    connection = await CreateConnection()
    await connection.runMigrations()

    const id = uuidV4()
    const password = await hash('admin', 8)

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentalx.com.br', '${password}', true, 'now()', 'XXXXXX')
    `,
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentalx.com.br',
      password: 'admin',
    })

    const { token } = responseToken.body

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'category supertest',
        description: 'category supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.status).toBe(201)
  })

  it('should not be able to create a new category with name exists', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentalx.com.br',
      password: 'admin',
    })

    const { token } = responseToken.body

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'category supertest',
        description: 'category supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.status).toBe(400)
  })
})
