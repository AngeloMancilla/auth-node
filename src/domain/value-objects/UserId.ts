import { randomUUID } from "crypto";

export class UserId {
  private readonly value: string;

  constructor(value: string) {
    if (!value) throw new Error("User ID can not be empty");

    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  static generate(): UserId {
    return new UserId(randomUUID());
  }
}
