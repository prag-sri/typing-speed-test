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
const wpmEl = document.getElementById("wpm");
const restartBtn = document.getElementById("restart");

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
  wpmEl.innerText = `WPM: ${wpm}`;
}

inputEl.addEventListener("input",() => {
  if(!started){
    started = true;
    startTimer();
  }
  calculateWPM();  // update WPM live
});

restartBtn.addEventListener("click", () => {
  timeLeft = 60;
  timerEl.innerText = "Time: 60s";
  wpmEl.innerText = "WPM: 0";
  inputEl.disabled = false;
  started = false;
  clearInterval(timer);
  setNewQuote();
});

setNewQuote();