/***********************************************************************************/

import { dictionary, targetWords } from "./data.js";

/***********************************************************************************/

let gameOn = false;

/***********************************************************************************/

// Local Storage

const starStorageCounters = () => {
    if(localStorage.getItem('wordsPlayed') == null) {
        localStorage.setItem('wordsPlayed', "0");
    }
    if(localStorage.getItem('wordsCorrect') == null) {
        localStorage.setItem('wordsCorrect', "0");
    }
}
const getWordsPlayed = () => parseInt(localStorage.getItem('wordsPlayed'));
const updateWordsPlayed = () => {
    const n = getWordsPlayed() + 1;
    localStorage.setItem('wordsPlayed', n)
}
const getWordsCorrect = () => parseInt(localStorage.getItem('wordsCorrect'));
const updateWordsCorrect = () => {
    const n = getWordsCorrect() + 1;
    localStorage.setItem('wordsCorrect', n)
}
const verifyFirstAccess = () => {
    if(getWordsPlayed() == 0) {
        modalAbout();
    }
}

/***********************************************************************************/
// Word & Translation

// TARGET WORD
const word = [];
let fullWord;
const getTargetWord = () => {
    const randomNum = Math.floor(Math.random() * targetWords.length);
    for(let i = 0; i < 5; i++){
        word[i] = targetWords[randomNum][i].toUpperCase();
    }
    if(word) {
        gameOn = true;
        targetWords.splice(randomNum, 1);
    }
    fullWord = word.join('');
    console.log(word);
}

// LINK
const getTranslationLink = () => `https://translate.google.com.br/?hl=pt-BR&sl=en&tl=pt&text=${fullWord.toLowerCase()}&op=translate`;

/***********************************************************************************/
// SELECTION Line & Letter

// LINE
const getActiveLine = () => {
    let lines = document.querySelectorAll('.line');
    for(let line of lines) {
        if(line.classList.contains('selected')) {
            return line;
        }
    }
    return null;
}
const getActiveLineArray = () => {
    let lines = document.querySelectorAll('.line');
    for(let line of lines) {
        if(line.classList.contains('selected')) {
            return line.children;
        }
    }
    return null;
}
const lineSelectionFree = () => {
    document.querySelectorAll('.line').forEach(line => {
        line.classList.remove('selected');
    })
}
const selectNextLine = () => {
    getActiveLine().classList.remove('selected');
    document.querySelector(`#line${attemptCounter + 1}`).classList.add('selected');
    getActiveLine().classList.remove('hidden');
    const lineSelected = getActiveLineArray();
    lineSelected[0].classList.add('selected');
}
const shakeLine = () => {
    getActiveLine().classList.add('shake');
    setTimeout(() => {
        getActiveLine().classList.remove('shake');
    }, 301);
}

// LETTER
const getActiveLetter = () => {
    const lineSelected = getActiveLineArray();
    for(let letter of lineSelected){
        if(letter.classList.contains('selected')) {
            return letter;
        }
    }
    return null;
}
const letterSelectionFree = () => {
    const lineSelected = getActiveLineArray();;
    for(let letter of lineSelected){
        letter.classList.remove('selected')
    }
}
const selectNextEmptyLetter = () => {
    let change = false;
    const lineSelected = getActiveLineArray();;
    for(let i = 0; i < lineSelected.length; i++){
        if(lineSelected[i].classList.contains('selected')) {
            for(let j = i + 1; j < lineSelected.length; j++){
                if(lineSelected[j].innerHTML.length == 0) {
                    lineSelected[i].classList.remove("selected");
                    lineSelected[j].classList.add("selected");
                    j = lineSelected.length;
                    i = lineSelected.length;
                    change = true;
                }
            }
        } 
    }
    if(!change) {
        let letterSelected = getActiveLetter();
        for(let i = 0; i < lineSelected.length; i++){
            if(lineSelected[i].innerHTML.length == 0) {
                letterSelected.classList.remove("selected");
                lineSelected[i].classList.add("selected");
                i = lineSelected.length;
            }
        }
    }
}
const selectNextLetter = () => {
    const lineSelected = getActiveLineArray();;
    for(let i = 0; i < lineSelected.length; i++){
        if(lineSelected[i].classList.contains('selected')) {
            if(i < lineSelected.length - 1){
                lineSelected[i].classList.remove("selected");
                lineSelected[i + 1].classList.add("selected");
            } 
            i = lineSelected.length;
        }
    }
}
const selectPreviousLetter = () => {
    const lineSelected = getActiveLineArray();;
    for(let i = 0; i < lineSelected.length; i++){
        if(lineSelected[i].classList.contains('selected')) {
            if(i > 0){
                lineSelected[i].classList.remove("selected");
                lineSelected[i - 1].classList.add("selected");
            } 
            i = lineSelected.length;
        }
    }
}

