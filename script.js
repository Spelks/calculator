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
let previousOperand = "";
let operator = undefined;
let currentOperand = "";

themeButton.addEventListener("click", changeTheme);
clearBtn.addEventListener("click", clearScreen);
delBtn.addEventListener("click", deleteDisplay);
equalsBtn.addEventListener("click", equalsSum);

calcWindow.textContent = numberBtns();
operationBtn.textContent = operatorBtns();
currentDate.textContent = new Date().getFullYear();

//Removes a single number at a time on active variable
function deleteDisplay() {
    if (currentOperand !== "") {
        calcWindow.textContent = calcWindow.textContent.slice(0, -1);
        currentOperand = currentOperand.slice(0, -1);
    }
}

//Removes all data on screen and clears variables
function clearScreen() {
    calcWindow.textContent = "";
    previousOperand = "";
    currentOperand = "";
    operator = undefined;
}

//Toggle between Light/Dark mode
function changeTheme() {
    themeButton.classList.toggle("theme-toggle-light");
    toggleMoon.classList.toggle("calc-moon-hidden");
    toggleSun.classList.toggle("calc-sun");
    setTheme.classList.toggle("dark-background");
    numBtn.forEach(button => button.classList.toggle("dark-btns"));
    calcWindow.classList.toggle("dark-window");
}

function numberBtns() {
    numBtn.forEach(num => {
        num.addEventListener("click", ()=> {
            if(calcWindow.innerText === "ERROR!") {
                previousOperand = "";
                currentOperand = "";
                calcWindow.innerText = currentOperand;
            }
            currentOperand += num.innerText;
            calcWindow.innerText += num.innerText;
        })
    })
}

function operatorBtns() {
    operationBtn.forEach(op => {
        op.addEventListener("click", ()=> {
            if(currentOperand === "" && previousOperand === "") return; //Does not allow operator if no number has been selected.
            if(currentOperand !== "" && previousOperand !== "") {
                previousOperand = operate(previousOperand, operator, currentOperand);
                currentOperand = "";
            } else if (currentOperand !== "") {
                previousOperand = currentOperand;
                currentOperand = "";
            }
            calcWindow.innerText += op.innerText;
            operator = op.innerText;
        })
    })
}

function equalsSum() {
    let result = operate(previousOperand, operator, currentOperand);
    calcWindow.innerText = result;
}

function operate(previousOperand, operator, currentOperand) {
if(operator === "+") return parseFloat(previousOperand) + parseFloat(currentOperand);
if(operator === "−") return parseFloat(previousOperand) - parseFloat(currentOperand);
if(operator === "×") return parseFloat(previousOperand) * parseFloat(currentOperand);
if(operator === "÷") {
    if(currentOperand !== "0") return parseFloat(previousOperand) / parseFloat(currentOperand);
    return calcWindow.textContent = "ERROR!";
    }
}