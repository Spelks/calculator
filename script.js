const currentDate = document.querySelector(".current-date");
currentDate.textContent = new Date().getFullYear();

const setTheme = document.querySelector("body");
const themeButton = document.querySelector(".theme-toggle");
const calcWindow = document.querySelector(".calc-window");
const toggleMoon = document.querySelector(".calc-moon");
const toggleSun = document.querySelector(".calc-sun");
const numBtn = document.querySelectorAll(".num");
const delBtn = document.querySelector(".clear-btn")

themeButton.addEventListener("click", changeTheme);
calcWindow.textContent = numberKey();
delBtn.addEventListener("click", clearScreen);

function clearScreen() {
    calcWindow.textContent = "";
}

//Toggle between Light/Dark mode
function changeTheme() {
    themeButton.classList.toggle("theme-toggle-light");
    toggleMoon.classList.toggle("calc-moon-hidden");
    toggleSun.classList.toggle("calc-sun");
    setTheme.classList.toggle("dark-background");
    mainBtn.forEach(item => item.classList.toggle("dark-btns"));
    calcWindow.classList.toggle("dark-window");
}

function numberKey() {
    numBtn.forEach(item => {
        item.addEventListener("click", ()=> {
            calcWindow.append(item.innerText);
        })
    })
}


