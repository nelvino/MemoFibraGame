let clickedCard = null;
let preventClick = false;
let combosFound = 0;
let clickcount = 0;
let finalTime = 0;

//TIMER CODE
let startTime = Date.now();
let second = 1000;
let minute = second * 60;
let hour = minute * 60;
let timerCount = document.getElementById('timer');

function stopTimer() {
    clearInterval(timer);
}

function pad(n){
  return ('00' + n).slice(-2);
}

let timer = setInterval(function(){
  let currentTime = Date.now();
  let difference = currentTime - startTime;

  let hours = pad((difference / hour) | 0);
  let minutes = pad(((difference % hour) / minute) | 0);
  let seconds = pad(((difference % minute) / second) | 0);

  finalTime = timerCount.innerHTML = 'TIME: ' + hours + ':' + minutes + ':' + seconds;

// This only represents time between renders. Actual time rendered is based
// on the elapsed time calculated above.
}, 250);

//GAME CODE
const pictures = [
    'pic1',
    'pic2',
    'pic3',
    'pic4',
    'pic5',
    'pic6'
]

//ramdomize pictures at the start of the game
const cards = [...document.querySelectorAll('.card')];
for (let picture of pictures) {
const cardAIndex = parseInt(Math.random() * cards.length);
    const cardA = cards[cardAIndex];
    cards.splice(cardAIndex, 1);
    cardA.className += ` ${picture}`;
    cardA.setAttribute('data-color', picture);

    const cardBIndex = parseInt(Math.random() * cards.length);
    const cardB = cards[cardBIndex];
    cards.splice(cardBIndex, 1);
    cardB.className += ` ${picture}`;
    cardB.setAttribute('data-color', picture);
}

function onCardClicked(e) {
    const target = e.currentTarget;
    clickcount++;
    document.getElementById("p1").innerHTML = ("CLICKS: " + clickcount);

    if (preventClick || target === clickedCard || target.className.includes('done')) {
        return;
    }

    target.className = target.className.replace('picture-hidden', '').trim();
    target.className += ' done';

    console.log(target.getAttribute('data-color'));

    if (!clickedCard) {
        clickedCard = target;
    } else if (clickedCard) {
        if (clickedCard.getAttribute('data-color') !== target.getAttribute('data-color')) {
                console.log('cards are not equal');
                preventClick = true;
                setTimeout(() => {
                clickedCard.className = clickedCard.className.replace('done', '').trim() + ' picture-hidden';
                target.className = target.className.replace('done', '').trim() + ' picture-hidden';
                clickedCard = null;               
                }, 500);
                preventClick = false;
            } else {
                console.log('cards are equal!');
                combosFound++;
                clickedCard = null;  
                if (combosFound === 6) {
                    alert("FIBRA ES UN TRAPO AND TOOK " + clickcount + " CLICKS AND " + finalTime + " TIME TO WIN THIS GAME");
                    location.reload();
                }
            }
    }
}
