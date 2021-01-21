const densityBtns = Array.from(document.querySelectorAll('[name="grid"]'));
const colorBtns = Array.from(document.querySelectorAll('[name="color"]'));
const reloadBtn = document.querySelector('[name="reload"]');
const container = document.querySelector('.container');
let density = 32 * 32; // global var, default grid size
let color = 'black'; // global var, default paint color
const rainbows = ["#C2272D", "#F8931F", "#FFFF01", "#009245", "#0193D9", "#0C04ED", "#612F90"];

function erase() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function generateGrid(cssClass = 'grid-medium') {
  container.classList.remove('grid-small', 'grid-medium', 'grid-large');
  container.classList.add(cssClass);
  for (i = 0; i < density; i++) {
    const square = document.createElement('div');
    square.classList.add('square')
    container.appendChild(square);
  }
  initCanvas();
}

function initCanvas() {
  const squares = Array.from(document.querySelectorAll('.container > div'));
  squares.forEach((sq) => {
    sq.count = 0;
    sq.addEventListener('mouseover', (e) => {
      if (color === 'black') {
        e.target.style.backgroundColor = 'black';
        e.target.style.opacity = 1;
      } else if (color === 'rgb') {
        const randomColor = rainbows[Math.floor(Math.random() * rainbows.length)];
        e.target.style.backgroundColor = randomColor;
        e.target.style.opacity = 1;
      } else {
        e.target.style.backgroundColor = 'black';
        if (e.target.count < 5) {
          e.target.style.opacity = 0.2 * (++e.target.count);
        }
      }
    });
  });
}

function changeGrid() {
  densityBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.value === 'grid-small') {
        density = 16 * 16;
        //console.log(density);
        erase();
        generateGrid(btn.value);
        highlightButton(btn);
      } else if (btn.value === 'grid-medium') {
        density = 32 * 32;
        //console.log(density);
        erase();
        generateGrid(btn.value);
        highlightButton(btn);
      } else {
        density = 64 * 64;
        //console.log(density);
        erase();
        generateGrid(btn.value);
        highlightButton(btn);
      }
    });
  });
}

function changeColor() {
  colorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.value === 'black') {
        color = 'black';
        initCanvas();
        highlightButton(btn);
      } else if (btn.value === 'rgb') {
        color = 'rgb'
        initCanvas();
        highlightButton(btn);
      } else {
        color = 'gray';
        initCanvas();
        highlightButton(btn);
      }
    });
  });
}

function highlightButton(button) {
  if (button.name === 'grid') {
    densityBtns.forEach((btn) => {
      btn.classList.remove('highlight');
    });
  } else if (button.name === 'color') {
    colorBtns.forEach((btn) => {
      btn.classList.remove('highlight');
    });
  }
  button.classList.add('highlight');
}

function startGame() {
  generateGrid();
  initCanvas();
  changeGrid();
  changeColor();
}

startGame()

reloadBtn.addEventListener('click', () => {
  window.location.reload();
});
