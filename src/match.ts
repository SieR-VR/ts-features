type MatchCallback<T, U> = {
    [K in keyof U]: (arg: U[K]) => T;
}

type MatchCallbackOr<T, U extends string> = {
    [K in U]: (() => T);
}

type Default<T> = {
    _?: (() => T);
}

type MatchTarget<T extends {}, U extends keyof T = keyof T> = {
    [K1 in U]: {
        [K2 in K1]: T[K2];
    } & {
        [K2 in Exclude<U, K1>]?: never;
    }
}[U];

type test = MatchTarget<Color>;

function match<T, U>(target: MatchTarget<U>, callbacks: MatchCallback<T, U>): T {
    for (const key in target) {
        return callbacks[key](target[key]!);
    }

    throw new Error('No match found');
}

function match_string<T, U extends string>(target: U, callbacks: MatchCallbackOr<T, U> & Default<T>): T {
    if (callbacks[target]) {
        return callbacks[target]();
    }
    else {
        return callbacks._!();
    }
}

interface Color {
    Red: [string];
    Green: [string, string];
    Blue: [string, string, string];
}

const result = match<string, Color>({ Red: ["Rose"] }, {
    Red: ([first]) => `${first} is Red`,
    Green: ([first, second]) => `${first} and ${second} are Green`,
    Blue: ([first, second, third]) => `${first}, ${second} and ${third} are Blue`,
});

console.log(result); // 'Rose is Red'

const string_result = match_string<string, 'Red' | 'Green' | 'Blue'>('Red', {
    Red: () => 'Rose',
    Green: () => 'Grass',
    Blue: () => 'Sky',
});

console.log(string_result); // 'Rose'

const literal_result = match_string<string, string>('Green', {
    Red: () => 'Rose',
    _: () => 'Default',
})

console.log(literal_result); // 'Default'

