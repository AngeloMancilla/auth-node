export class LoginUserOutput {
  constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly email: string,
    public readonly token: string,
    public readonly expiresIn: number,
  ) {}
}
