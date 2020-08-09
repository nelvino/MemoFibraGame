let clickedCard = null;
let preventClick = false;
let combosFound = 0;
let clickCount = 0;
let finalTime = 0;

//TIMER CODE
const startTime = Date.now();
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const timerCount = document.getElementById('timer');

function stopTimer() {
    clearInterval(timer);
}

function pad(n){
  return ('00' + n).slice(-2);
}

let timer = setInterval(function(){
  const currentTime = Date.now();
  const difference = currentTime - startTime;

  let hours = pad((difference / hour) | 0);
  let minutes = pad(((difference % hour) / minute) | 0);
  let seconds = pad(((difference % minute) / second) | 0);

  finalTime = timerCount.innerHTML = 'TIME: ' + hours + ':' + minutes + ':' + seconds;
}, 250);

//GAME CODE

function winGame(){
    if (combosFound === pictures.length) {
        alert("YOU WON!! IT ONLY TOOK YOU " + clickCount + " CLICKS AND " + finalTime + " TIME TO WIN THIS GAME :)");
        location.reload();
    }
}

const pictures = [
    'pic1',
    'pic2',
    'pic3',
    'pic4',
    'pic5',
    'pic6'
]

const randomCards = [...document.querySelectorAll('.card')];
    for (let picture of pictures) {
        const cardAIndex = parseInt(Math.random() * randomCards.length);
        const cardA = randomCards[cardAIndex];
        randomCards.splice(cardAIndex, 1);
        cardA.classList += ` ${picture}`;
        cardA.setAttribute('data-color', picture);

        const cardBIndex = parseInt(Math.random() * randomCards.length);
        const cardB = randomCards[cardBIndex];
        randomCards.splice(cardBIndex, 1);
        cardB.classList += ` ${picture}`;
        cardB.setAttribute('data-color', picture);
    }

function onCardClicked(e) {
    const target = e.currentTarget;
    clickCount++;
    document.getElementById("clickCountP").innerHTML = ("CLICKS: " + clickCount);

    if (preventClick || target === clickedCard || target.className.includes('done')) {
        return;
    }

    target.className = target.className.replace('picture-hidden', '').trim();
    target.className += ' done';

    if (!clickedCard) {
        clickedCard = target;
    } else if (clickedCard) {
        if (clickedCard.getAttribute('data-color') !== target.getAttribute('data-color')) {
                preventClick = true;
                setTimeout(() => {
                    clickedCard.className = clickedCard.className.replace('done', '').trim() + ' picture-hidden';
                    target.className = target.className.replace('done', '').trim() + ' picture-hidden';
                    clickedCard = null;               
                }, 500);
                preventClick = false;
            } else {
                combosFound++;
                clickedCard = null;  
                winGame();
            }
    }
}
