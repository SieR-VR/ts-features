import { match, match_string, Enum, to_enum } from "../src/match";

interface Color {
    Red: [string];
    Green: [string, string];
    Blue: [string, string, string];
}

test("match", () => {
    const Color = to_enum<Color>();
    
    const test_red: Enum<Color> = Color.Red(["rose"]);
    const test_green: Enum<Color> = Color.Green(["grass", "tree"]);
    const test_blue: Enum<Color> = Color.Blue(["sky", "ocean", "twitter"]);

    const result_red = match<string, Color>(test_red, {
        Red: ([first]) => `${first} is red`,
        Green: ([first, second]) => `${first} and ${second} are green`,
        Blue: ([first, second, third]) => `${first}, ${second} and ${third} are blue`,
    });
    const result_green = match<string, Color>(test_green, {
        Red: ([first]) => `${first} is red`,
        Green: ([first, second]) => `${first} and ${second} are green`,
        Blue: ([first, second, third]) => `${first}, ${second} and ${third} are blue`,
    });
    const result_blue = match<string, Color>(test_blue, {
        Red: ([first]) => `${first} is red`,
        Green: ([first, second]) => `${first} and ${second} are green`,
        Blue: ([first, second, third]) => `${first}, ${second} and ${third} are blue`,
    });

    expect(result_red).toBe("rose is red");
    expect(result_green).toBe("grass and tree are green");
    expect(result_blue).toBe("sky, ocean and twitter are blue");
});