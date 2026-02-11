import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repository/UserRepository";
import { UserId } from "../../../domain/value-objects/UserId";
import { RegisterUserInput } from "../../inputs/RegisterUser/RegisterUserInput";

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: RegisterUserInput) {
    // verify if user exists
    const userExists = await this.userRepository.findByEmail(input.email);
    if (userExists) throw new Error("User already exists");

    // Create the user
    const userId = UserId.generate();

    const user = new User(userId, input.name, input.email, input.password, new Date(), new Date());

    await this.userRepository.save(user);

    return {
      id: userId.getValue(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
