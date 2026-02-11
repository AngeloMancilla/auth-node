import { RegisterUserInput } from "../../../../application/inputs/RegisterUser/RegisterUserInput";
import { RegisterUserUseCase } from "../../../../application/use-cases/RegisterUser/RegisterUserUseCase";
import { Request, Response } from "express";
import { RegisterUserRequestSchema } from "./RegisterUserRequest.dto";
import { z } from "zod";
import { RegisterUserResponseDTO } from "./RegisterUserReponse.dto";
import { JwtService } from "../../../auth/JwtService";

export class RegisterUserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async create(req: Request, res: Response) {
    try {
      //Validate HTTP
      const validatedData = RegisterUserRequestSchema.parse(req.body);

      //Mapping to Input
      const input = new RegisterUserInput(validatedData.name, validatedData.email, validatedData.password);

      //Use case
      const result = await this.registerUserUseCase.execute(input);

      //Create token
      const token = this.jwtService.sign(
        {
          id: result.id,
          email: result.email,
        },
        "24h",
      );

      const response = new RegisterUserResponseDTO(result.id, token, result.email, result.name, result.createdAt);

      return res.status(201).json(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