/***********************************************************************************/
// Get Filled Letters Counter

const filledLetterCounter = () => {
    const lineSelected = getActiveLineArray();
    let cont = 0;
    for(let letter of lineSelected){
        if(letter.innerHTML.length > 0) {
            cont++;
        }
    }
    return cont;
}

/***********************************************************************************/
// ADD & DELETE Letter

const addLetter = (letter) => {
    const letterSelected = getActiveLetter();
    if(letterSelected) {
        letterSelected.innerHTML = letter.toUpperCase();
    }
    if(filledLetterCounter() == 5) {
        letterSelectionFree();
    } else {
        selectNextEmptyLetter();
    }
}
const deleteLetter = () => {
    let letterSelected = getActiveLetter();
    if(letterSelected) {
        if(letterSelected.innerHTML.length > 0) {
            letterSelected.innerHTML = '';
        } else {
            selectPreviousLetter();
            letterSelected = getActiveLetter();
            letterSelected.innerHTML = '';
        }
    } else {
        const lineSelected = getActiveLineArray();
        lineSelected[4].classList.add('selected');
        deleteLetter();
    }
}

/***********************************************************************************/
// Submit Word Attempt

let attemptCounter = 0;

const colorVerification = () => {
    const lineArray = getActiveLineArray();
    const attemptWord = getCurrentWordArray();
    for(let i = 0; i < 5; i++) {
        if(attemptWord[i] == word[i]) {
            lineArray[i].classList.add('green');
            document.querySelector(`#kbd_${attemptWord[i].toLowerCase()}`).classList.add('green');
        } else if(word.includes(attemptWord[i])) {
            lineArray[i].classList.add('yellow');
            document.querySelector(`#kbd_${attemptWord[i].toLowerCase()}`).classList.add('yellow');
        } else {
            lineArray[i].classList.add('black');
            document.querySelector(`#kbd_${attemptWord[i].toLowerCase()}`).classList.add('black');
        }
    }
}
const validWordAttempt = (attempt) => {
    return dictionary.includes(attempt);
}
const checkWin = (attempt) => {
    let win = true;
    for(let i = 0; i < 5; i++) {
        if(attempt[i] != word[i]) {
            win = false;
        }
    }
    return win;
}
const getCurrentWordArray = () => {
    let lineSelected = getActiveLineArray();
    const currentWord = [];
    for(let i = 0; i < lineSelected.length; i++){
        currentWord[i] = lineSelected[i].innerHTML;
    }
    return currentWord;
}
const submitWordAttempt = () => {
    const attempt = getCurrentWordArray();
    const attemptWord = attempt.join('').toLowerCase();
    if(filledLetterCounter() == 5){
        if(validWordAttempt(attemptWord)) {
            letterSelectionFree();
            colorVerification();
            attemptCounter++;
            if(checkWin(attempt)) {
                lineSelectionFree();
                gameOn = false;
                updateWordsPlayed();
                updateWordsCorrect();
                modalWin();
            } else {
                if(attemptCounter < 6){
                    selectNextLine();
                } else {
                    gameOn = false;
                    updateWordsPlayed();
                    modalLose();
                }
            } 
        } else {
            shakeLine();
        }
    } else {
        shakeLine();
    }
}

