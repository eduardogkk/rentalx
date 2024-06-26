"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateRoutes = void 0;
var _express = require("express");
var _AuthenticateUserController = require("../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController");
var _RefreshTokenController = require("../../../../modules/accounts/useCases/refreshToken/RefreshTokenController");
const authenticateRoutes = exports.authenticateRoutes = (0, _express.Router)();
const authenticateUserController = new _AuthenticateUserController.AuthenticateUserController();
const refreshTokenController = new _RefreshTokenController.RefreshTokenController();
authenticateRoutes.post('/sessions', authenticateUserController.handle);
authenticateRoutes.post('/refresh-token', refreshTokenController.handle);