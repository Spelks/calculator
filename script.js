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
let isEquals = false;

themeButton.addEventListener("click", changeTheme);
clearBtn.addEventListener("click", clearScreen);
delBtn.addEventListener("click", deleteDisplay);
equalsBtn.addEventListener("click", equalsSum);

calcWindow.textContent = "0";
currentDate.textContent = new Date().getFullYear();

numberBtns();
operatorBtns()

//Removes a single number at a time on active variable
function deleteDisplay() {
    if (isEquals) return;
    if (currentOperand !== "") {
        calcWindow.textContent = calcWindow.textContent.slice(0, -1);
        currentOperand = currentOperand.slice(0, -1);
    }
    if (currentOperand === "") calcWindow.textContent = "0";
}

//Removes all data on screen and resets variables
function clearScreen() {
    calcWindow.textContent = "0";
    previousOperand = "";
    currentOperand = "";
    operator = undefined;
    isEquals = false;
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

//Handles numbers and decimal point
function numberBtns() {
    numBtn.forEach(num => {
        num.addEventListener("click", ()=> {
            if(num.innerText === "." && currentOperand.includes(".")) return;
            if (isEquals && calcWindow.innerText !== "ERROR!") return;
            if(calcWindow.innerText === "ERROR!" || calcWindow.innerText === "0") {
                previousOperand = "";
                currentOperand = "";
                calcWindow.innerText = currentOperand;
                isEquals = false;
            }
            currentOperand += num.innerText;
            calcWindow.innerText += num.innerText;
        })
    })
}

//Handles operators
// function operatorBtns() {
//     operationBtn.forEach(op => {
//         op.addEventListener("click", ()=> {
//             isEquals = false;
//             if(currentOperand === "" && previousOperand === "" || calcWindow.innerText === "ERROR!") return;
//             if(calcWindow.innerText.endsWith(operator)) {
//                 calcWindow.textContent = calcWindow.textContent.slice(0, -1);
//             }
//             if(currentOperand !== "" && previousOperand !== "") {
//                 previousOperand = operate(previousOperand, operator, currentOperand);
//                 currentOperand = "";
//             } else if (currentOperand !== "") {
//                 previousOperand = currentOperand;
//                 currentOperand = "";
//             }
//             calcWindow.innerText += op.innerText;
//             operator = op.innerText;
//         })
//     })
// }
function operatorBtns() {
    operationBtn.forEach(op => {
        op.addEventListener("click", ()=> {
            operatorBtnFunc(op.innerText);
        })
    })
}

function equalsSum() {
    if (currentOperand === "" || previousOperand === "") return;
    let result = operate(previousOperand, operator, currentOperand);
    calcWindow.innerText = result;
    isEquals = true;
}

function operate(previousOperand, operator, currentOperand) {
    isEquals = false;
    if(operator === "+") return parseFloat(previousOperand) + parseFloat(currentOperand);
    if(operator === "−") return parseFloat(previousOperand) - parseFloat(currentOperand);
    if(operator === "×") return parseFloat(previousOperand) * parseFloat(currentOperand);
    if(operator === "÷") {
        if(currentOperand !== "0") return parseFloat(previousOperand) / parseFloat(currentOperand);
        return calcWindow.textContent = "ERROR!";
    }
}

//Direct keyboard input
window.addEventListener('keydown', keyboardInput)

function keyboardInput(e) {
    if (e.key >= 0 && e.key <= 9 || e.key === ".") keyboardInputNumber(e.key)
    if (e.key === "=" || e.key === "Enter") equalsSum();
    if (e.key === "Backspace") deleteDisplay();
    if (e.key === "Escape" || e.key === "c") clearScreen();
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") keyboardInputOperator(e.key);
  }

  function keyboardInputNumber(num) {
    if(calcWindow.textContent === "0") calcWindow.textContent = "";
    currentOperand += num;
    calcWindow.textContent += num;
  }

  function keyboardInputOperator(op) {
    op = operatorBtnFunc(op);
  }

  function operatorBtnFunc(op) {
    isEquals = false;
    if(currentOperand === "" && previousOperand === "" || calcWindow.innerText === "ERROR!") return;
    if(calcWindow.innerText.endsWith(operator)) {
        calcWindow.textContent = calcWindow.textContent.slice(0, -1);
    }
    if(currentOperand !== "" && previousOperand !== "") {
        previousOperand = operate(previousOperand, operator, currentOperand);
        currentOperand = "";
    } else if (currentOperand !== "") {
        previousOperand = currentOperand;
        currentOperand = "";
    }
    operator = op;
    calcWindow.innerText += op;
  }
