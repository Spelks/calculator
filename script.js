const currentDate = document.querySelector(".current-date");
const setTheme = document.querySelector("body");
const themeButton = document.querySelector(".theme-toggle");
const calcPrevious = document.querySelector(".calc-previous");
const calcWindow = document.querySelector(".calc-window");
const calcMain = document.querySelector(".calc-main-window");
const toggleMoon = document.querySelector(".calc-moon");
const toggleSun = document.querySelector(".calc-sun");
const numBtn = document.querySelectorAll("[data-number]");
const clearBtn = document.querySelector("[data-clear]");
const delBtn = document.querySelector("[data-delete]");
const equalsBtn = document.querySelector("[data-equals]");
const operationBtn = document.querySelectorAll("[data-operation]");

let previousOperand = "";
let operator = undefined;
let currentOperand = "";
let isEquals = false;

themeButton.addEventListener("click", changeTheme);
clearBtn.addEventListener("click", clearScreen);
delBtn.addEventListener("click", deleteDisplay);
equalsBtn.addEventListener("click", equalsSum);
window.addEventListener('keydown', keyboardInput);

calcWindow.textContent = "0";
currentDate.textContent = new Date().getFullYear();

numberBtns();
operatorBtns();

// Delete the last digit from the current operand
function deleteDisplay() {
    if (isEquals) return;
    if (currentOperand !== "") {
        calcWindow.textContent = calcWindow.textContent.slice(0, -1);
        currentOperand = currentOperand.slice(0, -1);
    }
    if (currentOperand === "" && previousOperand === "") calcWindow.textContent = "0";
}

// Clear all input and reset Calculator state
function clearScreen() {
    calcPrevious.textContent = "";
    calcWindow.textContent = "0";
    previousOperand = "";
    currentOperand = "";
    operator = undefined;
    isEquals = false;
}

// Toggle between light and dark themes
function changeTheme() {
    themeButton.classList.toggle("theme-toggle-light");
    toggleMoon.classList.toggle("calc-moon-hidden");
    toggleSun.classList.toggle("calc-sun");
    setTheme.classList.toggle("dark-background");
    numBtn.forEach(button => button.classList.toggle("dark-btns"));
    calcMain.classList.toggle("dark-window");
}

// Managing Calculator buttons
function numberBtns() {
    numBtn.forEach(num => {
        num.addEventListener("click", () => {
            if (num.textContent === "." && currentOperand.includes(".")) return;
            if (operator === "÷" && currentOperand === "0") displayError();
            if (calcWindow.textContent === "0") calcWindow.textContent = "";
            if (isEquals || isErrorDisplayed()) {
                clearScreen();
                calcWindow.textContent = "";
            }
            currentOperand += num.textContent;
            calcWindow.textContent += num.textContent;
        })
    })
}

// Display an error message in calculator
function displayError() {
    calcWindow.textContent = "ERROR!";
    currentOperand = "";
    previousOperand = "";
    operator = undefined;
    isEquals = true;
}

function isErrorDisplayed() {
    return calcWindow.textContent === "ERROR!";
}

function operatorBtns() {
    operationBtn.forEach(op => {
        op.addEventListener("click", () => {
            operatorLogic(op.textContent);
        })
    })
}

// Handles the equals button operation
function equalsSum() {
    if (currentOperand === "" || previousOperand === "" || calcPrevious.textContent && isEquals) return;
    calcPrevious.textContent = calcWindow.textContent + "=";
    let result = operate(previousOperand, operator, currentOperand);

    if (operator === "÷" && currentOperand === "0") {
        calcWindow.textContent = "ERROR!";
    } else {
        if (Math.floor(result) !== result) {
            calcWindow.textContent = parseFloat(result).toFixed(4);
        } else {
            calcWindow.textContent = result;
        }
    }
    isEquals = true;
}

// Convert operator symbols for display
function convertOperatorSymbol(op) {
    if (op === "*") return "×";
    if (op === "/") return "÷";
    if (op === "-") return "−";
    return op;
}

// Perform the calculation based on the operator
function operate(previousOperand, operator, currentOperand) {
    isEquals = false;
    operator = convertOperatorSymbol(operator);
    if (operator === "+") return parseFloat(previousOperand) + parseFloat(currentOperand);
    if (operator === "−") return parseFloat(previousOperand) - parseFloat(currentOperand);
    if (operator === "×") return parseFloat(previousOperand) * parseFloat(currentOperand);
    if (operator === "÷") return parseFloat(previousOperand) / parseFloat(currentOperand);
}

// Handles keyboard input
function keyboardInput(e) {
    if (e.key === "." && currentOperand.includes(".")) return;
    if (e.key >= 0 && e.key <= 9 || e.key === ".") keyboardInputNumber(e.key);
    if (e.key === "=" || e.key === "Enter") { 
        equalsSum();
        e.preventDefault();
    }
    if (e.key === "Backspace") deleteDisplay();
    if (e.key === "Escape" || e.key === "c") clearScreen();
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") { 
        keyboardInputOperator(e.key);
        e.preventDefault();
    }
}

// Handles number input from the keyboard
function keyboardInputNumber(num) {
    if (calcWindow.textContent === "0") calcWindow.textContent = "";
    if (operator === "÷" && currentOperand === "0") displayError();
    if (isEquals || isErrorDisplayed()) {
        clearScreen();
        calcWindow.textContent = "";
    }
    currentOperand += num;
    calcWindow.textContent += num;
}

// Handles operator input from the keyboard
function keyboardInputOperator(keyOp) {
    if (isErrorDisplayed()) return;
    let opSymbol = convertOperatorSymbol(keyOp);
    operatorLogic(opSymbol);
}

// Handles both keyboard and Calculator button logic
function operatorLogic(op) {
    if (!isErrorDisplayed) isEquals = false;
    if (currentOperand === "" && previousOperand === "" || isErrorDisplayed()) return;
    if (calcWindow.textContent.endsWith(operator)) {
        calcWindow.textContent = calcWindow.textContent.slice(0, -1);
    }
    if (currentOperand !== "" && previousOperand !== "") {
        previousOperand = operate(previousOperand, operator, currentOperand);
        currentOperand = "";
    } else if (currentOperand !== "") {
        previousOperand = currentOperand;
        currentOperand = "";
    }
    operator = op;
    calcWindow.textContent += op;
}