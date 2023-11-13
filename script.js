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

themeButton.addEventListener("click", changeTheme);
calcWindow.textContent = numberKey();
clearBtn.addEventListener("click", clearScreen);

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

function numberKey() {
    numBtn.forEach(item => {
        item.addEventListener("click", ()=> {
            calcWindow.append(item.innerText);
        })
    })
}


