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

}

export { UserTokensRepository }