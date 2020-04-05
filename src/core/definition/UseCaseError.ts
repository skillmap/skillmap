

export default class UseCaseError {
    public message: string;

    constructor(message: string) {
      this.message = message;
    }

    public errorType(): string {
      return this.constructor.name.toUpperCase();
    }
}
