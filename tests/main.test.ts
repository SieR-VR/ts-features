import { Result, Err, Ok } from "../src/result";

test("Result", () => {
    const result: Result<{ a: number }, string> = Ok({ a: 1 });
    expect(result.isOk).toBe(true);

    const result_err: Result<{ a: number }, string> = Err("error");
    expect(result_err.isOk).toBe(false);
});