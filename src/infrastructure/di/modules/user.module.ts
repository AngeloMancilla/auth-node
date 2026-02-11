import { RegisterUserUseCase } from "../../../application/use-cases/RegisterUser/RegisterUserUseCase";
import { RegisterUserController } from "../../http/controllers/RegisterUser/RegisterUser.controller";
import { UserRepositoryImpl } from "../../persistence/UserRepository/UserRepositoryImpl";
import { JwtService } from "../../auth/JwtService";

export class UserModule {
  private static userRepository = new UserRepositoryImpl();
  private static jwtService = new JwtService();

  static getRegisterUserUseCase() {
    return new RegisterUserUseCase(this.userRepository);
  }

  static getRegisterUserController() {
    return new RegisterUserController(this.getRegisterUserUseCase(), this.jwtService);
  }
}
