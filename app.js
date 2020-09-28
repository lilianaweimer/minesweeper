document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let width = 10;
  let ghostAmount = 20;
  let squares = [];


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
      })
    }

    //add numbers to squares indicating nearby ghosts
    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      const isLeftEdge = (i % width === 0);
      const isRightEdge = (i % width === width - 1);

      if (squares[i].classList.contains('safe')) {
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('ghost')) total++;
        if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('ghost')) total++;
        if (i > 10 && squares[i -width].classList.contains('ghost')) total++;
        if (i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('ghost')) total++;
        if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('ghost')) total++;
        if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('ghost')) total++;
        if (i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('ghost')) total++;
        if (i < 89 && squares[i +width].classList.contains('ghost')) total++;
        squares[i].setAttribute('data', total);
      }
    }    
  }

  createBoard();

  //click on square actions
  const click = (square) => {
    if (square.classList.contains('ghost')) {
      alert('Game over!')
    }
  }


});