/***********************************************************************************/
// SELECT Letters on Board Game - Click

const selectLetter = (e) => {
    const lineSelected = getActiveLine();
    if(e.target.parentNode == lineSelected) {
        letterSelectionFree();
        e.target.classList.add("selected");
    }
}

/***********************************************************************************/
// Handle Keyboard 

const handleKeydown = (e) => {
    if(gameOn) {
        if(e.key == "a" || e.key == "b" || e.key == "c" || e.key == "d" || e.key == "e" || e.key == "f" 
        || e.key == "g" || e.key == "h" || e.key == "i" || e.key == "j" || e.key == "k" || e.key == "l" 
        || e.key == "m" || e.key == "n" || e.key == "o" || e.key == "p" || e.key == "q" || e.key == "r" 
        || e.key == "s" || e.key == "t" || e.key == "u" || e.key == "v" || e.key == "w" || e.key == "x" 
        || e.key == "y" || e.key == "z" || e.key == "A" || e.key == "B" || e.key == "C" || e.key == "D" 
        || e.key == "E" || e.key == "F" || e.key == "G" || e.key == "H" || e.key == "I" || e.key == "J" 
        || e.key == "K" || e.key == "L" || e.key == "M" || e.key == "N" || e.key == "O" || e.key == "P" 
        || e.key == "Q" || e.key == "R" || e.key == "S" || e.key == "T" || e.key == "U" || e.key == "V" 
        || e.key == "W" || e.key == "X" || e.key == "Y" || e.key == "Z") {
            addLetter(e.key);
        }
        if(e.key == "Backspace" || e.key == "Delete") {
            deleteLetter();
        }
        if(e.key == "Enter") {
            submitWordAttempt();
        }
        if(e.key == "ArrowLeft") {
            const letterSelected = getActiveLetter();
            if(letterSelected) {
                selectPreviousLetter();
            } else {
                const lineSelected = getActiveLineArray();
                lineSelected[4].classList.add("selected");
            }
        }
        if(e.key == "ArrowRight") {
            const letterSelected = getActiveLetter();
            if(letterSelected) {
                selectNextLetter();
            } else {
                const lineSelected = getActiveLineArray();
                lineSelected[0].classList.add("selected");
            }
        }
    }
}

/***********************************************************************************/
// MODALS

