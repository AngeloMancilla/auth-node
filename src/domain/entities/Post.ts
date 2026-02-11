import { PostStatus } from "../value-objects/PostStatus";
import { UserId } from "../value-objects/UserId";

export class Post {
  constructor(
    public readonly id: string,
    public readonly user_id: UserId,
    public content: string,
    public status: PostStatus,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date | null,
  ) {}

  edit(content: string) {
    this.content = content;
    this.updatedAt = new Date();
  }

  delete() {
    this.status = PostStatus.DELETED;
    this.updatedAt = new Date();
    this.deletedAt = new Date();
  }
}
