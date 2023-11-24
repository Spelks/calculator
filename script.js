const currentDate = document.querySelector(".current-date");
const setTheme = document.querySelector("body");
const themeButton = document.querySelector(".theme-toggle");
const calcWindow = document.querySelector(".calc-window");
const toggleMoon = document.querySelector(".calc-moon");
const toggleSun = document.querySelector(".calc-sun");
const numBtn = document.querySelectorAll("[data-number]");
const clearBtn = document.querySelector("[data-clear]");
const delBtn = document.querySelector("[data-delete]");
const equalsBtn = document.querySelector("[data-equals]");
const operationBtn = document.querySelectorAll("[data-operation]");

//first number, operator and current number sent to the display
let firstNum = "";
// let operator = "";
let operator = undefined;
let currentNum = "";
let isSum = false;

themeButton.addEventListener("click", changeTheme);
clearBtn.addEventListener("click", clearScreen);
delBtn.addEventListener("click", deleteDisplay);
equalsBtn.addEventListener("click", equalsSum);
calcWindow.textContent = numberBtns();
operationBtn.textContent = operatorBtns();
currentDate.textContent = new Date().getFullYear();

//Removes a single number at a time
function deleteDisplay() {
    return calcWindow.textContent = calcWindow.textContent.slice(0, -1);
}

//Removes all data on screen
function clearScreen() {
    calcWindow.textContent = "";
    firstNum = "";
    currentNum = "";
    operator = undefined;
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
            // if(num === "." && num.includes(".")) return;
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
            if(firstNum === "") return; //Does not allow operator if no number has been selected.
            isSum = true;
            calcWindow.innerText += op.innerText;
            operator = op.innerText;
        })
    })
}

function equalsSum() {
    let result = operate(firstNum, operator, currentNum);
    calcWindow.innerText = result;
}

//operator functions
function add(a, b) {return parseFloat(a) + parseFloat(b);}
function minus(a, b) {return parseFloat(a) - parseFloat(b);}
function multiply(a, b) {return parseFloat(a) * parseFloat(b);}
function divide(a, b) {
    if(b !== "0") return parseFloat(a) / parseFloat(b);
    return alert("Well done. You destroyed the Universe");
}

function operate(firstNum, operator, currentNum) {
if(operator === "+") return add(firstNum, currentNum);
if(operator === "−") return minus(firstNum, currentNum);
if(operator === "×") return multiply(firstNum, currentNum);
if(operator === "÷") return divide(firstNum, currentNum);
}