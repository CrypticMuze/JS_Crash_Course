function reset(){
    location.reload();
}

// JS for Challange 1 : Your Age in Days
function ageInDays() {
    let birthYear = prompt("What year were you born?");
    let ageInDays = (2021 - birthYear) * 365;
    let resultDiv = document.createElement('div');
    if(ageInDays<0){
    alert('You are not born yet time traveller')}
    let textAnswer = document.createTextNode('You are '+ageInDays+' day old.');
    resultDiv.setAttribute('id', 'ageInDays');
    if(ageInDays>0){resultDiv.appendChild(textAnswer);}
    document.getElementById('first-result').appendChild(resultDiv);
}

function resetDays() {
    document.getElementById('first-result').querySelectorAll('div')[0].remove();
}

// JS for Challange 2 : Cat Generator
function generateCats(){
    let img = document.createElement('img');
    img.src = 'https://api.thecatapi.com/api/images/get?type=gif';
    img.setAttribute('class', 'cat');
    document.getElementById('cat-container').appendChild(img);
}

function resetCats() {
    let cats = document.querySelector('#cat-container').querySelectorAll('img');
    for(let i=0; i<cats.length; i++){
        cats[i].remove();
    }

}

// JS for Challange 3 : Rock Paper Scissors  
const preset ='<img id="rock" class="select" onclick="rpsGame(this)" src="img/rock.png" alt="Rock"><img id="paper" class="select" onclick="rpsGame(this)" src="img/paper.png" alt="paper"><img id="scissors" class="select" onclick="rpsGame(this)" src="img/scissors.png" alt="scissors">';
  
function rpsGame(yourChoice) {
    let humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    result= decideWinner(humanChoice,botChoice);
    message = finalMessage(result);
    rpsFrontEnd(message, humanChoice, botChoice);
}

function randToRpsInt(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number){
    return['rock', 'paper', 'scissors'][number];
}

