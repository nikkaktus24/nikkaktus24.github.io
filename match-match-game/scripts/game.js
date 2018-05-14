const gameArea = document.querySelector("#gameArea");
const stage1 = document.querySelector("#stage1");
const stage2 = document.querySelector("#stage2");
const stage3 = document.querySelector("#stage3");
const stage4 = document.querySelector("#stage4");
const stage5 = document.querySelector("#stage5");
const regButton = document.querySelector("#regButton");
const regWrapper = document.querySelector("#regWrapper");
const newGameButton = document.querySelector("#newGameButton");
const newSkirtButton = document.querySelector("#newSkirtButton");
const newDiffButton = document.querySelector("#newDiffButton");
const scoreButton = document.querySelector("#lookScore");
const scoreCloseButton = document.querySelector("#scoreCloseButton");
const scoreBoard = document.querySelector("#scoreBoard");
const timer = document.querySelector("#timer");
const inputs = document.querySelectorAll("input");

let cards; // cards query
let backCards; // cards back
let regFlag = false; // flag for nav-bar buttons
let openCardArray = []; // array for open cards
let flagOpen = false; // flag for open cards
let matchPairs = 0; // count of matched pairs
let minute = 0; // interval's minutes
let second = 0; // interval's second
let timerId; // id of setInterval
let scoreArray = localStorage.getItem("scoreArray") || [];

/* BUTTON's EVENTs */

function takeDifficulty(event) {
  if(event.target.localName == "li") {
    localStorage.setItem("difficultly",event.target.id);
    if(regFlag != true) {
      stage2.classList.remove("disable");
    } else {
      regWrapper.classList.add("visibiliti");
      startNewGame();
    }
    stage1.classList.add("disable");
  }
}

function takeSkirtCard(event) {
  if(event.target.localName == "li") {
    localStorage.setItem("skirtCard",event.target.id);
    if(regFlag != true) {
      stage3.classList.remove("disable");
    } else {
      regWrapper.classList.add("visibiliti");
      setSkirt();
    }
    stage2.classList.add("disable");
  }
}

function takeProfileData() {
  if(inputs[0].value != "" && inputs[1].value != "" && inputs[2].validity.valid) {
    localStorage.setItem("firstName",inputs[0].value);
    localStorage.setItem("lastName",inputs[1].value);
    localStorage.setItem("email",inputs[2].value);
    sessionStorage.setItem("flag",true);
    regButton.removeEventListener("click",takeProfileData);
    stage3.classList.add("disable");
    regWrapper.classList.add("visibiliti");
    regFlag = !regFlag;
    startNewGame();
  }
}

function chooseSkirt(event) {
  regWrapper.classList.remove("visibiliti");
  stage2.classList.remove("disable");
}

function chooseDifficult(event) {
  regWrapper.classList.remove("visibiliti");
  stage1.classList.remove("disable");
}

function setDifficult() {
  if(setDifficult.prev) gameArea.classList.remove(setDifficult.prev);
  setDifficult.prev = getDifficult();
  gameArea.classList.add(getDifficult());
}

function setSkirt() {
  backCards.forEach(item => {
    item.classList.add(getSkirt());
    if(setSkirt.prev != getSkirt()) {
      item.classList.remove(setSkirt.prev);
    }
  })
  setSkirt.prev = getSkirt();
}

function startNewGame() {
  gameArea.innerHTML = "";
  matchPairs = 0;
  setDifficult();
  putInDOM();
  setSkirt();
  startTimer();
  refreshScoreBoard();
}

function refreshScoreBoard() {
  if(scoreArray.length > 0) {
    scoreBoard.innerHTML = `<tr>
    <th>First Name</th>
    <th>Last name</th>
    <th>email</th>
    <th>Minutes</th>
    <th>Seconds</th>
    </tr>`;

    scoreArray
      .sort((a,b) => {
        return a.time - b.time;
      })
      .forEach((item) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `<th>${item.fname}</th>
        <th>${item.lname}</th>
        <th>${item.email}</th>
        <th>${item.min}</th>
        <th>${item.sec}</th>`;
        scoreBoard.appendChild(tr);
      });
  } else {
    scoreBoard.innerHTML = `<tr><th>No there is result</th></tr>`
  }
}

