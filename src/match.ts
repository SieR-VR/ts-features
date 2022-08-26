type MatchCallback<T, U> = {
    [K in keyof U]: (arg: U[K]) => T;
}

type MatchCallbackString<T, U extends string> = {
    [K in U]: (() => T);
}

type MatchCallbackNumber<T, U extends number> = {
    [K in U]: (() => T);
}

type Default<T> = {
    _?: (() => T);
}

export type Enum<T extends {}, U extends keyof T = keyof T> = {
    [K1 in U]: {
        [K2 in K1]: T[K2];
    } & {
        [K2 in Exclude<U, K1>]?: never;
    }
}[U];

export type EnumConstructor<T extends {}> = {
    [K in keyof T]: (arg: T[K]) => { [K_ in K]: T[K] };
}

export function to_enum<T extends {}>(): EnumConstructor<T> {
    return {} as EnumConstructor<T>;
}

export function match<T, U extends {}>(target: Enum<U>, callbacks: MatchCallback<T, U>): T {
    for (const key in target) {
        return callbacks[key](target[key]!);
    }

    throw new Error('No match found');
}

export function match_string<T, U extends string>(target: U, callbacks: MatchCallbackString<T, U> & Default<T>): T {
    if (callbacks[target]) {
        return callbacks[target]();
    }
    else {
        return callbacks._!();
    }
}

export function match_number<T, U extends number>(target: U, callbacks: MatchCallbackNumber<T, U> & Default<T>): T {
    if (callbacks[target]) {
        return callbacks[target]();
    }
    else {
        return callbacks._!();
    }
}
