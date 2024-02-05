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
const ROW_SIZE = 50;

// 세로줄(|) 개수
const COL_SIZE = 50;

// 비어있으면 0 , 칠해져있으면 1, X면 -1
const pixelMap = new Array(ROW_SIZE).fill(1).map((_) => {
  return new Array(COL_SIZE).fill(0);
});

/*************************************** */

const col_clues = [
  [],
  [2],
  [4],
  [2, 5, 1],
  [1, 1, 1, 3, 2],
  [1, 2, 3, 2],
  [3, 3, 3],
  [1, 3, 5, 3],
  [2, 4, 1, 2, 4],
  [6, 1, 2, 14, 4],
  [3, 5, 2, 14, 4],
  [8, 12, 4],
  [10, 9, 4],
  [11, 7, 4],
  [11, 6, 4],
  [12, 5, 4],
  [11, 4, 4],
  [12, 1, 3, 4],
  [13, 2, 2, 5],
  [12, 1, 2, 1, 2],
  [12, 1, 4, 1, 1, 1],
  [11, 1, 4, 2, 2],
  [11, 1, 1, 1, 1],
  [11, 1, 5, 2],
  [10, 1, 2, 1],
  [10, 1, 1, 1],
  [9, 2, 1, 1, 1, 1, 1],
  [8, 1, 1, 1, 1, 1, 2],
  [7, 2, 1, 1, 2],
  [9, 1, 1, 1, 3],
  [9, 1, 4, 1, 4],
  [9, 1, 4, 1, 2, 1],
  [10, 1, 2, 3],
  [9, 2, 3, 1],
  [10, 1, 1, 3, 1],
  [9, 3, 1, 2],
  [8, 5, 1, 4],
  [8, 7, 7],
  [6, 10, 6],
  [4, 14, 6],
  [1, 2, 14, 7],
  [1, 2, 14, 7],
  [1, 2, 7],
  [4, 7],
  [7],
  [7],
  [8],
  [8],
  [8],
  [8],
];

const row_clues = [
  [],
  [],
  [3],
  [1, 1],
  [2, 3, 5],
  [1, 2, 13],
  [2, 1, 16],
  [2, 20],
  [2, 22],
  [3, 23],
  [2, 26],
  [1, 2, 26],
  [2, 3, 16, 10],
  [7, 15, 10],
  [6, 13, 9],
  [4, 13, 8],
  [11, 8],
  [9, 4, 1],
  [8, 5, 1],
  [1, 4, 5, 2, 1, 1],
  [1, 2, 1, 1],
  [1, 1, 2, 1, 1],
  [1, 2, 2, 2, 1, 1],
  [2, 1, 2, 2, 1],
  [2, 2, 2, 1],
  [2, 2, 1, 2],
  [2, 2, 3],
  [2, 1, 3],
  [3, 1, 3],
  [3, 2, 3],
  [3, 4],
  [4, 4],
  [4, 4],
  [5, 5],
  [6, 7, 5],
  [7, 6],
  [8, 2, 6],
  [9, 7],
  [10, 6],
  [11, 6],
  [4, 2],
  [3, 4],
  [1, 4, 2, 4],
  [1, 4, 10],
  [2, 3, 13],
  [4, 1, 13],
  [11, 3, 3, 14],
  [13, 9, 14],
  [16, 4, 15],
  [18, 3, 16],
];

const solution = [
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, 1, 1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, 1, 1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1,
  ],
  [
    -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1,
  ],
  [
    -1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1,
    -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1,
    -1, 1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1,
    1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1,
    1, -1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1,
    -1, -1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
    1, -1, 1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, 1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 1, 1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1,
    1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1,
    1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1,
    1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1,
    1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1,
    1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1,
    -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1,
    -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1,
    1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1,
    -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1,
    -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, 1, -1, -1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, 1, 1, 1, 1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1,
    -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1,
    1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1,
    1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
  ],
  [
    -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1,
    -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1,
  ],
  [
    -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1,
    -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1,
  ],
  [
    -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1,
    -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1,
  ],
];

