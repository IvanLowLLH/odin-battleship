import * as gameLogic from "./gameLogic.js"

const userBoard = document.getElementById("user-board");
const enemyBoard = document.getElementById("enemy-board");

function renderGameboard() {
    // Render user player board;
    userBoard.textContent = "";
    const playergameBoard = gameLogic.getUserPlayer().gameboard.getBoard();
    
    playergameBoard.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.rowIndex = rowIndex;
            cellButton.dataset.colIndex = colIndex;
            if (typeof cell === "object") {  // Cell contains ship
                cellButton.classList.add("ship");
            }
            userBoard.appendChild(cellButton);
        })
    })

    // Render enemy board
    playergameBoard.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.rowIndex = rowIndex;
            cellButton.dataset.colIndex = colIndex;
            enemyBoard.appendChild(cellButton);
        })
    })
}

export function loadUI() {
    renderGameboard();
}