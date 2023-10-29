/* eslint-disable camelcase */
import { Repository, getRepository } from 'typeorm'
import { IUsersRepository, ICreateUsersDTO } from '../IUsersRepository'
import { User } from '../../entities/Users'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
    })

    await this.repository.save(user)
  }
}

export { UsersRepository }
