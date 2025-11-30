import { Computer } from "../src/core/computer";

test("correct number of ships are created", () => {
  let computer = new Computer();
  expect(computer.ships.size == 5);
});

test("correct type of ships are created", () => {
  let computer = new Computer();
  expect(computer.ships.has("carrier"));
  expect(computer.ships.has("battleship"));
  expect(computer.ships.has("destroyer"));
  expect(computer.ships.has("submarine"));
  expect(computer.ships.has("patrol_boat"));
});

test("randomMoves contains 100 unique coordinates", () => {
  const computer = new Computer();

  const randomMoves = (computer as unknown as { _randomMoves: string[] })
    ._randomMoves;

  expect(randomMoves.length).toBe(100);

  //Sets only allow unique values ensuring no values are duplicated
  expect(new Set(randomMoves).size).toBe(100);
});
