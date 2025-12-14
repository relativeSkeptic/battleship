import { Computer } from "../src/core/computer";

test("randomMoves contains 100 unique coordinates", () => {
    const computer = new Computer();

    const randomMoves = (computer as unknown as { _randomMoves: string[] })
        ._randomMoves;

    expect(randomMoves.length).toBe(100);

    expect(new Set(randomMoves).size).toBe(100);
});

test("computer never repeats a move", () => {
    const computer = new Computer();
    const seen = new Set<string>();

    for (let i = 0; i < 100; i++) {
        const move = computer.takeTurn();
        expect(move).toBeDefined();
        expect(seen.has(move!)).toBe(false);
        seen.add(move!);
    }
});

test("computer only returns valid coordinates", () => {
    const computer = new Computer();
    const regex = /^[A-J](10|[1-9])$/;

    for (let i = 0; i < 100; i++) {
        const move = computer.takeTurn();
        expect(regex.test(move!)).toBe(true);
    }
});

test("computer throws after all moves are used", () => {
    const computer = new Computer();

    for (let i = 0; i < 100; i++) {
        computer.takeTurn();
    }

    expect(() => computer.takeTurn()).toThrow("No moves left");
});

test("reset regenerates move list", () => {
    const computer = new Computer();

    for (let i = 0; i < 100; i++) {
        computer.takeTurn();
    }

    computer.reset();

    const moves = new Set<string>();

    for (let i = 0; i < 100; i++) {
        moves.add(computer.takeTurn());
    }

    expect(moves.size).toBe(100);
});
