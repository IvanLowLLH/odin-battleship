import Ship from "./Ship.js";

class Gameboard {
    constructor() {
        this.ships = [];
        this.board = [];
        // Initialize 10x10 board with null
        for (let i = 0; i < 10; i++) {
            this.board[i] = new Array(10).fill(null);
        }
    }

    addShip(coor_array) {
        const shipLength = coor_array.length;
        const ship = new Ship(shipLength);
        this.ships.push(ship);
        const shipIndex = this.ships.length - 1;
        coor_array.forEach((coor) => {
            this.board[coor[1]][coor[0]] = {ship, index: shipIndex};
        })
    }

    receiveAttack(coor) {
        const cell = this.board[coor[1]][coor[0]];
        if (cell === "m" || cell === "h") { // Already missed or hit so invalid
            return null;
        }
        if (cell === null) { // Hit water
            this.board[coor[1]][coor[0]] = "m";
            return false
        } else { // Hit ship
            cell.ship.hit();
            this.board[coor[1]][coor[0]] = "h";
            return true
        }
    }

    allShipsSunk() {
        const totalNumShips = this.ships.length;
        let shipSunkCounter = 0;
        this.ships.forEach((ship) => {
            if (ship.isSunk()) {
                shipSunkCounter++;
            }
        })
        if (shipSunkCounter === totalNumShips) {
            return true;
        } else {
            return false;
        }
    }

    getBoard() {
        return this.board;
    }
}

export default Gameboard;