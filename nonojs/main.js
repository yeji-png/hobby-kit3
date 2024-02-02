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
// 버튼 이미지 변경
function changeImage(btnClass, suffix) {
  const img = document.querySelector(`.${btnClass} img`);

  // 이미지 변경
  img.src = `../nonographic/${btnClass}-${suffix}.png`;

  // 커서를 올렸을 때만 트랜지션 효과 적용
  if (suffix === "02") {
    img.style.transition = "all 0.3s";
  } else {
    img.style.transition = "none"; // 커서를 올리지 않았을 때 트랜지션 효과 제거
  }
}

// 마우스가 버튼에서 빠져나갈 때 원래 이미지로 돌아가도록 이벤트 핸들러 추가
function resetImage(btnClass) {
  const img = document.querySelector(`.${btnClass} img`);

  // 이미지 초기화
  img.src = `../nonographic/${btnClass}-01.png`;
  img.style.transition = "none"; // 트랜지션 효과 제거
}
