import { Router } from "express";
import { userRouter } from "./User/user.routes";

export const apiRouter = Router();

apiRouter.use("/users", userRouter);