"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokenUseCase = void 0;
var _jsonwebtoken = require("jsonwebtoken");
var _tsyringe = require("tsyringe");
var _IUserTokensRepository = require("../../repositories/IUserTokensRepository");
var _auth = _interopRequireDefault(require("../../../../config/auth"));
var _AppError = require("../../../../shared/errors/AppError");
var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let RefreshTokenUseCase = exports.RefreshTokenUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UserTokensRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('DayjsDateProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUserTokensRepository.IUserTokensRepository === "undefined" ? Object : _IUserTokensRepository.IUserTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class RefreshTokenUseCase {
  constructor(userTokensRepository, dateProvider) {
    this.userTokensRepository = userTokensRepository;
    this.dateProvider = dateProvider;
  }
  async execute(token) {
    const {
      sub,
      email
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secret_refresh_token);
    const user_id = sub;
    const userToken = await this.userTokensRepository.findByUserIdAndRefreshToken(user_id, token);
    if (!userToken) {
      throw new _AppError.AppError("Refresh token does not exists!");
    }
    await this.userTokensRepository.deleteById(userToken.id);
    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, _auth.default.secret_refresh_token, {
      subject: sub,
      expiresIn: _auth.default.expires_in_refresh_token
    });
    const refresh_token_expires_date = this.dateProvider.addDays(_auth.default.expires_refresh_token_days);
    await this.userTokensRepository.create({
      expires_date: refresh_token_expires_date,
      user_id,
      refresh_token
    });
    const newToken = (0, _jsonwebtoken.sign)({}, _auth.default.secret_token, {
      subject: user_id,
      expiresIn: _auth.default.expires_in_token
    });
    return {
      refresh_token,
      token: newToken
    };
  }
}) || _class) || _class) || _class) || _class) || _class);