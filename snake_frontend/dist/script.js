const canvas = document.querySelector("#game-board");
const context = canvas.getContext("2d");

const scoreElement = document.querySelector("#score");
const bestScoreElement = document.querySelector("#best-score");
const messageElement = document.querySelector("#game-message");
const messageTitle = document.querySelector("#message-title");
const messageText = document.querySelector("#message-text");
const insertText = document.querySelector(".insert-text");
const startButton = document.querySelector("#start-button");
const coinButton = document.querySelector("#coin-button");
const restartButton = document.querySelector("#restart-button");
const pauseButton = document.querySelector("#pause-button");
const statusText = document.querySelector("#status-text");
const statusLed = document.querySelector("#status-led");
const eraYearElement = document.querySelector("#era-year");
const nextEraElement = document.querySelector("#next-era");
const eraTransition = document.querySelector("#era-transition");
const transitionYear = document.querySelector("#transition-year");
const transitionName = document.querySelector("#transition-name");
const mobileButtons = document.querySelectorAll("[data-direction]");
const themeButtons = document.querySelectorAll("[data-theme-choice]");

const GRID_SIZE = 15;
const CELL_SIZE = canvas.width / GRID_SIZE;

let snake;
let apple;
let direction;
let nextDirection;
let score;
let gameTimer;
let eraTimer;
let currentEraIndex = 0;
let running = false;
let paused = false;
let audioContext;
let bestScore = Number(localStorage.getItem("snake-garden-best")) || 0;

const directions = {
  up: { row: -1, column: 0 },
  down: { row: 1, column: 0 },
  left: { row: 0, column: -1 },
  right: { row: 0, column: 1 },
};

const keyDirections = {
  ArrowUp: "up",
  z: "up",
  w: "up",
  ArrowDown: "down",
  s: "down",
  ArrowLeft: "left",
  q: "left",
  a: "left",
  ArrowRight: "right",
  d: "right",
};

const eras = [
  { year: "1984", name: "ARCADE AGE", theme: "neon", tone: 320 },
  { year: "1995", name: "CYBER WAVE", theme: "red", tone: 190 },
  { year: "2000", name: "Y2K MODE", theme: "y2k", tone: 520 },
  { year: "2026", name: "BIO FUTURE", theme: "jungle", tone: 680 },
];

function resetGame() {
  snake = [
    { row: 7, column: 7 },
    { row: 7, column: 6 },
    { row: 7, column: 5 },
  ];
  direction = "right";
  nextDirection = "right";
  score = 0;
  apple = createApple();
  setEra(0, false);
  updateScore();
  drawGame();
}

function createApple() {
  let newApple;

  do {
    newApple = {
      row: Math.floor(Math.random() * GRID_SIZE),
      column: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((part) => samePosition(part, newApple)));

  return newApple;
}

function samePosition(firstPosition, secondPosition) {
  return (
    firstPosition.row === secondPosition.row &&
    firstPosition.column === secondPosition.column
  );
}

function cssColor(variableName) {
  return getComputedStyle(document.body).getPropertyValue(variableName).trim();
}

function drawGame() {
  drawBoard();
  drawApple();
  snake.forEach((part, index) => drawSnakePart(part, index));
}

function drawBoard() {
  const firstColor = cssColor("--screen-grid-a");
  const secondColor = cssColor("--screen-grid-b");
  const gridLineColor = cssColor("--screen-dark");

  context.fillStyle = gridLineColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let column = 0; column < GRID_SIZE; column += 1) {
      context.fillStyle = (row + column) % 2 === 0 ? firstColor : secondColor;
      context.fillRect(
        column * CELL_SIZE + 1,
        row * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2,
      );
    }
  }
}

