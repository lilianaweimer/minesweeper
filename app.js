document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let width = 10;
  let ghostAmount = 20;
  let pumpkins = 0;
  let squares = [];
  let isGameOver = false;


  //create board
  const createBoard = () => {
    //get shuffled game array with random ghosts
    const ghostArray = Array(ghostAmount).fill('ghost');
    const emptyArray = Array((width * width) - ghostAmount).fill('safe');
    const gameArray = emptyArray.concat(ghostArray);
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      square.setAttribute('id', i);
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);

      //normal click
      square.addEventListener('click', (e) => {
        click(square)
      });

      //right or control click
      square.oncontextmenu = (e) => {
        e.preventDefault();
        addPumpkin(square);
      };
    };

    //add numbers to squares indicating nearby ghosts
    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      const isLeftEdge = (i % width === 0);
      const isRightEdge = (i % width === width - 1);

      if (squares[i].classList.contains('safe')) {
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('ghost')) total++;
        if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('ghost')) total++;
        if (i > 10 && squares[i - width].classList.contains('ghost')) total++;
        if (i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('ghost')) total++;
        if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('ghost')) total++;
        if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('ghost')) total++;
        if (i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('ghost')) total++;
        if (i < 89 && squares[i + width].classList.contains('ghost')) total++;
        squares[i].setAttribute('data', total);
      }
    }    
  };

  createBoard();

  //add pumpkin with the right click
  const addPumpkin = (square) => {
    if (isGameOver) return;
    if (!square.classList.contains('checked') && (pumpkins < ghostAmount)) {
      if (!square.classList.contains('pumpkin')) {
        square.classList.add('pumpkin');
        square.innerHTML = '🎃';
        pumpkins++;
        checkForWin();
      } else {
        square.classList.remove('pumpkin');
        square.innerHTML = '';
        pumpkins--;
      }
    }
  };

  //click on square actions
  const click = (square) => {
    let currentId = square.id;
    if (isGameOver) return;
    if (square.classList.contains('checked') || square.classList.contains('pumpkin')) return;
    if (square.classList.contains('ghost')) {
      gameOver(square)
    } else {
      let total = square.getAttribute('data');
      if (Number(total) !== 0) {
        square.classList.add('checked');
        square.innerHTML = total;
        return;
      }
      checkSquare(square, currentId)
    }
    square.classList.add('checked');
  };

  //check neighbouring squares once a square is clicked
  const checkSquare = (square, currentId) => {
    const isLeftEdge = (currentId % width === 0);
    const isRightEdge = (currentId % width === width - 1);

    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = squares[Number(currentId) - 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 9 && !isRightEdge) {
        const newId = squares[Number(currentId) + 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 10) {
        const newId = squares[Number(currentId) - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 11 && !isLeftEdge) {
        const newId = squares[Number(currentId) - 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 98 && !isRightEdge) {
        const newId = squares[Number(currentId) + 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 90 && !isLeftEdge) {
        const newId = squares[Number(currentId) - 1 + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 88 && !isRightEdge) {
        const newId = squares[Number(currentId) + 1 + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 89) {
        const newId = squares[Number(currentId) + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }


    }, 10);
  };

  //game over!
  const gameOver = (square) => {
    isGameOver = true;

    //reveal all ghosts
    squares.forEach(square => {
      if (square.classList.contains('ghost')) {
        square.innerHTML = '👻';
      }
    })
  };

  //check for wins
  const checkForWin = () => {
    let matches = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].classList.contains('pumpkin') && squares[i].classList.contains('ghost')) {
        matches++;
      }
      if (matches === ghostAmount) {
        console.log('winner!!');
        isGameOver = true;
      }
    }
  }

});