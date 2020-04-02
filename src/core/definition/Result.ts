export default class Result<T> {

    private value?: T;
    private error?: T;

    public isError: boolean;

    constructor(error?: T, value?: T) {
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

    public getError(): T | undefined {
        if (this.isError) {
            return this.error as T;
        }
        return undefined;
    }

    public static fail<T>(error: T): Result<T> {
        return new Result<T>(error);
    }

    public static ok<T>(result: T): Result<T> {
        return new Result<T>(undefined, result);
    }
}
