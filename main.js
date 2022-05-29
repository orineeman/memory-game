let cardsArray = [
  "&#128525;",
  "&#128525;",
  "&#128561;",
  "&#128561;",
  "&#128564;",
  "&#128564;",
  "&#128520;",
  "&#128520;",
  "&#128545;",
  "&#128545;",
  "&#129313;",
  "&#129313;",
];

// const randomisedArray = cardsArray.sort(() => Math.floor() - 0.5);
// console.log(randomisedArray);
const inners = document.querySelectorAll(".inner");
const stopSfira = document.querySelector(".stop-sfira");
const timeDiv = document.querySelector(".time");
const pScore = document.querySelector(".p-score");
let score = 0;
let result = [];
let arrItems = [];
let timeGame = 60;
let play = true;
let num = 0;

// var cardsArray = [40, 100, 1, 5, 25, 10];

for (i = cardsArray.length - 1; i > 0; i--) {
  j = Math.floor(Math.random() * i);
  k = cardsArray[i];
  cardsArray[i] = cardsArray[j];
  cardsArray[j] = k;
}

startSfira();

function startSfira() {
  let interval = setInterval(function sfiraLeahor() {
    if (timeGame > 0) {
      timeDiv.textContent = timeGame - 1;
      timeGame--;
      stopSfira.onclick = () => stopsfira(interval);
    } else {
      alert("game over");
      timeGame = 60;
      location.reload();
    }
  }, 1000);
}

function stopsfira(interval) {
  if (play) {
    clearInterval(interval);
    stopSfira.textContent = "play";
  } else {
    timeGame = timeDiv.textContent;
    startSfira(timeGame);
    stopSfira.textContent = "pause";
  }
  play = !play;
}

function hilukHaklafim() {
  let indexCardsArray = 0;
  console.log(cardsArray);
  for (let item of inners) {
    item.lastElementChild.innerHTML = cardsArray[indexCardsArray];
    indexCardsArray++;
  }
}
hilukHaklafim();

for (let item of inners) {
  item.onclick = function () {
    item.classList.toggle("flipped");
    // let indexArrItems = getRandomInt(0, cardsArray.length);
    // item.lastElementChild.innerHTML = cardsArray[indexArrItems];
    result.unshift(item.lastElementChild.innerHTML);
    arrItems.push(item);
    if (num !== 0) {
      if (result[0] === result[1]) {
        arrItems[0].onclick = function () {
          return false;
        };
        arrItems[1].onclick = function () {
          return false;
        };
        arrItems[0].lastElementChild.classList.add("foundCard");
        arrItems[1].lastElementChild.classList.add("foundCard");
        result.length = 0;
        arrItems.length = 0;
        let hakodem = item.lastElementChild.innerHTML;
        cardsArray.splice(cardsArray.indexOf(hakodem), 1);
        cardsArray.splice(cardsArray.indexOf(hakodem), 1);
        score += 16;
        pScore.textContent = score;

        if (cardsArray.length === 0) {
          pScore.textContent = 100;
          setTimeout(function () {
            alert("Well done!");
            location.reload();
          }, 700);
        }
      } else if (result.length === 2 && arrItems.length === 2) {
        const card1 = arrItems[0];
        const card2 = arrItems[1];

        setTimeout(function () {
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
        }, 500);

        num = 0;
        result = [];
        arrItems = [];
      }
    }
    num++;
  };
}

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min) + min);
// }
