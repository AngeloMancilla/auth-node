export class RegisterUserInput {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {
    if (name.length < 2) throw new Error("Name is too short");
    if (!email.includes("@")) throw new Error("Email is not valid");
    if (password.length < 8) throw new Error("Password need to have 8 characters as minimum");
  }
}
