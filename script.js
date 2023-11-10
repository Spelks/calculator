const currentDate = document.querySelector(".current-date");
currentDate.textContent = new Date().getFullYear();

const setTheme = document.querySelector("body");
const themeButton = document.querySelector(".theme-toggle");
const mainBtn = document.querySelectorAll(".btn");
const calcWindow = document.querySelector(".calc-window");
themeButton.addEventListener("click", changeTheme);
calcWindow.textContent = "1234"

function changeTheme() {
    setTheme.classList.toggle("dark-background");
    mainBtn.forEach(item => item.classList.toggle("dark-btns"));
    calcWindow.classList.toggle("dark-window");
}