// 완료 처리
function handleSolve() {
  // 이미지가 완료되었음을 나타내는 팝업 표시
  showPopupWithImage(
    "축하합니다!",
    '<img src="../nonogram/14.PNG" alt="Completed Image">'
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

      if (flag) return result;
      else return result.map(() => 0);
    }

    for (let i = 0; i < rows.length; ++i) {
      const result = simpleBoxForLine(rows[i], clueRow[i]);
      let flag = false;
      for (let j = 0; j < result.length; ++j) {
        if (result[j] == 1 && pixelMap[i][j] != 1) {
          flag = true;
          rows[i][j] = result[j];
        }
      }
      if (flag) return "row";
    }

    for (let i = 0; i < cols.length; ++i) {
      const result = simpleBoxForLine(cols[i], clueCol[i]);
      let flag = false;
      for (let j = 0; j < result.length; ++j) {
        if (result[j] == 1) {
          flag = true;
          cols[i][j] = result[j];
        }
      }
      if (flag) return "col";
    }

    return false;
  }

  function getDirectHint(solution, rows, cols) {
    let flag = false;

    for (let i = 0; i < rows.length; ++i) {
      for (let j = 0; j < rows[i].length; ++j) {
        if (solution[i][j] == 1 && rows[i][j] == 0) {
          flag = true;
          for (
            let k = 0;
            j + k < solution[i].length && solution[i][j + k] == 1;
            ++k
          ) {
            rows[i][j + k] = 1;
          }
        }
        if (flag) break;
      }
      if (flag) break;
    }
    if (flag) return "row";

    for (let i = 0; i < cols.length; ++i) {
      for (let j = 0; j < cols[i].length; ++j) {
        if (solution[j][i] == 1 && cols[i][j] == 0) {
          flag = true;
          for (
            let k = 0;
            j + k < solution.length && solution[j + k][i] == 1;
            ++k
          ) {
            cols[i][j + k] = 1;
          }
        }
        if (flag) break;
      }
      if (flag) break;
    }
    if (flag) return "col";
    return false;
  }

  const rows = pixelMap.map((row) => row.slice());
  const cols = [];
  for (let i = 0; i < pixelMap[0].length; ++i) {
    cols.push(new Array());
    for (let j = 0; j < pixelMap.length; ++j) {
      cols[i].push(pixelMap[j][i]);
    }
  }

  const wrongFlag = fixWrong(rows, cols, solution);
  if (wrongFlag) {
    if (wrongFlag == "row") {
      for (let i = 0; i < ROW_SIZE; ++i) {
        for (let j = 0; j < COL_SIZE; ++j) {
          if (pixelMap[i][j] == rows[i][j]) continue;

          pixelMap[i][j] = rows[i][j];
          const div = document.querySelector(".row" + i + "col" + j);
          const thumbnailDiv = document.querySelector(
            ".thumbnail-row" + i + "col" + j
          );

          if (pixelMap[i][j] == 1) {
            div.classList.remove("x");
            div.classList.add("active");
            div.classList.add("transparent");

            div.style.backgroundColor = "black";
            let currentOpacity = Math.random() / 2;
            div.style.opacity = Math.min(currentOpacity, 1);

            thumbnailDiv.classList.add("active");
            thumbnailDiv.classList.add("transparent");
            thumbnailDiv.style.backgroundColor = "black";
            currentOpacity = Math.random() / 2;

            thumbnailDiv.style.opacity = Math.min(currentOpacity, 1);
          } else if (pixelMap[i][j] == -1) {
            div.classList.remove("active");
            div.classList.remove("transparent");
            div.style.backgroundColor = "white";
            div.style.opacity = 1;
            div.classList.add("x");

            thumbnailDiv.style.backgroundColor = "white";
            thumbnailDiv.style.opacity = 1;
            thumbnailDiv.classList.remove("active");
            thumbnail.classList.remove("transparent");
          }
        }
      }
    } else if (wrongFlag == "col") {
      for (let i = 0; i < COL_SIZE; ++i) {
        for (let j = 0; j < ROW_SIZE; ++j) {
          if (pixelMap[j][i] == cols[i][j]) continue;

          pixelMap[j][i] = cols[i][j];
          const div = document.querySelector(".row" + j + "col" + i);
          const thumbnailDiv = document.querySelector(
            ".thumbnail-row" + j + "col" + i
          );

          if (pixelMap[j][i] == 1) {
            div.classList.remove("x");
            div.classList.add("active");
            div.classList.add("transparent");

            div.style.backgroundColor = "black";
            let currentOpacity = Math.random() / 2;
            div.style.opacity = Math.min(currentOpacity, 1);

            thumbnailDiv.classList.add("active");
            thumbnailDiv.classList.add("transparent");
            thumbnailDiv.style.backgroundColor = "black";
            currentOpacity = Math.random() / 2;
            thumbnailDiv.style.opacity = Math.min(currentOpacity, 1);
          } else if (pixelMap[j][i] == -1) {
            div.classList.remove("active");
            div.classList.remove("transparent");
            div.style.backgroundColor = "white";
            div.style.opacity = 1;
            div.classList.add("x");

            thumbnailDiv.style.backgroundColor = "white";
            thumbnailDiv.style.opacity = 1;
            thumbnailDiv.classList.remove("active");
            thumbnail.classList.remove("transparent");
          }
        }
      }
    }

    return;
  }

  const simpleBoxFlag = simpleBox(rows, cols, row_clues, col_clues);
  console.log(simpleBoxFlag);
  console.log(simpleBoxFlag == "row" ? rows : cols);
  console.log(pixelMap);
  if (simpleBoxFlag) {
    if (simpleBoxFlag == "r