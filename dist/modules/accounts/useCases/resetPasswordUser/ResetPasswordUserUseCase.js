"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordUserUseCase = void 0;
var _tsyringe = require("tsyringe");
var _IUsersRepository = require("../../repositories/IUsersRepository");
var _IUserTokensRepository = require("../../repositories/IUserTokensRepository");
var _AppError = require("../../../../shared/errors/AppError");
var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");
var _bcryptjs = require("bcryptjs");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;
let ResetPasswordUserUseCase = exports.ResetPasswordUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UserTokensRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('DayjsDateProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUserTokensRepository.IUserTokensRepository === "undefined" ? Object : _IUserTokensRepository.IUserTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ResetPasswordUserUseCase {
  constructor(userTokensRepository, dateProvider, usersRepository) {
    this.userTokensRepository = userTokensRepository;
    this.dateProvider = dateProvider;
    this.usersRepository = usersRepository;
  }
  async execute({
    token,
    password
  }) {
    const userToken = await this.userTokensRepository.findByRefreshToken(token);
    if (!userToken) {
      throw new _AppError.AppError('Token invalid!');
    }
    if (this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {
      throw new _AppError.AppError('Token expires!');
    }
    const user = await this.usersRepository.findById(userToken.user_id);
    user.password = await (0, _bcryptjs.hash)(password, 8);
    await this.usersRepository.create(user);
    await this.userTokensRepository.deleteById(userToken.id);
  }
}) || _class) || _class) || _class) || _class) || _class) || _class);