function decideWinner(humanChoice,botChoice){
    const rpsDatabase= {
        'rock':{'scissors':1, 'rock': 0.5, 'paper': 0},
        'paper':{'rock':1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper':1, 'scissors': 0.5, 'rock': 0}
    }
    let  yourScore = rpsDatabase[humanChoice][botChoice];
    let  computerScore = rpsDatabase[botChoice][humanChoice];
    return[yourScore, computerScore];
}

function finalMessage([humanScore,computerScore]){
    if(humanScore === 0.5){
        return {message: 'You Tied!', myColor: 'yellow', botColor: 'yellow'};
    } else if(humanScore === 0) {
        return {message: 'You Lost!', myColor: 'red', botColor: 'green'};
    } else {
        return {message: 'You Won!', myColor: 'green', botColor: 'red'};
    }
}

function rpsFrontEnd(message, humanChoice, botChoice) {
      const imageDatabase = {
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    humanImg  = document.createElement('img');
    botImg  = document.createElement('img');
    messageDiv = document.createElement('div');
    resetButton = document.createElement('button');

    humanImg.src = imageDatabase[humanChoice];
    botImg.src = imageDatabase[botChoice];
    messageDiv.innerHTML = message.message;

    humanImg.style.boxShadow =  "10px 10px 30px "+ message.myColor;
    botImg.style.boxShadow =  "10px 10px 30px " + message.botColor;
    messageDiv.style.color = message.myColor;
    messageDiv.setAttribute('id','message-div')

    resetButton.innerHTML = "Try Again!";
    resetButton.addEventListener('click', makePreset);
    
    resetButton.setAttribute('class', 'btn btn-red');
    
    document.getElementById('rps-container').appendChild(humanImg);
    document.getElementById('rps-container').appendChild(messageDiv);
    document.getElementById('rps-container').appendChild(botImg);
    document.getElementById('message-div').appendChild(resetButton);
}

function  makePreset(){
    document.querySelector('#rps-container').innerHTML = preset;
}

// JS for Challange 4 : Change the Color of All Buttons
let allButtons = document.getElementsByTagName('button');
let copyAllButtons = [];
for(let i=0; i<allButtons.length; i++){
    copyAllButtons.push(allButtons[i].classList[1]);
} 

function buttonColorChange(selection){
    if(selection.value === 'red'){
        colorTheButtons('btn-red');
    } else if(selection.value === 'green'){
        colorTheButtons('btn-green');
    } else if(selection.value === 'yellow'){
        colorTheButtons('btn-yellow');
    } else if(selection.value === 'blue'){
        colorTheButtons('btn-blue');
    } else if(selection.value === 'random'){
        randomColors();
    } else if(selection.value === 'reset'){
        resetColors();
    }
}

function colorTheButtons(color){
    for(let i=0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(color);
    } 
}

function resetColors() {
    for(let i=0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);
    } 
}

function randomColors(){
    const colors = ['btn-blue', 'btn-red', 'btn-green', 'btn-yellow'];
    for(let i=0; i < allButtons.length; i++){
        let randomNumber = Math.floor(Math.random() * 4);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(colors[randomNumber]);
    } 
}

// JS for Challange 5: BlackJack

let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-score', 'div': '#yourTable', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-score', 'div': '#dealerTable', 'score': 0},
    'cards': [
        ['2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS','AS'],
        ['2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC','AC'],
        ['2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KD','AD'],
        ['2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH','AH']
    ],
    'sounds': {
        'hit': new Audio('sounds/swish.m4a'),
        'win': new Audio('sounds/cash.mp3'),
        'lose': new Audio('sounds/aww.mp3')
    },
    'wins':0,
    'draws':0,
    'losses':0,
    'isStand': false,
    'turnsOver': false
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const cards = blackjackGame['cards'];
const sounds =  blackjackGame['sounds'];

document.querySelector('#blackjack-hit').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand').addEventListener('click', blackjackStand);
document.querySelector('#blackjack-deal').addEventListener('click', blackjackDeal);

function randomCard() {
    return cards[Math.floor(Math.random()*4)][Math.floor(Math.random()*13)];
}

function showCard(activePlayer, card){  
    if(activePlayer['score'] <= 21){
        sounds['hit'].play();
        let cardImg = document.createElement('img');
        cardImg.src = `img/Cards/${card}.jpg`;
        document.querySelector(activePlayer['div']).appendChild(cardImg);     
    }
}

function blackjackHit() {
    if(blackjackGame['isStand'] === false) {
        let card = randomCard();
        showCard(YOU, card);
        updateScore(getScore(card, YOU), YOU);
        showScore(YOU);        
    }
}

function blackjackDeal() {
    if(blackjackGame['turnsOver'] === true){

        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector('#yourTable').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealerTable').querySelectorAll('img');

        for(let i=0; i<yourImages.length; i++) {
            yourImages[i].remove();
        }
        for(let i=0; i<dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        document.querySelector(YOU['scoreSpan']).textContent = '0';
        document.querySelector(DEALER['scoreSpan']).textContent = '0';   
        document.querySelector('#title-message').textContent = "Let's play";   

        document.querySelector(YOU['scoreSpan']).style.color = "white";
        document.querySelector(DEALER['scoreSpan']).style.color = "white";
        document.querySelector('#title-message').style.color = "black";

        YOU['score'] = DEALER['score'] = 0;

        blackjackGame['turnsOver'] = false;
    }
}

function getScore(card, activePlayer){
    score = card.charAt(0);
    if(score == 'A'){
        if(activePlayer['score']+11<=21){
            return 11;
        } else {
            return 1;
        }
    } else if(score >= '2' && score <='9'){
        return parseInt(score, 10);  
    } else {
        return 10;
    }
}

function updateScore(score, activePlayer){
    activePlayer['score'] += score;
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST!";
        document.querySelector(activePlayer['scoreSpan']).style.color = "red";
        
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function blackjackStand() {
    if(blackjackGame['turnsOver'] === false && YOU['score']!=0 && blackjackGame['isStand'] === false){
        blackjackGame['isStand'] = true;

        while(dealerLogic()){
            let card = randomCard();
            showCard(DEALER, card);
            updateScore(getScore(card, DEALER), DEALER);
            showScore(DEALER);  
            await sleep(700);      
        }

        blackjackGame['turnsOver'] = true;
        let winner = computeWinner();
        showResult(winner);    
    }
}

function dealerLogic() {
    if(DEALER['score'] > 21) { return false;}
    else if(DEALER['score'] <= 11) {return true;}
    else if(YOU['score'] > 21) {return false;}
    else if(DEALER['score'] > YOU['score']) {return false;}
    else if(DEALER['score'] == YOU['score']) {return false}
    else if(DEALER['score'] < YOU['score']) {return true}
    else {return true;}
}

function computeWinner(){
    let winner;

    if(YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            winner = YOU;
            blackjackGame['wins']++;
        } else if(YOU['score'] < DEALER['score']){
            winner = DEALER;
            blackjackGame['losses']++;
        } else if(YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
        }
    } else if(YOU['score'] > 21 && DEALER['score'] <= 21) {
        winner = DEALER;
        blackjackGame['losses']++;
    } else if(YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if(blackjackGame['turnsOver'] === true){
        if(winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            sounds['win'].play();
        } else if(winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            sounds['lose'].play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'black';
        }
        document.querySelector('#title-message').textContent = message;
        document.querySelector('#title-message').style.color = messageColor;
    }
}