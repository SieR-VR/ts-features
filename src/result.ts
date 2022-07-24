export class Result<T, E> {
    readonly value: T | E;
    readonly isOk: boolean; 
    
    constructor(result: Ok_<T> | Err_<E>) {
        if (result instanceof Ok_<T>) {
            this.value = result.value;
            this.isOk = true;
        }
        else {
            this.value = result.value;
            this.isOk = false;
        }
    }

    is_ok(): boolean {
        return this.isOk;
    }

    is_err(): boolean {
        return !this.isOk;
    }

    ok(): T | undefined {
        if (this.isOk) {
            return this.value as T;
        }
        else {
            return undefined;
        }
    }

    err(): E | undefined {
        if (this.isOk) {
            return undefined;
        }
        else {
            return this.value as E;
        }
    }

    map<U>(f: (t: T) => U): Result<U, E> {
        if (this.isOk) {
            return new Result<U, E>(new Ok_(f(this.value as T)));
        }
        else {
            return new Result<U, E>(new Err_(this.value as E));
        }
    }

    map_or<U>(default_: U, f: (t: T) => U): U {
        if (this.isOk) {
            return f(this.value as T);
        }
        else {
            return default_;
        }
    }

    map_or_else<U>(f: (e: E) => U, g: (t: T) => U): U {
        if (this.isOk) {
            return g(this.value as T);
        }
        else {
            return f(this.value as E);
        }
    }

    map_err<U>(f: (e: E) => U): Result<T, U> {
        if (this.isOk) {
            return new Result<T, U>(new Ok_(this.value as T));
        }
        else {
            return new Result<T, U>(new Err_(f(this.value as E)));
        }
    }
    
    inspect(f: (t: T) => void): void {
        if (this.isOk) {
            f(this.value as T);
        }
    }

    inspect_err(f: (e: E) => void): void {
        if (this.is_err()) {
            f(this.value as E);
        }
    }

    expect(message: string): T {
        if (this.isOk) {
            return this.value as T;
        }
        else {
            throw new Error(message);
        }
    }

    unwrap(): T {
        return this.expect('Result was Err');
    }

    unwrap_or_default(default_: T): T {
        if (this.isOk) {
            return this.value as T;
        }
        else {
            return default_;
        }
    }

    expect_err(message: string): E {
        if (this.is_err()) {
            return this.value as E;
        }
        else {
            throw new Error(message);
        }
    }

    unwrap_err(): E {
        return this.expect_err('Result was Ok');
    }

    and<U>(res: Result<U, E>): Result<U, E> {
        if (this.isOk) {
            return res;
        }
        else {
            return new Result<U, E>(new Err_(this.value as E));
        }
    }

    and_then<U>(f: (t: T) => Result<U, E>): Result<U, E> {
        if (this.isOk) {
            return f(this.value as T);
        }
        else {
            return new Result<U, E>(new Err_(this.value as E));
        }
    }

    or<U>(res: Result<T, U>): Result<T, U> {
        if (this.isOk) {
            return new Result<T, U>(new Ok_(this.value as T));
        }
        else {
            return res;
        }
    }

    or_else<U>(f: (e: E) => Result<T, U>): Result<T, U> {
        if (this.isOk) {
            return new Result<T, U>(new Ok_(this.value as T));
        }
        else {
            return f(this.value as E);
        }
    }

    unwrap_or(default_: T): T {
        if (this.isOk) {
            return this.value as T;
        }
        else {
            return default_;
        }
    }

    unwrap_or_else(f: (e: E) => T): T {
        if (this.isOk) {
            return this.value as T;
        }
        else {
            return f(this.value as E);
        }
    }
}

class Ok_<T> {
    value: T;
    constructor(value: T) {
        this.value = value;
    }
}

export function Ok<T, E>(value: T): Result<T, E> {
    return new Result<T, E>(new Ok_(value));
}

class Err_<E> {
    value: E;
    constructor(value: E) {
        this.value = value;
    }
}

export function Err<T, E>(value: E): Result<T, E> {
    return new Result<T, E>(new Err_(value));
}