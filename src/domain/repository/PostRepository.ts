import { Post } from "../entities/Post";

export interface PostRepository {
  save(post: Post): Promise<void>;
  findById(id: string): Promise<Post | null>;
  update(post: Post): Promise<void>;
  delete(id: string): Promise<void>;
}
