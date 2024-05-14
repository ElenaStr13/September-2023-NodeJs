import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";
import {fileMiddleware} from "../middlewares/file.middleware";



const router = Router();

router.get("/", userController.getList);

router.get("/me", authMiddleware.checkAccessToken, userController.getMe);
router.put(
    "/me",
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(UserValidator.update),
    userController.updateMe,
);
router.delete("/me", authMiddleware.checkAccessToken, userController.deleteMe);

router.post(
    "/me/avatar",
    authMiddleware.checkAccessToken,
    fileMiddleware.isAvatarValid,
    userController.uploadAvatar,
);

router.delete(
    "/me/avatar",
    authMiddleware.checkAccessToken,
    userController.deleteAvatar,
);

router.get("/:userId", commonMiddleware.isIdValid, userController.getById);

router.delete(
    "/:userId",
    commonMiddleware.isIdValid,
    userController.deleteById,
);

export const userRouter = router;