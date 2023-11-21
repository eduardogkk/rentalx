/* eslint-disable camelcase */
import { User } from '../../infra/typeorm/entities/Users'
import { ICreateUsersDTO, IUsersRepository } from '../IUsersRepository'

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = []

  async create({
    name,
    driver_license,
    password,
    email,
  }: ICreateUsersDTO): Promise<void> {
    const user = new User()

    Object.assign(user, {
      name,
      driver_license,
      password,
      email,
    })

    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email)
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id)
  }
}

export { UsersRepositoryInMemory }
