export class RegisterUserResponseDTO {
  constructor(
    public readonly id: string,
    public readonly token: string,
    public readonly email: string,
    public readonly name: string,
    public readonly createdAt: Date,
  ) {}
}
