const calcPrevious = document.querySelector("[data-previous-display]");
const calcCurrent = document.querySelector("[data-current-display]");
const numBtn = document.querySelectorAll("[data-number]");
const clearBtn = document.querySelector("[data-clear]");
const delBtn = document.querySelector("[data-delete]");
const equalsBtn = document.querySelector("[data-equals]");
const operatorBtn = document.querySelectorAll("[data-operator]");

let previousOperand = "";
let operator = undefined;
let currentOperand = "";
let isEquals = false;

clearBtn.addEventListener("click", clearScreen);
delBtn.addEventListener("click", deleteDisplay);
equalsBtn.addEventListener("click", equalsSum);
window.addEventListener('keydown', keyboardInput);

calcCurrent.textContent = "0";

numberBtns();
operatorBtns();

// Delete the last digit from the current operand
function deleteDisplay() {
    if (isEquals) return;
    if (currentOperand !== "") {
        calcCurrent.textContent = calcCurrent.textContent.slice(0, -1);
        currentOperand = currentOperand.slice(0, -1);
    }
    if (currentOperand === "" && previousOperand === "") calcCurrent.textContent = "0";
}

// Clear all input and reset Calculator state
function clearScreen() {
    calcPrevious.textContent = "";
    calcCurrent.textContent = "0";
    previousOperand = "";
    currentOperand = "";
    operator = undefined;
    isEquals = false;
}

// Managing Calculator buttons
function numberBtns() {
    numBtn.forEach(num => {
        num.addEventListener("click", () => {
            if (num.textContent === "." && currentOperand.includes(".")) return;
            // if (calcCurrent.textContent === "0") calcCurrent.textContent = "";
            if (calcCurrent.textContent === "0" && !num.textContent.includes(".")) calcCurrent.textContent = "";
            if (isEquals || isErrorDisplayed()) {
                clearScreen();
                calcCurrent.textContent = "";
            }
            currentOperand += num.textContent;
            calcCurrent.textContent += num.textContent;
        })
    })
}

// Display an error message in calculator
function displayError() {
    calcCurrent.textContent = "ERROR!";
    currentOperand = "";
    previousOperand = "";
    operator = undefined;
    isEquals = true;
}

function isErrorDisplayed() {
    return calcCurrent.textContent === "ERROR!";
}

function operatorBtns() {
    operatorBtn.forEach(op => {
        op.addEventListener("click", () => {
            operatorLogic(op.textContent);
        })
    })
}

// Handles the equals button operation
function equalsSum() {
    if (currentOperand === "" || previousOperand === "" || calcPrevious.textContent && isEquals) return;
    calcPrevious.textContent = calcCurrent.textContent + "=";
    let result = operate(previousOperand, operator, currentOperand);

    if (operator === "÷" && currentOperand === "0") {
        displayError();
    } else {
        calcCurrent.textContent = parseFloat(result.toFixed(3));
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
    // if (calcCurrent.textContent === "0") calcCurrent.textContent = "";
    if (calcCurrent.textContent === "0" && num !== ".") calcCurrent.textContent = "";
    if (isEquals || isErrorDisplayed()) {
        clearScreen();
        calcCurrent.textContent = "";
    }
    currentOperand += num;
    calcCurrent.textContent += num;
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
    if (calcCurrent.textContent.endsWith(operator)) {
        calcCurrent.textContent = calcCurrent.textContent.slice(0, -1);
    }
    if (currentOperand !== "" && previousOperand !== "") {
        previousOperand = operate(previousOperand, operator, currentOperand);
        currentOperand = "";
    } else if (currentOperand !== "") {
        previousOperand = currentOperand;
        currentOperand = "";
    }
    operator = op;
    calcCurrent.textContent += op;
}