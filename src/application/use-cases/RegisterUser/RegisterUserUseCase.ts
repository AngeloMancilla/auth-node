import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repository/UserRepository";
import { UserId } from "../../../domain/value-objects/UserId";
import { RegisterUserInput } from "../../inputs/RegisterUser/RegisterUserInput";
import { PasswordHasher } from "../../ports/PasswordHasher";

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private passwordHasher: PasswordHasher,
  ) {}

  async execute(input: RegisterUserInput) {
    // verify if user exists
    const userExists = await this.userRepository.findByEmail(input.email);
    if (userExists) throw new Error("User already exists");

    // Create the user
    const userId = UserId.generate();
    const passwordHashed = await this.passwordHasher.hash(input.password);

    const user = new User(userId, input.name, input.email, passwordHashed, new Date(), new Date());

    await this.userRepository.save(user);
  }
}
