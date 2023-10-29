/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'
import {
  ICreateUsersDTO,
  IUsersRepository,
} from '../../repositories/IUsersRepository'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  async execute({
    name,
    email,
    driver_license,
    password
  }: ICreateUsersDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const passwordHash = await hash(password, 8)
    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    })
  }
}

export { CreateUserUseCase }
