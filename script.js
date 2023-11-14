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

//first number, operator and secon number sent to the display
const firstNum = 3;
const operator = "/";
const nextNum = 2;

themeButton.addEventListener("click", changeTheme);
calcWindow.textContent = numberKey();
clearBtn.addEventListener("click", clearScreen);
delBtn.addEventListener("click", deleteDisplay);

//Removes a single number at a time
function deleteDisplay() {
    return calcWindow.textContent = calcWindow.textContent.slice(0, -1);
}

//Removes all data on screen
function clearScreen() {
    calcWindow.textContent = "";
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
function numberKey() {
    numBtn.forEach(item => {
        item.addEventListener("click", ()=> {
            calcWindow.append(item.innerText);
        })
    })
}

//operator functions
function add(a, b) {return a + b;}
function minus(a, b) {return a - b;}
function multiply(a, b) {return a * b;}
function divide(a, b) {return a / b;}

function operate(firstNum, operator, nextNum) {
if(operator === "+") return add(firstNum, nextNum);
if(operator === "-") return minus(firstNum, nextNum);
if(operator === "*") return multiply(firstNum, nextNum);
if(operator === "/") return divide(firstNum, nextNum);
}


