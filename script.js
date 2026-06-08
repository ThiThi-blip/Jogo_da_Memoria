  
  const cardsArray = [
  "Be", "Was/Were",
  "Have", "Had",
  "Do", "Did",
  "Say", "Said",
  "Go", "Went",
  "Get", "Got",
  "Make", "Made",
  "Know", "Knew",
  "Think", "Thought",
  "Take", "Took",
  "See", "Saw",
  "Come", "Came",
  "Give", "Gave",
  "Find", "Found",
  "Tell", "Told",
  "Become", "Became",
  "Show", "Shown",
  "Leave", "Left",
  "Feel", "Felt",
  "Put", "Put"
];

const pairs = {
  "Be": "Was/Were",
  "Was/Were": "Be",

  "Have": "Had",
  "Had": "Have",

  "Do": "Did",
  "Did": "Do",

  "Say": "Said",
  "Said": "Say",

  "Go": "Went",
  "Went": "Go",

  "Get": "Got",
  "Got": "Get",

  "Make": "Made",
  "Made": "Make",

  "Know": "Knew",
  "Knew": "Know",

  "Think": "Thought",
  "Thought": "Think",

  "Take": "Took",
  "Took": "Take",

  "See": "Saw",
  "Saw": "See",

  "Come": "Came",
  "Came": "Come",

  "Give": "Gave",
  "Gave": "Give",

  "Find": "Found",
  "Found": "Find",

  "Tell": "Told",
  "Told": "Tell",

  "Become": "Became",
  "Became": "Become",

  "Show": "Shown",
  "Shown": "Show",

  "Leave": "Left",
  "Left": "Leave",

  "Feel": "Felt",
  "Felt": "Feel",

  "Put": "Put",
  "Put": "Put",

 
};

let game = document.getElementById("game");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;

function shuffle(array){
  return array.sort(() => Math.random() - 0.5);
}

function createBoard(){
  game.innerHTML = "";

  shuffle(cardsArray);

  cardsArray.forEach(word => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
       <div class="front"></div>
  <div class="back">${word}</div>
    `;

    card.dataset.word = word;

    card.addEventListener("click", flipCard);

    game.appendChild(card);
  });
}

function flipCard(){
  if(lockBoard) return;
  if(this === firstCard) return;

  this.classList.add("flip");

  if(!firstCard){
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  moves++;
  document.getElementById("moves").innerText = moves;

  checkMatch();
}

function checkMatch(){

  const firstWord = firstCard.dataset.word;
  const secondWord = secondCard.dataset.word;

  const isMatch = pairs[firstWord] === secondWord;

  if(isMatch){

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matchedPairs++;

    resetBoard();

    if(matchedPairs === 20){

      setTimeout(() => {
        alert(`Boaaaa Você venceu o jogo em ${moves} movimentos!`);
        restartGame();
      }, 500);

    }

  } else {

    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 800);

  }
}

function resetBoard(){
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restartGame(){

  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchedPairs = 0;
  moves = 0;

  document.getElementById("moves").innerText = 0;

  createBoard();
}

createBoard();