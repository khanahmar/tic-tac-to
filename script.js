const tiles = Array.from(document.querySelectorAll(".tile"));
const playerDisplay = document.querySelector(".display-player");
const reset = document.querySelector("#reset");
const announcer = document.querySelector(".announcer");



let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const PLAYERX_WON = "PLAYERX_WON";
const PLAYERO_WON = "PLAYERO_WON";
const TIE = "TIE";

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// handle result validitaion fucntion
function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
    isGameActive = false;
    return;
  }

  if (!board.includes("")) announce(TIE);
}

// upadate board function
function updateBoard(index) {
  board[index] = currentPlayer;
}

// announce function
const announce = (type) => {
  switch (type) {
    case PLAYERO_WON:
      announcer.innerHTML = `Player <span class="playerO">O</span> Won`;
      break;
    case PLAYERX_WON:
      announcer.innerHTML = `Player <span class="playerX">X</span> Won`;
      break;
    case TIE:
      announcer.innerText = "TIE";
  }
  announcer.classList.remove("hide");
};

// is valid fucntion
function isValidAction(tile) {
  if (tile.innerText === "X" || tile.innerText === "O") {
    return false;
  }
  return true;
}

// change player function
function changePlayer() {
  playerDisplay.classList.remove(`player${currentPlayer}`);
  if (currentPlayer == "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  playerDisplay.innerHTML = currentPlayer;
  playerDisplay.classList.add(`player${currentPlayer}`);
}

// user acion function
const userAction = (tile, index) => {
  if (isValidAction(tile) && isGameActive) {
    console.log("click");
    tile.innerText = currentPlayer;
    tile.classList.add(`player${currentPlayer}`);
    updateBoard(index);
    handleResultValidation();
    changePlayer();
  }
};

// Event listner on tiles
tiles.forEach((tile, index) => {
  tile.addEventListener("click", () => userAction(tile, index));
});

// reset board function
function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  announcer.classList.add("hide");
  if (currentPlayer === "O") {
    changePlayer;
  }
  tiles.forEach((tile) => {
    tile.innerText = "";
    tile.classList.remove("playerX");
    tile.classList.remove("playerO");
  });
}

reset.addEventListener("click", resetBoard);
