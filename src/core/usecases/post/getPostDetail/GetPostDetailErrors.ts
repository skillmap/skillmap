import UseCaseError from "core/definition/UseCaseError";


export class PostNotFound extends UseCaseError {

  constructor(postId: string) {
    super(`postId '${postId}' not found`);
  }

}

export class PostDetailInvalidRequest extends UseCaseError {

  constructor(requestPayload: unknown) {
    super(`request '${JSON.stringify(requestPayload)}' is not valid`);
  }

}
