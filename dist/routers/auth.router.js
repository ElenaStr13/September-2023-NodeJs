"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const common_middleware_1 = require("../middlewares/common.middleware");
const user_validator_1 = require("../validators/user.validator");
const action_token_type_enum_1 = require("../enums/action-token-type.enum");
const router = (0, express_1.Router)();
router.post("/sign-up", common_middleware_1.commonMiddleware.isBodyValid(user_validator_1.UserValidator.create), auth_controller_1.authController.signUp);
router.post("/sign-in", common_middleware_1.commonMiddleware.isBodyValid(user_validator_1.UserValidator.login), auth_controller_1.authController.signIn);
router.post("/refresh", auth_middleware_1.authMiddleware.checkRefreshToken, auth_controller_1.authController.refresh);
router.post("/forgot-password", common_middleware_1.commonMiddleware.isBodyValid(user_validator_1.UserValidator.forgotPassword), auth_controller_1.authController.forgotPassword);
router.put("/forgot-password", common_middleware_1.commonMiddleware.isBodyValid(user_validator_1.UserValidator.setForgotPassword), auth_middleware_1.authMiddleware.checkActionToken(action_token_type_enum_1.ActionTokenTypeEnum.FORGOT), auth_controller_1.authController.setForgotPassword);
router.put("/verify", auth_middleware_1.authMiddleware.checkActionToken(action_token_type_enum_1.ActionTokenTypeEnum.VERIFY), auth_controller_1.authController.verify);
router.patch("/change-password", common_middleware_1.commonMiddleware.isBodyValid(user_validator_1.UserValidator.changePassword), auth_middleware_1.authMiddleware.checkAccessToken, auth_controller_1.authController.changePassword);
exports.authRouter = router;
