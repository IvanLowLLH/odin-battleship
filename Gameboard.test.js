import Gameboard from "./Gameboard";

test("receiveAttack returns true if ship is present", () => {
    const gameboard = new Gameboard();
    gameboard.addShip([[1, 2], [1, 3]]);
    const hit = gameboard.receiveAttack([1, 2]);
    expect(hit).toBe(true);
})

test("receiveAttack returns false if ship is not present", () => {
    const gameboard = new Gameboard();
    gameboard.addShip([[1, 2], [1, 3]]);
    const hit = gameboard.receiveAttack([1, 5]);
    expect(hit).toBe(false);
})

test("Gameboard report if all ships are sunk", () => {
     const gameboard = new Gameboard();
    gameboard.addShip([[1, 2], [1, 3]]);
    gameboard.receiveAttack([1, 2]);
    gameboard.receiveAttack([1, 3]);
    expect(gameboard.allShipsSunk()).toBe(true);
})