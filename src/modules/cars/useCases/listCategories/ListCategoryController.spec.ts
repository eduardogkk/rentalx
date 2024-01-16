/* eslint-disable no-undef */
import request from 'supertest'
import { app } from '../../../../shared/infra/http/app'
import CreateConnection from '../../../../shared/infra/typeorm'
import { Connection } from 'typeorm'
import { hash } from 'bcryptjs'
import { v4 as uuidV4 } from 'uuid'

let connection: Connection

describe('List Category', () => {
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

  it('should be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentalx.com.br',
      password: 'admin',
    })

    const { token } = responseToken.body

    await request(app)
      .post('/categories')
      .send({
        name: 'category supertest',
        description: 'category supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const response = await request(app).get('/categories')

    console.log(response.body)

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
  })
})
