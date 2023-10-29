import { ICreateUsersDTO } from '../dtos/ICreateUsersDTO'
import { User } from '../entities/Users'

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<void>
  findByEmail(email: string): Promise<User>
}

export { IUsersRepository }
export { ICreateUsersDTO }
