import { Computer } from "../src/core/computer";

test("randomMoves contains 100 unique coordinates", () => {
    const computer = new Computer();

    const randomMoves = (computer as unknown as { _randomMoves: string[] })
        ._randomMoves;

    expect(randomMoves.length).toBe(100);

    //Sets only allow unique values ensuring no values are duplicated
    expect(new Set(randomMoves).size).toBe(100);
});
