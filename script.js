"use strict"

const quotes = [
  "Practice makes perfect",
  "JavaScript is fun",
  "Typing speed improves with effort",
  "Frontend is all about creativity",
  "You are doing great"
];

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timerEl = document.getElementById("timer");
const doneBtn = document.getElementById("done");
const restartBtn = document.getElementById("restart");
const result = document.getElementById("result");
const resultWPM = document.getElementById("result-wpm");
const resultAccuracy = document.getElementById("result-accuracy");

let currentQuote = "";
let timeLeft = 60;
let timer;
let started = false;

function setNewQuote(){
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.innerText = currentQuote;
  inputEl.value = "";
}

function startTimer(){
  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = `Time: ${timeLeft}s`;
    if(timeLeft<=0){
      clearInterval(timer);
      inputEl.disabled = true;
      calculateWPM();
    }
  }, 1000);
}

function calculateWPM(){
  // /\s+/ -> \s means all whitespace characters like tab, space, etc. and + means one or more
  // trim removes whitespaces from both ends
  // /\s+/ will not remove whitespace from start or end that's why use trim()
  const wordsTyped = inputEl.value.trim().split(/\s+/).length;     
  const wpm = Math.round((wordsTyped/60)*60);  
  return wpm;
}

function calculateAccuracy(){
  // fetching current quote and user's input
  // converting them into char arrays make it easier to compare and calculate accuracy
  const quote = [...currentQuote];  
  const input = [...inputEl.value.trim()];     // trim for removing leading and trailing whitespaces

  let matchCount = 0;
  for(let i=0; i<Math.min(quote.length,input.length); i++){
    if(quote[i]===input[i])
      matchCount++;
  }

  return (matchCount/quote.length)*100;
}

inputEl.addEventListener("input",() => {
  if(!started){
    started = true;
    startTimer();
  }
});

restartBtn.addEventListener("click", () => {
  timeLeft = 60;
  timerEl.innerText = "Time: 60s";
  inputEl.disabled = false;
  started = false;
  clearInterval(timer);
  setNewQuote();

  // Hide results
  result.style.display = "none";
  resultWPM.innerText = "";
  resultAccuracy.innerText = "";
});

doneBtn.addEventListener("click", () => {
  timeLeft = 60;
  timerEl.innerText = "Time: 60s";
  started = false;
  clearInterval(timer);
  const wpm = calculateWPM();
  const accuracy = calculateAccuracy();
  inputEl.disabled = true;

  // Show the results div
  result.style.display = "block";

  // Update the results with WPM and Accuracy
  resultWPM.innerText = `WPM: ${wpm.toFixed(2)}%`;
  resultAccuracy.innerText = `Accuracy: ${accuracy.toFixed(2)}%`;  // toFixed(2) => fixed number of decimal places
});

setNewQuote();