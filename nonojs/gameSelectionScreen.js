const startScreen = document.querySelector(".start-screen");
const gameSelectionScreen = document.querySelector(".game-selection-screen");
const gameScreen = document.querySelector(".game-screen");
const tutorialScreen = document.querySelector(".tutorial-screen");

const gameBtns = document.querySelectorAll(".game-btn");

gameBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    showScreen("game-screen");
    // game content
  });
});

function showScreen(screenName) {
  startScreen.style.display = screenName === "start-screen" ? "block" : "none";
  gameSelectionScreen.style.display =
    screenName === "game-selection-screen" ? "block" : "none";
  gameScreen.style.display = screenName === "game-screen" ? "block" : "none";
  tutorialScreen.style.display =
    screenName === "tutorial-screen" ? "block" : "none";
}

// JavaScript로 이미지를 클릭하면 텍스트를 나타나게 함
document
  .querySelectorAll(".graphic-container .image-container")
  .forEach(function (container) {
    container.addEventListener("click", function () {
      // 이미지를 클릭하면 해당 이미지에 대한 텍스트 표시
      var text = container.getAttribute("data-text");
      container.querySelector(".image-text").textContent = text;
    });
  });

// Initialize Variables
var closePopuptutorial = document.getElementById("popupclosetutorial");
var overlaytutorial = document.getElementById("overlaytutorial");
var popuptutorial = document.getElementById("popuptutorial");
var buttontutorial = document.getElementById("buttontutorial");
// Close Popup Event
closePopuptutorial.onclick = function () {
  overlaytutorial.style.display = "none";
  popuptutorial.style.display = "none";
};
// Show Overlay and Popup
buttontutorial.onclick = function () {
  console.log("Button Clicked");
  overlaytutorial.style.display = "block";
  popuptutorial.style.display = "block";
};

//버튼변경
// JavaScript로 이미지 변경 함수 정의
function changeImage(btnClassName, imageNumber) {
  const button = document.querySelector("." + btnClassName + " img");
  button.src =
    "../nonographic/" + btnClassName.slice(0, -4) + imageNumber + ".png";
}

function resetImage(btnClassName) {
  const button = document.querySelector("." + btnClassName + " img");
  button.src = "../nonographic/" + btnClassName.slice(0, -4) + "01.png";
}

// 마우스가 tutorial-btn 위로 올라갈 때 이미지 변경
document
  .querySelector(".tutorial-btn")
  .addEventListener("mouseover", function () {
    changeImage("tutorial-btn", "02");
  });

// 마우스가 tutorial-btn에서 나갈 때 이미지 리셋
document
  .querySelector(".tutorial-btn")
  .addEventListener("mouseout", function () {
    resetImage("tutorial-btn");
  });

// 마우스가 back-to-start-btn 위로 올라갈 때 이미지 변경
document
  .querySelector(".back-to-start-btn")
  .addEventListener("mouseover", function () {
    changeImage("back-to-start-btn", "02");
  });

// 마우스가 back-to-start-btn에서 나갈 때 이미지 리셋
document
  .querySelector(".back-to-start-btn")
  .addEventListener("mouseout", function () {
    resetImage("back-to-start-btn");
  });
