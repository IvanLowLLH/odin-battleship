import * as gameLogic from "./gameLogic.js"

const userBoard = document.getElementById("user-board");
const enemyBoard = document.getElementById("enemy-board");
const turnDisplay = document.getElementById("turn-message");
let cpuTurnNow = false;

const userSquares = [];
const enemySquares = [];

function renderGameboard() {
    // Render user player board;
    userBoard.textContent = "";
    const playergameBoard = gameLogic.getUserPlayer().gameboard.getBoard();
    
    // Helper to generate grid and store references
    const createGrid = (boardElement, storageArray, isUser) => {
        playergameBoard.forEach((row, rowIndex) => {
            const rowButtons = [];
            row.forEach((cell, colIndex) => {
                const btn = document.createElement("button");
                btn.classList.add("cell");
                btn.dataset.rowIndex = rowIndex;
                btn.dataset.colIndex = colIndex;
                
                // Only show ships for user
                if (isUser && typeof cell === "object" && cell !== null) {
                    btn.classList.add("ship");
                }
                
                boardElement.appendChild(btn);
                rowButtons.push(btn);
            });
            storageArray.push(rowButtons);
        });
    };

    createGrid(userBoard, userSquares, true);
    createGrid(enemyBoard, enemySquares, false);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clickBoard(event) {
    const selectedRow = event.target.dataset.rowIndex;
    const selectedCol = event.target.dataset.colIndex;

    if (!selectedRow || !selectedCol || cpuTurnNow) {
        return
    }
    const hitResult = gameLogic.userPlayRound(selectedRow, selectedCol);
    if (hitResult === null) {  // invalid hit
        return
    }
    updateBoard("enemy", hitResult, selectedRow, selectedCol);
    cpuTurn();
}

async function cpuTurn() {
    cpuTurnNow = true;
    updateTurnMessage();
    await sleep(2000);
    const [cpuHitResult, cpuSelectedRow, cpuselectedCol] = gameLogic.cpuPlayRound();
    updateBoard("user", cpuHitResult, cpuSelectedRow, cpuselectedCol);
    cpuTurnNow = false;
    updateTurnMessage();
}

function updateBoard(boardName, hitResult, selectedRow, selectedCol) {
    const targetArray = boardName === "enemy" ? enemySquares : userSquares;
    const selectedButton = targetArray[selectedRow][selectedCol]; 
    
    if (hitResult) {
        selectedButton.classList.add("hit");
    } else {
        selectedButton.classList.add("miss");
    }
}

function setupEnemyBoardEventListeners() {
    enemyBoard.addEventListener("click", clickBoard);
}

function updateTurnMessage() {
    if (!cpuTurnNow) {
        turnDisplay.textContent = "Your turn now!"
    } else {
        turnDisplay.textContent = "Computer is thinking..."
    }
}

export function loadUI() {
    renderGameboard();
    updateTurnMessage();
    setupEnemyBoardEventListeners()
}