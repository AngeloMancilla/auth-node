import z from "zod";
import { LoginUserUseCase } from "../../../../../application/use-cases/LoginUser/LoginUserUseCase";
import { LoginUserReponseDTO } from "./LoginUserReponse.dto";
import { LoginUserRequesSchema } from "./LoginUserRequest.dto";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async login(req: Request, res: Response) {
    try {
      //Validate
      const validateData = LoginUserRequesSchema.parse(req.body);

      //login
      const result = await this.loginUserUseCase.execute(validateData);

      //map to DTO

      const mapped = new LoginUserReponseDTO(result.name, result.email, result.expiresIn, result.token);

      res.status(StatusCodes.OK).json(mapped);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(StatusCodes.BAD_REQUEST).json(error.message);
      } else {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
      }
    }
  }
}
