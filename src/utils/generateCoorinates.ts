export function generateCoordinates(): string[] {
    const letters = "ABCDEFGHIJ".split("");
    const coords: string[] = [];

    for (const letter of letters) {
        for (let number = 1; number <= 10; number++) {
            coords.push(`${letter}${number}`);
        }
    }

    return coords;
}
