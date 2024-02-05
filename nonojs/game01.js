const container = document.querySelector(".container");
const thumbnail = document.querySelector(".thumbnail");
let size = 30;
const color = document.querySelector(".color");

let draw = false;

const settingButton = document.querySelector(".setting-btn");
const brushBoard = document.querySelector(".brush-board");

const brushButton = document.querySelector(".brush-btn");
const xButton = document.querySelector(".x-btn");

let curBrush = "O";

settingButton.addEventListener("click", function () {
  if (brushBoard.style.display == "none") brushBoard.style.display = "block";
  else brushBoard.style.display = "none";
});

xButton.addEventListener("click", function () {
  curBrush = "X";
});

brushButton.addEventListener("click", function () {
  curBrush = "O";
});
// 가로줄(-) 개수
const ROW_SIZE = 5;

// 세로줄(|) 개수
const COL_SIZE = 5;

// 비어있으면 0 , 칠해져있으면 1, X면 -1
const pixelMap = new Array(ROW_SIZE).fill(1).map((_) => {
  return new Array(COL_SIZE).fill(0);
});

/*************************************** */

const col_clues = [[5], [1, 1, 1], [5], [1, 1, 1], [5]];

const row_clues = [[5], [1, 1, 1], [5], [1, 1, 1], [5]];

const solution = [
  [1, 1, 1, 1, 1],
  [1, -1, 1, -1, 1],
  [1, 1, 1, 1, 1],
  [1, -1, 1, -1, 1],
  [1, 1, 1, 1, 1],
];

// 완료 처리
function handleSolve() {
  // 이미지가 완료되었음을 나타내는 팝업 표시
  showPopupWithImage(
    "축하합니다!",
    '<img src="../nonogram/01.PNG" alt="Completed Image">'
  );
}

// 팝업을 표시하는 함수 (이미지와 함께)
function showPopupWithImage(title, imageHTML) {
  var overlaysolve = document.getElementById("overlaysolve");
  var popupsolve = document.getElementById("popupsolve");
  var popupTitlesolve = document.querySelector(".popupcontentsolve h1");
  var popupContentsolve = document.querySelector(".popupcontentsolve");

  // 제목과 이미지를 설정
  popupTitlesolve.innerHTML = title;
  popupContentsolve.innerHTML = imageHTML;

  // 팝업과 오버레이를 보이게 함
  overlaysolve.style.display = "block";
  popupsolve.style.display = "block";

  // 팝업 닫기 이벤트 설정
  var closePopupsolve = document.getElementById("popupclosesolve");
  closePopupsolve.onclick = function () {
    overlaysolve.style.display = "none";
    popupsolve.style.display = "none";
  };
}

/*************************************** */

function applyHint() {
  function fixWrong(rows, cols, solution) {
    for (let i = 0; i < rows.length; ++i) {
      let wrongs = [];
      for (let j = 0; j < rows[i].length; ++j) {
        if (
          (rows[i][j] === 1 && solution[i][j] === -1) ||
          (rows[i][j] === -1 && solution[i][j] === 1)
        )
          wrongs.push(j);
      }
      if (wrongs.length > 0) {
        wrongs.forEach((j) => {
          rows[i][j] = solution[i][j];
        });
        return "row";
      }
    }

    for (let i = 0; i < cols.length; ++i) {
      let wrongs = [];
      for (let j = 0; j < cols[i].length; ++j) {
        if (
          (cols[i][j] === 1 && solution[j][i] === -1) ||
          (cols[i][j] === -1 && solution[j][i] === 1)
        )
          wrongs.push(j);
      }
      if (wrongs.length > 0) {
        wrongs.forEach((j) => {
          cols[i][j] = solution[j][i];
        });
        return "col";
      }
    }
    return false;
  }

  function simpleBox(rows, cols, clueRow, clueCol) {
    if (rows.length >= 30) return false;
    function simpleBoxForLine(line, clueLine) {
      const candidates = [];
      function checkPossibility(length, start) {
        for (let i = start; i < start + length; ++i) {
          if (i >= line.length) return false;
          if (line[i] === -1) return false;
        }
        return true;
      }
      function simpleBoxRecursion(start, clueIndex, curCandidate) {
        if (clueIndex === clueLine.length) {
          candidates.push(curCandidate);
          return;
        }

        const clue = clueLine[clueIndex];

        for (let i = start; i < line.length; ++i) {
          const possibility = checkPossibility(clue, i);

          if (possibility) {
            const candidate = curCandidate.slice();
            for (let j = i; j < i + clue; ++j) candidate[j] = clueIndex + 1;
            simpleBoxRecursion(i + clue, clueIndex + 1, candidate);
          }
        }
      }
      const clueSum = clueLine.reduce((acc, cur) => acc + cur, 0);
      for (let i = 0; i <= line.length - (clueSum + clueLine.length - 1); ++i) {
        const arr = new Array(line.length).fill(0);
        simpleBoxRecursion(i, 0, arr);
      }
      const lineWithSimpleBoxes = candidates[0];

      for (let i = 1; i < candidates.length; ++i) {
        const candidate = candidates[i];
        for (let j = 0; j < candidate.length; ++j) {
          if (candidate[j] != lineWithSimpleBoxes[j])
            lineWithSimpleBoxes[j] = 0;
        }
      }
      console.log("candidate", candidates);
      // 칠할 수 있는 부분들 return
      const result = lineWithSimpleBoxes.map((l) => (l != 0 ? 1 : 0));
      let flag = false;

      for (let i = 0; i < result.length; ++i)
        if (result[i] == 1 && line[i] != 1) flag = true;

      if (f