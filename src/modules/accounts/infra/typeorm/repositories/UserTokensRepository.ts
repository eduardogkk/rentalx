import { Repository, getRepository } from "typeorm";
import { ICreateUserTokensDTO } from "../../../dtos/ICreateUserTokensDTO";
import { IUserTokensRepository } from "../../../repositories/IUserTokensRepository";
import { UserTokens } from "../entities/UserTokens";

class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>

  constructor() {
    this.repository = getRepository(UserTokens)
  }

  async create({ user_id, expires_date, refresh_token }: ICreateUserTokensDTO): Promise<UserTokens> {
    const userTokens = this.repository.create({
      user_id,
      expires_date,
      refresh_token
    })

    await this.repository.save(userTokens)

    return userTokens
  }

  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    const userTokens = this.repository.findOne({ user_id, refresh_token })

    return userTokens
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

export { UserTokensRepository }