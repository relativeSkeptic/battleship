import { Ship } from "../core/ship";

/* TODO: Consider moving this to the Player class
   and having the Computer class extend the Player class*/

export function createShips(): Map<string, Ship> {
  let newShips = new Map<string, Ship>();

  newShips.set("carrier", new Ship(5));
  newShips.set("battleship", new Ship(4));
  newShips.set("destroyer", new Ship(3));
  newShips.set("submarine", new Ship(3));
  newShips.set("patrol_boat", new Ship(2));

  return newShips;
}
