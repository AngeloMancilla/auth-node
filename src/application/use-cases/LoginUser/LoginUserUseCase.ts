import { UserRepository } from "../../../domain/repository/UserRepository";
import { AuthConfig } from "../../../infrastructure/auth/AuthConfig";

import { LoginUserInput } from "../../inputs/LoginUser/LoginUserInput";
import { PasswordHasher } from "../../ports/PasswordHasher";
import { TokenService } from "../../ports/TokenService";
import { LoginUserOutput } from "./LoginUserOutput";

export class LoginUserUseCase {
  constructor(
    private readonly passwordHasher: PasswordHasher,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute(input: LoginUserInput): Promise<LoginUserOutput> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) throw new Error("User not found");

    //Compare passwords

    const isEqual = await this.passwordHasher.compare(input.password, user.password);

    if (!isEqual) throw new Error("Incorrect email or password");

    //Login

    const token = this.tokenService.sign(
      {
        email: user.email,
        name: user.name,
        userId: user.id.getValue(),
      },
      AuthConfig.JWT_ACCESS_TOKEN_EXPIRATION,
    );

    const expiresIn = this.tokenService.getExpiresIn(token);

    return new LoginUserOutput(user.id.getValue(), user.name, user.email, token, expiresIn);
  }
}
