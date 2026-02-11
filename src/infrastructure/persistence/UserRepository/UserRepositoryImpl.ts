import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repository/UserRepository";
import { UserId } from "../../../domain/value-objects/UserId";
import { PrismaClient } from "@prisma/client";

export class UserRepositoryImpl implements UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id.getValue(),
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!prismaUser) return null;

    return new User(
      new UserId(prismaUser.id),
      prismaUser.name,
      prismaUser.email,
      prismaUser.password,
      prismaUser.createdAt,
      prismaUser.updatedAt,
    );
  }

  async findById(id: UserId): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { id: id.getValue() },
    });

    if (!prismaUser) return null;

    return new User(
      new UserId(prismaUser.id),
      prismaUser.name,
      prismaUser.email,
      prismaUser.password,
      prismaUser.createdAt,
      prismaUser.updatedAt,
    );
  }

  async update(user: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id.getValue() },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        updatedAt: user.updatedAt,
      },
    });
  }
}
