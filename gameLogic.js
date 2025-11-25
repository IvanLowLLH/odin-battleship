import Player from "./Player.js";

const userPlayer = new Player("user");
const cpuPlayer = new Player("cpu");

let player = userPlayer;

function changePlayer() {
    if (player === userPlayer) {
        player = cpuPlayer;
    } else {
        player = userPlayer;
    }
}

export function initialisePlayerGameboard() {
    // For User
    // userPlayer.gameboard.addShip([[3,8], [4,8]]);
    // userPlayer.gameboard.addShip([[1,2], [1,3], [1,4]]);
    // userPlayer.gameboard.addShip([[5,5], [6,5], [7,5]]);
    // userPlayer.gameboard.addShip([[9,4], [9,5], [9,6], [9,7]]);
    // userPlayer.gameboard.addShip([[4,1], [5,1], [6,1], [7,1], [8,1],]);

    // For CPU
    // cpuPlayer.gameboard.addShip([[0,3], [0,4]]);
    // cpuPlayer.gameboard.addShip([[1,7], [2,7], [3,7]]);
    // cpuPlayer.gameboard.addShip([[4,1], [5,1], [6,1]]);
    // cpuPlayer.gameboard.addShip([[9,0], [9,1], [9,2], [9,3]]);
    // cpuPlayer.gameboard.addShip([[7,4], [7,5], [7,6], [7,7], [7,8]]);
    
    // randomizedPlacement(userPlayer.gameboard);
    randomizedPlacement(cpuPlayer.gameboard);
}

export function randomiseUserPlayerGameboard() {
    randomizedPlacement(userPlayer.gameboard);
}

function checkSquare(set, rowIndex, colIndex) {
    if (rowIndex > 9 || rowIndex < 0 || colIndex > 9 || colIndex < 0) {
        return false;
    }
    const key = `${rowIndex},${colIndex}`;
    if (set.has(key)) {
        return false;
    } else {
        return true;
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min); // Ensure minimum is an integer
    max = Math.floor(max); // Ensure maximum is an integer
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomizedPlacement(playerGameboad) {
    const shipLength = [2, 3, 3, 4, 5];
    const placedCoors = new Set();

    shipLength.forEach((length) => {
        let startSquareValid = false;
        let startRowIdx = 0;
        let startColIdx = 0;
        // Find valid starting square
        while (!startSquareValid) {
            startRowIdx = getRandomIntInclusive(0, 10);
            startColIdx = getRandomIntInclusive(0, 10);
            startSquareValid = checkSquare(placedCoors, startRowIdx, startColIdx);
        }
        // Randomise orientation and check if all squares valid
        let allSquaresValid = false;
        while (!allSquaresValid) {
            const testCoors = [];
            testCoors.push([startRowIdx, startColIdx]);
            let testRowIdx = startRowIdx;
            let testColIdx = startColIdx;
            const direction = getRandomIntInclusive(0, 3);
            if (direction == 0) {  // Increase column (right)
                for (let i = 0; i < length - 1; i++) {
                    testColIdx++;
                    testCoors.push([testRowIdx, testColIdx]);
                }
            } else if (direction == 1) {  // Increase row (downwards)
                for (let i = 0; i < length - 1; i++) {
                    testRowIdx++;
                    testCoors.push([testRowIdx, testColIdx]);
                }
            } else if (direction == 2) {  // Decrease column (left)
                for (let i = 0; i < length - 1; i++) {
                    testColIdx--;
                    testCoors.push([testRowIdx, testColIdx]);
                }
            } else if (direction == 3) {  // Decrease row (up)
                for (let i = 0; i < length - 1; i++) {
                    testRowIdx--;
                    testCoors.push([testRowIdx, testColIdx]);
                }
            }
            let validCounter = 0;
            testCoors.forEach((coors) => {
                if (checkSquare(placedCoors, coors[0], coors[1])) {
                    validCounter++;
                }
            })
            if (validCounter === length) {
                allSquaresValid = true;
                // All squares valid so add to set
                testCoors.forEach((coors) => {
                    const key = `${coors[0]},${coors[1]}`;
                    placedCoors.add(key);
                })
                // Add ship to player gameboard
                console.log(`Add ship of length ${length} at ${testCoors}`)
                playerGameboad.addShip(testCoors);
            }

        }
    })
}

export function getUserPlayer() {
    return userPlayer;
}

export function getCPUPlayer() {
    return cpuPlayer;
}

export function userPlayRound(selectedRow, selectedCol) {
    const hitResult = cpuPlayer.gameboard.receiveAttack([selectedRow, selectedCol]);
    return hitResult;
}

export function cpuPlayRound() {
    let validPlay = false;
    let randomRow = 0;
    let randomCol = 0;
    while (!validPlay) {
        randomRow = Math.floor(Math.random() * 10);
        randomCol = Math.floor(Math.random() * 10);
        validPlay = cpuPlayer.checkPlay([randomRow, randomCol]);
    }
    const hitResult = userPlayer.gameboard.receiveAttack([randomRow, randomCol]);
    return [hitResult, randomRow, randomCol];
}