function openScoreBoard() {
  stage5.classList.remove("disable");
  regWrapper.classList.remove("visibiliti");
}

function closeScoreBoard() {
  stage5.classList.add("disable");
  regWrapper.classList.add("visibiliti");
}

/* CARDS function */

function getDifficult() {
  return localStorage.getItem("difficultly");
}

function getSkirt() {
  return localStorage.getItem("skirtCard");
}

function getPairs() {
  return difficultly[getDifficult()].pairs;
}

function setCardOpen(card) {
    card.offsetParent.classList.remove("-open");
    card.parentElement.nextElementSibling.classList.add("-open");
}

function shortenArray(array) {
  let newArray = array.slice();
  while (newArray.length > difficultly[getDifficult()].pairs) {
    let randIndex = Math.floor(Math.random() * newArray.length);
    newArray.splice(randIndex, 1);
  }
  return newArray;
};

function makeCardArray (data) {
  let resultArray = []; // result array with card

  // New array with right size
  let cardArray = shortenArray(cardData);

  // Add two of each card to the array
  cardArray.forEach((item) => {
    resultArray.push(new Card(item.id));
    resultArray.push(new Card(item.id));
  });

  return resultArray;
};

function shuffleArray(array) {
    let currIndex = array.length, tempValue, randIndex;

    while (currIndex !== 0) {
        randIndex = Math.floor(Math.random() * currIndex);
        currIndex -= 1;
        tempValue = array[currIndex];
        array[currIndex] = array[randIndex];
        array[randIndex] = tempValue;
    }

    return array;
};

function putInDOM() {
  shuffleArray(makeCardArray(cardData)).forEach((item) => {
    let block = document.createElement("div");
    block.innerHTML = item.html;
    gameArea.appendChild(block);
  });
  cards = document.querySelectorAll(".card");
  backCards = document.querySelectorAll(".card-back--icon");
}

function processCard(event) {
  if(
    event.target.classList.contains("card-back--icon")
    && flagOpen == false
  ) {
    if(
      openCardArray[0] != event.target
      || openCardArray[1] != event.target
      && !event.target.classList.contains("matched")
    ) {
      openCardArray.push(event.target);
      setCardOpen(event.target);
      if(openCardArray.length == 2) compareCards();
    }
  }
}

function compareCards() {
  flagOpen = true;
  if(openCardArray[0].classList.item(1) == openCardArray[1].classList.item(1)) {
      matched();
  } else {
      setTimeout(unmatched, 600);
  }
}

function matched() {
  openCardArray.forEach(item => {
    item.parentElement.nextElementSibling.classList.add("matched"); // front card
  });
  openCardArray = [];
  flagOpen = false;
  matchPairs++;
  if(matchPairs == getPairs()) {
    getCongratulations();
  }
}

function unmatched() {
  openCardArray.forEach(item => {
    item.offsetParent.classList.add("-open"); // back card
    item.parentElement.nextElementSibling.classList.remove("-open"); // front card
  });
  openCardArray = [];
  flagOpen = false;
}

function getCongratulations() {
  clearInterval(timerId);
  scoreArray.push(new Result(getData()));
  refreshScoreBoard();
  setTimeout(() => {
    regWrapper.classList.remove("visibiliti");
    stage4.classList.remove("disable");
  },500);
  setTimeout(() => {
    regWrapper.classList.add("visibiliti");
    stage4.classList.add("disable");
  },5000);
}

function startTimer() {
    if(timerId) clearInterval(timerId);
    minute = second = 0;
    timerId = setInterval(() => {
        timer.innerHTML = "Timer: "+minute+" min  "+second+" secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
    },1000);
}

function getData() {
  return [
    localStorage.getItem("firstName"),
    localStorage.getItem("lastName"),
    localStorage.getItem("email"),
    minute,
    second
  ]
}

/* EVENT LISTENER */
gameArea.addEventListener("click", processCard);
stage1.addEventListener("click",takeDifficulty);
stage2.addEventListener("click",takeSkirtCard);
regButton.addEventListener("click",takeProfileData);
newGameButton.addEventListener("click",startNewGame);
newSkirtButton.addEventListener("click",chooseSkirt);
newDiffButton.addEventListener("click",chooseDifficult);
lookScore.addEventListener("click",openScoreBoard);
scoreCloseButton.addEventListener("click",closeScoreBoard);
