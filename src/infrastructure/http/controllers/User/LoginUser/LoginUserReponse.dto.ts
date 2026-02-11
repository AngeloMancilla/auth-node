export class LoginUserReponseDTO {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly expiresIn: number,
    public readonly token: string,
  ) {}
}