function drawSnakePart(part, index) {
  const margin = index === 0 ? 3 : 5;
  const x = part.column * CELL_SIZE + margin;
  const y = part.row * CELL_SIZE + margin;
  const size = CELL_SIZE - margin * 2;

  context.fillStyle = index === 0 ? cssColor("--snake-head") : cssColor("--snake-body");
  context.shadowColor = context.fillStyle;
  context.shadowBlur = index === 0 ? 16 : 9;
  context.fillRect(x, y, size, size);
  context.shadowBlur = 0;

  context.fillStyle = "rgba(255,255,255,.28)";
  context.fillRect(x + 4, y + 4, size - 8, 4);

  if (index === 0) {
    drawEyes(x, y, size);
  }
}

function drawEyes(x, y, size) {
  let firstEye;
  let secondEye;

  if (direction === "left" || direction === "right") {
    const eyeX = direction === "right" ? x + size - 8 : x + 4;
    firstEye = { x: eyeX, y: y + 7 };
    secondEye = { x: eyeX, y: y + size - 11 };
  } else {
    const eyeY = direction === "down" ? y + size - 8 : y + 4;
    firstEye = { x: x + 7, y: eyeY };
    secondEye = { x: x + size - 11, y: eyeY };
  }

  context.fillStyle = "#08080d";
  context.fillRect(firstEye.x, firstEye.y, 5, 5);
  context.fillRect(secondEye.x, secondEye.y, 5, 5);
}

function drawApple() {
  const x = apple.column * CELL_SIZE;
  const y = apple.row * CELL_SIZE;
  const appleColor = cssColor("--apple");

  context.fillStyle = appleColor;
  context.shadowColor = appleColor;
  context.shadowBlur = 17;
  context.fillRect(x + 10, y + 13, 22, 19);
  context.fillRect(x + 7, y + 17, 28, 10);
  context.shadowBlur = 0;

  context.fillStyle = cssColor("--snake-head");
  context.fillRect(x + 23, y + 7, 9, 6);
  context.fillStyle = "#60351e";
  context.fillRect(x + 19, y + 5, 4, 10);
}

function moveSnake() {
  direction = nextDirection;
  const movement = directions[direction];
  const head = snake[0];
  const newHead = {
    row: head.row + movement.row,
    column: head.column + movement.column,
  };
  const ateApple = samePosition(newHead, apple);
  const bodyToCheck = ateApple ? snake : snake.slice(0, -1);

  if (hitWall(newHead) || bodyToCheck.some((part) => samePosition(part, newHead))) {
    endGame();
    return;
  }

  snake.unshift(newHead);

  if (ateApple) {
    score += 1;
    apple = createApple();
    updateScore();
    const eraChanged = updateEraFromScore();
    if (!eraChanged) {
      updateSpeed();
    }
    playTone(540, 0.08, "square");
    setTimeout(() => playTone(760, 0.07, "square"), 70);
  } else {
    snake.pop();
  }

  drawGame();
}

function hitWall(position) {
  return (
    position.row < 0 ||
    position.row >= GRID_SIZE ||
    position.column < 0 ||
    position.column >= GRID_SIZE
  );
}

function changeDirection(newDirection) {
  if (!running || paused) {
    return;
  }

  const oppositeDirections = {
    up: "down",
    down: "up",
    left: "right",
    right: "left",
  };

  if (newDirection !== oppositeDirections[direction]) {
    nextDirection = newDirection;
  }
}

function startGame() {
  clearInterval(gameTimer);
  resetGame();
  running = true;
  paused = false;
  messageElement.classList.add("hidden");
  pauseButton.disabled = false;
  pauseButton.textContent = "";
  pauseButton.append(createButtonLight(), "Pause");
  setStatus("PLAY", true);
  scheduleGame(175);
  playTone(190, 0.08, "square");
  setTimeout(() => playTone(380, 0.09, "square"), 90);
}

function createButtonLight() {
  return document.createElement("span");
}

function scheduleGame(speed) {
  clearInterval(gameTimer);
  gameTimer = setInterval(moveSnake, speed);
}

function updateSpeed() {
  const speed = Math.max(82, 175 - Math.floor(score / 5) * 15);
  scheduleGame(speed);
}

