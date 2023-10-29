/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'
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
    await this.usersRepository.create({
      name,
      email,
      driver_license,
      password
    })
  }
}

export { CreateUserUseCase }
