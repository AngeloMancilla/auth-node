import { Router } from "express";
import { AppContainer } from "../../di/container";

export const userRouter = Router();

const registerUserController = AppContainer.user.getRegisterUserController();

userRouter.post("/users/register", (req, res) => registerUserController.create(req, res));
