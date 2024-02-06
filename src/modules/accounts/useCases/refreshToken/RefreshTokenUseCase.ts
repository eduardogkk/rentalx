import { verify, sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository"
import auth from "../../../../config/auth"
import { AppError } from "../../../../shared/errors/AppError"
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider"

interface IPayload {
  sub: string
  email: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) { }

  async execute(token: string): Promise<string> {
    const { sub, email } = verify(token, auth.secret_refresh_token) as IPayload

    const user_id = sub

    const userToken = await this.userTokensRepository.findByUserIdAndRefreshToken(user_id, token)

    if (!userToken) {
      throw new AppError("Refresh token does not exists!")
    }

    await this.userTokensRepository.deleteById(userToken.id)

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token
    })

    const refresh_token_expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

    await this.userTokensRepository.create({
      expires_date: refresh_token_expires_date,
      user_id,
      refresh_token
    })

    return refresh_token
  }
}

export { RefreshTokenUseCase }