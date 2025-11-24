import Ship from "./Ship";

test("ship hit property increase", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hitTimes).toBe(1);
})

test("ship sunk if length is 2 and hit 2 times", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
})