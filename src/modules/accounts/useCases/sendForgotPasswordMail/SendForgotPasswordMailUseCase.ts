import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { v4 as uuidV4 } from "uuid";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";
import { resolve } from "path"

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) { }

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email)

    const templatePath = resolve(__dirname, "..", "..", "view", "emails", "forgotPassword.hbs")

    if (!user) {
      throw new AppError('User does not exists!')
    }

    const token = uuidV4()

    const expires_date = this.dateProvider.addHours(3)

    await this.userTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    })

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    }

    await this.mailProvider.sendMail(
      email,
      "recuperação de senha",
      variables,
      templatePath
    )
  }
}

export { SendForgotPasswordMailUseCase }