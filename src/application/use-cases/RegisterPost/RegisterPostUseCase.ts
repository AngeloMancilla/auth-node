import { Post } from "../../../domain/entities/Post";
import { PostRepository } from "../../../domain/repository/PostRepository";
import { PostStatus } from "../../../domain/value-objects/PostStatus";
import { UserId } from "../../../domain/value-objects/UserId";
import { RegisterPostInput } from "../../inputs/RegisterPost/RegisterPostInput";

export class RegisterPostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(input: RegisterPostInput) {
    const post = new Post(input.id, new UserId(input.userId), input.content, PostStatus.ACTIVE, new Date(), new Date(), null);

    await this.postRepository.save(post);
  }
}
