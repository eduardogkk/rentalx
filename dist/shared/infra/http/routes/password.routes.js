"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRoutes = void 0;
var _express = require("express");
var _sendForgotPasswordMailController = require("../../../../modules/accounts/useCases/sendForgotPasswordMail/sendForgotPasswordMailController");
var _ResetPasswordUserController = require("../../../../modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController");
const passwordRoutes = exports.passwordRoutes = (0, _express.Router)();
const sendForgotPasswordMailController = new _sendForgotPasswordMailController.SendForgotPasswordMailController();
const resetPasswordUserController = new _ResetPasswordUserController.ResetPasswordUserController();
passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordUserController.handle);