`use strict`;

const askGrid = function () {
  let num = prompt(`How many squares per side? (max. 100 or it will hang)`);

  if (isNaN(num)) {
    alert(`Only numbers please.`);
    return askGrid();
  } else if (num > 100) {
    alert(`100 is maximum because it's hard for Browser to render so much squares at once. Don't make it sad.`);
    return 100;
  } else if (num === null || num === '') {
    return `canceled`;
  }

  return Math.round(num);
}

const gradeColor = function (cell) {
  // Gives e.g. `rgb(255, 255, 255)`
  let splitRGB = cell.style.backgroundColor.split(/\W/);

  // Darken by ~25%
  let mod = Math.round(255 * 0.25);
  let r = splitRGB[1] - mod;
  let g = splitRGB[3] - mod;
  let b = splitRGB[5] - mod;

  cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

const listenCells = function () {
  let cells = document.querySelectorAll(`.cell`);
  cells.forEach(item => {
    item.addEventListener(`mouseover`, () => gradeColor(item))
  });
}

const blink = function () {
  let container = document.querySelector(`.grid-container`);

  setTimeout(() => {
    container.classList.toggle(`blink-black`);
  }, 300);

  container.classList.toggle(`blink-black`);
}

const createGrid = function (num) {
  const container = document.querySelector(`.grid-container`);

  // Prompt if function was called without an argument
  if (!num) {
    num = askGrid();
    if (num === `canceled`) return;
    blink();
  }

  // Reset grid
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  for (let i = 1; i <= num * num; i++) {
    const cell = document.createElement(`div`);
    cell.classList.add(`cell`, `cell-${i}`);
    cell.style.backgroundColor = `rgb(255, 255, 255)`;
    container.appendChild(cell);
  }

  // Edit css grid: set rows/columns equal to num
  container.style.gridTemplate = `repeat(${num}, 1fr) / repeat(${num}, 1fr)`;

  listenCells();
}

const button = document.querySelector(`.reset-btn`);
button.addEventListener(`click`, () => {
  createGrid();
});

createGrid(64);