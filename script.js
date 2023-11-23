const currentDate = document.querySelector(".current-date");
currentDate.textContent = new Date().getFullYear();

const setTheme = document.querySelector("body");
const themeButton = document.querySelector(".theme-toggle");
const calcWindow = document.querySelector(".calc-window");
const toggleMoon = document.querySelector(".calc-moon");
const toggleSun = document.querySelector(".calc-sun");
//Calculator Buttons
const numBtn = document.querySelectorAll("[data-number]");
const clearBtn = document.querySelector("[data-clear]");
const delBtn = document.querySelector("[data-delete]");
const equalsBtn = document.querySelector("[data-equals]");
const operationBtn = document.querySelectorAll("[data-operation]");

//first number, operator and second number sent to the display
let firstNum = "";
let operator = "";
let currentNum = "";
let isSum = false;

themeButton.addEventListener("click", changeTheme);
clearBtn.addEventListener("click", clearScreen);
delBtn.addEventListener("click", deleteDisplay);
equalsBtn.addEventListener("click", equalsSum);

calcWindow.textContent = numberBtns();
operationBtn.textContent = operatorBtns();

//Removes a single number at a time
function deleteDisplay() {
    return calcWindow.textContent = calcWindow.textContent.slice(0, -1);
}

//Removes all data on screen
function clearScreen() {
    calcWindow.textContent = "";
    firstNum = "";
    currentNum = "";
    isSum = false;
}

//Toggle between Light/Dark mode
function changeTheme() {
    themeButton.classList.toggle("theme-toggle-light");
    toggleMoon.classList.toggle("calc-moon-hidden");
    toggleSun.classList.toggle("calc-sun");
    setTheme.classList.toggle("dark-background");
    numBtn.forEach(item => item.classList.toggle("dark-btns"));
    calcWindow.classList.toggle("dark-window");
}

//Adds clicked text to screen
function numberBtns() {
    numBtn.forEach(num => {
        num.addEventListener("click", ()=> {
            if(!isSum) {
                firstNum += num.innerText;
                calcWindow.innerText += num.innerText;
            } else {
                currentNum += num.innerText;
                calcWindow.innerText += num.innerText;
            }
        })
    })
}

function operatorBtns() {
    operationBtn.forEach(op => {
        op.addEventListener("click", ()=> {
            isSum = true;
            calcWindow.innerText += op.innerText;
        })
    })
}

function equalsSum() {
    calcWindow.innerText = parseInt(firstNum) + parseInt(currentNum);
}

//operator functions
function add(a, b) {return a + b;}
function minus(a, b) {return a - b;}
function multiply(a, b) {return a * b;}
function divide(a, b) {
    if(b !== 0) return a / b;
    return alert("Well done. You destroyed the Universe");
}

function operate(firstNum, operator, nextNum) {
if(operator === "+") return add(firstNum, nextNum);
if(operator === "-") return minus(firstNum, nextNum);
if(operator === "*") return multiply(firstNum, nextNum);
if(operator === "/") return divide(firstNum, nextNum);
}


