import UseCaseError from "core/definition/UseCaseError";


export class PostNotFound extends UseCaseError {

  constructor(postId: string) {
    super(`postId '${postId}' not found`);
  }
}
