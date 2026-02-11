import { Router } from "express";
import { AppContainer } from "../../di/container";

export const userRouter = Router();

const registerUserController = AppContainer.user.getRegisterUserController();
const loginUserController = AppContainer.user.getLoginUserController();

userRouter.post("/users/register", (req, res) => registerUserController.create(req, res));
userRouter.post("/users/login", (req, res) => loginUserController.login(req, res));
