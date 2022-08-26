import { match, match_string, Enum, to_enum } from "../src/match";

interface Color {
    Red: [string];
    Green: [string, string];
    Blue: [string, string, string];
}

test("match", () => {
    const Color = to_enum<Color>();

    const result = match<string, Color>(Color.Red(["red"]), {
        Red: () => "red",
        Blue: () => "blue",
        Green: () => "green",
    });

    expect(result).toBe("red");
})