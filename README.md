# TS-Features

This library is for using typescript more comfortable, and bring rust features to typescript!

# Usage

## installation

Type at your shell

```shell

yarn add ts-features

```

and register transformer to tsconfig.json

```json

{
    "compilerOptions": {
        "plugins": [
            { "transform": "ts-features/lib/transform" }
        ]
    }    
}

```

## pattern-matching

Write interface like this

```typescript

interface Color {
    red: [string];
    green: [string];
    blue: [string];
}

```

And, make interface as constant constructor object

```typescript

const Color = to_enum<Color>();

```

And, import match function

```typescript

import { match } from "ts-features";

```

Finally, you can use pattern matching!

```typescript

const result = match<string, Color>(Color.Red(["rose"]), {
    Red: ([first]) => `${first} red`,
    Blue: ([first]) => `${first} blue`,
    Green: ([first]) => `${first} green`,
});

expect(result).toBe("rose red");

```

## Rust-like error process

You can import these classes

```typescript

import { Result, Err, Ok } from "ts-features";

```

And, just use it as if you writing rust code!

```typescript

const result: Result<{ a: number }, string> = Ok({ a: 1 });
expect(result.isOk).toBe(true);

const result_err: Result<{ a: number }, string> = Err("error");
expect(result_err.isOk).toBe(false);

```