function togglePause() {
  if (!running) {
    return;
  }

  paused = !paused;

  if (paused) {
    clearInterval(gameTimer);
    pauseButton.lastChild.textContent = "Resume";
    setStatus("PAUSE", false);
  } else {
    updateSpeed();
    pauseButton.lastChild.textContent = "Pause";
    setStatus("PLAY", true);
  }

  playTone(paused ? 240 : 420, 0.06, "square");
}

function endGame() {
  clearInterval(gameTimer);
  clearTimeout(eraTimer);
  eraTransition.classList.remove("active");
  running = false;
  paused = false;
  pauseButton.disabled = true;
  setStatus("GAME OVER", false);

  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("snake-garden-best", bestScore);
    updateScore();
  }

  insertText.textContent = "GAME OVER";
  messageTitle.textContent = String(score).padStart(4, "0") + " PTS";
  messageText.innerHTML = "La partie est terminée.<br>Reviens battre ton record.";
  startButton.textContent = "PLAY AGAIN";
  messageElement.classList.remove("hidden");
  playTone(260, 0.14, "sawtooth");
  setTimeout(() => playTone(150, 0.22, "sawtooth"), 130);
}

function updateScore() {
  scoreElement.textContent = String(score).padStart(4, "0");
  bestScoreElement.textContent = String(bestScore).padStart(4, "0");
  nextEraElement.textContent = String(5 - (score % 5));
}

function setStatus(text, isActive) {
  statusText.textContent = text;
  statusLed.classList.toggle("active", isActive);
}

function chooseTheme(theme, withSound = true) {
  document.body.dataset.theme = theme;

  themeButtons.forEach((button) => {
    const isSelected = button.dataset.themeChoice === theme;
    button.classList.toggle("active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  drawGame();
  if (withSound) {
    const era = eras.find((item) => item.theme === theme);
    playTone(era ? era.tone : 320, 0.07, "square");
  }
}

function setEra(index, showTransition) {
  currentEraIndex = index;
  const era = eras[currentEraIndex];

  eraYearElement.textContent = era.year;
  chooseTheme(era.theme, false);

  if (showTransition) {
    showEraTransition(era);
  }
}

function updateEraFromScore() {
  if (score === 0 || score % 5 !== 0) {
    return false;
  }

  const newEraIndex = Math.floor(score / 5) % eras.length;
  setEra(newEraIndex, true);
  return true;
}

function showEraTransition(era) {
  clearInterval(gameTimer);
  clearTimeout(eraTimer);
  transitionYear.textContent = era.year;
  transitionName.textContent = era.name;
  eraTransition.classList.add("active");
  setStatus("TIME WARP", true);

  playTone(era.tone, 0.12, "square");
  setTimeout(() => playTone(era.tone * 1.5, 0.12, "square"), 130);

  eraTimer = setTimeout(() => {
    eraTransition.classList.remove("active");
    if (running && !paused) {
      setStatus("PLAY", true);
      updateSpeed();
    }
  }, 1500);
}

function previewEra(theme) {
  if (running) {
    return;
  }

  const eraIndex = eras.findIndex((era) => era.theme === theme);
  if (eraIndex !== -1) {
    setEra(eraIndex, false);
    playTone(eras[eraIndex].tone, 0.07, "square");
  }
}

function playTone(frequency, duration, waveType) {
  try {
    audioContext = audioContext || new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = waveType;
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.045, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  } catch (error) {
    // Le jeu continue normalement si le navigateur bloque le son.
  }
}

document.addEventListener("keydown", (event) => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  const newDirection = keyDirections[key];

  if (newDirection) {
    event.preventDefault();
    changeDirection(newDirection);
  }

  if (event.code === "Space") {
    event.preventDefault();
    togglePause();
  }

  if (event.key === "Enter" && !running) {
    startGame();
  }
});

mobileButtons.forEach((button) => {
  button.addEventListener("pointerdown", () => {
    changeDirection(button.dataset.direction);
  });
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    previewEra(button.dataset.themeChoice);
  });
});

startButton.addEventListener("click", startGame);
coinButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", togglePause);

resetGame();
