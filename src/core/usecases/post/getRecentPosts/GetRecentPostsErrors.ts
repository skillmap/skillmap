import UseCaseError from "core/definition/UseCaseError";


export class NextPageNotFound extends UseCaseError {

  constructor(nextPageKey: number) {
    super(`posts for page key '${nextPageKey}' not found`);
  }

}

export class GetRecentPostInvalidRequest extends UseCaseError {

  constructor(requestPayload: unknown) {
    super(`request '${JSON.stringify(requestPayload)}' is not valid`);
  }

}
