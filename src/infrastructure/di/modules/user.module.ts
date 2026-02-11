import { LoginUserUseCase } from "../../../application/use-cases/LoginUser/LoginUserUseCase";
import { RegisterUserUseCase } from "../../../application/use-cases/RegisterUser/RegisterUserUseCase";
import { BcryptPasswordHasher } from "../../auth/BcryptPasswordHasher";
import { JwtService } from "../../auth/JwtService";
import { LoginUserController } from "../../http/controllers/User/LoginUser/LoginUser.controller";
import { RegisterUserController } from "../../http/controllers/User/RegisterUser/RegisterUser.controller";

import { UserRepositoryImpl } from "../../persistence/UserRepository/UserRepositoryImpl";

export class UserModule {
  private static userRepository = new UserRepositoryImpl();
  private static passwordHasher = new BcryptPasswordHasher();
  private static jwtService = new JwtService();

  static getRegisterUserUseCase() {
    return new RegisterUserUseCase(this.userRepository, this.passwordHasher);
  }

  static getRegisterUserController() {
    return new RegisterUserController(this.getRegisterUserUseCase());
  }

  static getLoginUserUseCase() {
    return new LoginUserUseCase(this.passwordHasher, this.userRepository, this.jwtService);
  }

  static getLoginUserController() {
    return new LoginUserController(this.getLoginUserUseCase());
  }
}