const modalWin = () => {
    setTimeout(() => {
        document.querySelector('.modal').classList.toggle('active');
        document.querySelector('.modalContainer').classList.toggle('modalWin')
        document.querySelector('.modalContainer').classList.toggle('active')
        document.querySelector('.modalContent').innerHTML = `
            <span class="mainMessage">
                <i class='bx bxs-check-circle'></i>
                <span>Você acertou!</span>
                <span>
                    A palavra era <strong>${fullWord}</strong>
                </span>
            </span>
            <div class="options">
                <span class="translate">
                    <a target="_blank" href="${getTranslationLink()}">
                        <i class='bx bx-link-external'></i>
                        Tradução
                    </a>
                </span>
                <button class="playAgain" type="button" id="btnPlayAgain" onclick="document.location.reload()">
                    <i class='bx bx-refresh'></i>
                    Jogar Novamente
                </button>
            </div>
        `;
    }, 700);    
}
const modalLose = () => {
    setTimeout(() => {
        document.querySelector('.modal').classList.toggle('active');
        document.querySelector('.modalContainer').classList.toggle('modalLose')
        document.querySelector('.modalContainer').classList.toggle('active')
        document.querySelector('.modalContent').innerHTML = `
            <span class="mainMessage">
                <i class='bx bxs-error-circle' ></i>
                <span>Acabaram as tentativas.</span>
                <span>
                    A palavra era <strong>${fullWord}</strong>
                </span>
            </span>
            
            <div class="options">
                <span class="translate">
                    <a target="_blank" href="${getTranslationLink()}">
                        <i class='bx bx-link-external'></i>
                        Tradução
                    </a>
                </span>
                <button class="playAgain" type="button" id="btnPlayAgain" onclick="document.location.reload()">
                    <i class='bx bx-refresh'></i>
                    Jogar Novamente
                </button>
            </div>
        `;
    }, 700);    
}
const modalAbout = () => {
    document.querySelector('.modal').classList.toggle('active');
    document.querySelector('.modalContainer').classList.toggle('active')
    document.querySelector('.modalContainer').classList.toggle('modalAbout')
    document.querySelector('.modalContent').innerHTML = `
        <span>
            O objetivo é adivinhar uma palavra de 5 letras, em 6 tentativas.<br>
            A cada tentativa, as letras receberão uma cor. <span class="markG">Verde</span> indica que está na posição correta. 
            <span class="markY">Amarela</span> indica que a letra está na palavra, porém em outra posição. <br> 
            <span class="markB">Preta</span> indica que a letra não faz parte da palavra. <br>
            <img src="images/example.png"> <br>
            As palavras são em inglês, e ao final você pode jogar novamente e ver a tradução da palavra. 
            MyWordle é inspirado pelos jogos <a target="_blank" href="https://term.ooo/">Termo</a> e 
            <a target="_blank" href="https://www.nytimes.com/games/wordle/index.html">Wordle</a>, porém em uma versão
            ilimitada. 
        </span>
    `;
}
const modalStats = () => {
    const winPercent = getWordsPlayed() > 0 ? parseInt((getWordsCorrect() * 100) / getWordsPlayed()) : 0;
    document.querySelector('.modal').classList.toggle('active');
    document.querySelector('.modalContainer').classList.toggle('modalStats')
    document.querySelector('.modalContainer').classList.toggle('active')
    document.querySelector('.modalContent').innerHTML = `
        <div class="statsNb">
            <span class="statsSquare">
                ${getWordsPlayed()} <span class="sub">jogos</span>
            </span>
            <span class="statsSquare">
                ${getWordsCorrect()} <span class="sub">vitórias</span>
            </span>
        </div>
        <div class="barWinPercent">
            <div class="barWordsPlayed">
                <div class="barWordsCorrect" style="width: ${winPercent}%;"></div>
            </div>
            <span class="winPercent">
                ${winPercent}%
            </span>
        </div>
        <div class="options">
            <button class="playAgain" type="button" id="btnPlayAgain" onclick="document.location.reload()">
                <i class='bx bx-refresh'></i>
                Recomeçar
            </button>
        </div>
        `;
}
const modalClose = () => {
    document.querySelector('.modal').classList.remove('active');
    document.querySelector('.modalContainer').classList.remove('active')
    document.querySelector('.modalContent').innerHTML = '';
    document.querySelector('.modalContainer').classList.remove('modalWin');
    document.querySelector('.modalContainer').classList.remove('modalLose');
    document.querySelector('.modalContainer').classList.remove('modalStats');
    document.querySelector('.modalContainer').classList.remove('modalAbout');
}

/***********************************************************************************/
// EVENTS

window.onload = () => {
    getTargetWord();
    starStorageCounters();
    verifyFirstAccess();
}

// Letter on board
document.querySelectorAll('.letter').forEach(letter => {
    letter.addEventListener('click', selectLetter);
});

// Keyboard Click
document.addEventListener('keydown', handleKeydown);

// Screen Keyboard
document.querySelectorAll('.kbdButton.key').forEach(button => {
    button.addEventListener('click', () => {
        if(gameOn) {
            addLetter(button.innerHTML);
        }
    })
})
document.querySelector('#kbdEnter').addEventListener('click', () => {
    if(gameOn) {
        submitWordAttempt();
    }
})
document.querySelector('#kbdBack').addEventListener('click', () => {
    if(gameOn) {
        deleteLetter();
    }
})

// Modals
document.querySelector('#closeModalX').addEventListener('click', modalClose);
document.querySelector('.modal').addEventListener('click', (e) => {
    if(e.target == document.querySelector('.modal')) {
        modalClose() 
    }
});
document.querySelector("#aboutIcon").addEventListener("click", modalAbout);
document.querySelector("#statsIcon").addEventListener("click", modalStats);

/***********************************************************************************/