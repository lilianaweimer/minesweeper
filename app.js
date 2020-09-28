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
    }

    //add numbers to squares indicating nearby ghosts
  for (let i = 0; )    

  }

  createBoard();


});