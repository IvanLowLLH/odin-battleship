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
            if (typeof cell === "object" && cell !== null) {  // Cell contains ship
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

function clickBoard(event) {
    const selectedRow = event.target.dataset.rowIndex;
    const selectedCol = event.target.dataset.colIndex;

    if (!selectedRow || !selectedCol) {
        return
    }
    const hitResult = gameLogic.userPlayRound(selectedRow, selectedCol);
    if (hitResult === null) {  // invalid hit
        return
    }
    updateEnemyBoard(hitResult, selectedRow, selectedCol);
}

function updateEnemyBoard(hitResult, selectedRow, selectedCol) {
    const selectedButton = enemyBoard.querySelector(`[data-row-index="${selectedRow}"][data-col-index="${selectedCol}"]`);
    if (hitResult) {
        selectedButton.classList.add("hit");
    } else {
        selectedButton.classList.add("miss");
    }
}

function setupEnemyBoardEventListeners() {
    enemyBoard.addEventListener("click", clickBoard);
}

export function loadUI() {
    renderGameboard();
    setupEnemyBoardEventListeners()
}