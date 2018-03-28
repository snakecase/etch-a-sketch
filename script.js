`use strict`;

const askGrid = function () {
  let input = prompt(`How many squares per side? (max. 100 or it will hang)`);
  if (isNaN(input) || /\s/.test(input)) {
    alert(`Only numbers please.`);
    return askGrid();
  } else if (input > 100) {
    alert(`100 is maximum because it's hard for Browser to render so much squares at once. Don't make it sad. Setting 100x100...`);
    return 100;
  } else if (!input) {
    return `canceled`;
  }

  return Math.round(Math.abs(input));
}

const gradeColor = function (cell) {
  if (!cell.style.backgroundColor) {
    const color = `rgba(0, 0, 0, 0)`;
    cell.style.backgroundColor = color;
  }

  let splitRGB = cell.style.backgroundColor.split(/[^0-9.]/);
  
  // Increase color by ~10%
  let r = splitRGB[5];
  let g = splitRGB[7];
  let b = splitRGB[9];
  let o = Number(splitRGB[11]) + 0.1;
  cell.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${o})`;
}

const listenCells = function () {
  let cells = document.querySelectorAll(`.cell`);
  cells.forEach(item => {
    item.addEventListener(`mouseover`, () => gradeColor(item))
  });
}

const blink = function (container) {
  setTimeout(() => {
    container.classList.add(`blink-black`);
  }, 350);
  setTimeout(() => {
    container.classList.remove(`blink-black`);
  }, 600);
}

const resetGrid = function (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

const createGrid = function (num) {
  const container = document.getElementById(`grid-container`);

  // Prompt if createGrid was called without an argument
  if (!num) {
    num = askGrid();
    // If no input or cancel were given, don't reset the grid
    if (num === `canceled`) return;
    blink(container);
  }

  resetGrid(container);

  // Generate cells
  for (let i = 1; i <= num * num; i++) {
    const cell = document.createElement(`div`);
    cell.classList.add(`cell`, `cell-${i}`);
    container.appendChild(cell);
  }

  // Edit css grid: set rows & columns equal to num
  container.style.gridTemplate = `repeat(${num}, 1fr) / repeat(${num}, 1fr)`;
  listenCells();
}

const listenResetButton = function () {
  const button = document.getElementById(`reset-btn`);
  button.addEventListener(`click`, () => {
    createGrid();
  });
}

createGrid(16);
listenResetButton();