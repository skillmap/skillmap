

export default class UseCaseError {
    public message: string;

    constructor(message: string) {
      this.message = message;
    }

    public getErrorType(): string {
      return this.constructor.name.toUpperCase();
    }
}
