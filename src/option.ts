export class Option<T> {
    readonly value?: T = undefined;
    constructor(result: Some_<T> | None_) {
        if (result instanceof Some_) {
            this.value = result.value;
        }
    }

    is_some(): boolean {
        return !!this.value;
    }

    is_none(): boolean {
        return !this.value;
    }

    expect(msg: string): T {
        if (this.value) return this.value;
        else throw Error(msg); 
    }

    unwrap(): T {
        if (this.value) return this.value;
        else throw Error();
    }

    unwrap_or(default_value: T): T {
        if (this.value) return this.value;
        else return default_value;
    }

    unwrap_or_else(f: () => T): T {
        if (this.value) return this.value;
        else return f();
    }

    map<U>(f: (t: T) => U): Option<U> {
        if (this.value) return Some<U>(f(this.value));
        else return None();
    }

    map_or<U>(default_value: U, f: (t: T) => U): U {
        if (this.value) return f(this.value);
        else return default_value;
    }

    map_or_else<U>(df: () => U, f: (t: T) => U): U {
        if (this.value) return f(this.value);
        else return df();
    }    
}

class Some_<T> {
    value: T;
    constructor(value: T) {
        this.value = value;
    }
}

export function Some<T>(value: T): Option<T> {
    return new Option<T>(new Some_(value));
}

class None_ {
    constructor() {}
}

export function None<T>(): Option<T> {
    return new Option<T>(new None_());
}