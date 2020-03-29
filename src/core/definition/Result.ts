
import UseCaseError from './UseCaseError';

export default class Result<T> {

    private value: T | undefined;
    private error?: UseCaseError;

    public isError: boolean;

    constructor(error: UseCaseError | undefined, value: T | undefined = undefined) {
        if (error) {
            this.isError = true;
            this.error = error;
        } else {
            this.isError = false;
            this.value = value;
        }
    }

    public getValue(): T {
        if (this.isError) {
            throw new Error("Can't get the value of an error result. Use 'errorValue' instead.");
        }
        return this.value as T;
    }

    public getError(): UseCaseError | undefined {
        if (this.isError) {
            return this.error as UseCaseError;
        }
        return undefined;
    }

    public static fail<T>(error: UseCaseError): Result<T> {
        return new Result<T>(error);
    }

    public static ok<T>(result: T): Result<T> {
        return new Result<T>(undefined, result);
    }
}
