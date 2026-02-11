
import { Request, Response } from "express";
import { RegisterUserRequestSchema } from "./RegisterUserRequest.dto";
import { z } from "zod";
import { RegisterUserInput } from "../../../../../application/inputs/RegisterUser/RegisterUserInput";
import { RegisterUserUseCase } from "../../../../../application/use-cases/RegisterUser/RegisterUserUseCase";

export class RegisterUserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  async create(req: Request, res: Response) {
    try {
      //Validate HTTP
      const validatedData = RegisterUserRequestSchema.parse(req.body);

      //Mapping to Input
      const input = new RegisterUserInput(validatedData.name, validatedData.email, validatedData.password);

      //Use case
      const result = await this.registerUserUseCase.execute(input);

      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
