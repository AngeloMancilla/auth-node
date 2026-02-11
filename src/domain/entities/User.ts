import { UserId } from "../value-objects/UserId";

export class User {
  constructor(
    public readonly id: UserId,
    public name: string,
    public email: string,
    public password: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  updateName(name: string) {
    this.name = name;
    this.updatedAt = new Date();
  }

  updatePassword(password: string) {
    this.password = password;
    this.updatedAt = new Date();
  }
}
