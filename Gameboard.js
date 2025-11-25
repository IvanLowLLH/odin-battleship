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
            this.board[coor[0]][coor[1]] = {ship, index: shipIndex};
        })
    }

    receiveAttack(coor) {
        const cell = this.board[coor[0]][coor[1]];
        if (cell === "MISS" || cell === "HIT") { // Already missed or hit so invalid
            return null;
        }
        if (cell === null) { // Hit water
            this.board[coor[0]][coor[1]] = "MISS";
            return false
        } else { // Hit ship
            cell.ship.hit();
            this.board[coor[0]][coor[1]] = "HIT";
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

    numShipsAlive() {
        if (this.ships.length == 0) {
            return 0;
        }
        let shipAlive = 0
        this.ships.forEach((ship) => {
            if (!ship.isSunk()) {
                shipAlive++;
            }
        })
        return shipAlive;
    }

    getBoard() {
        return this.board;
    }
}

export default Gameboard;