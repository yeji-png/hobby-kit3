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
  [],
  [3, 3],
  [5, 4],
  [1, 6],

  [1, 7],
  [6, 3],
  [3, 2],
  [2, 6, 1],
  [2, 2, 2, 1],

  [2, 1, 3, 1, 1],
  [5, 1, 1, 27],
  [4, 37],
  [3, 39],
  [42],

  [12, 23],
  [14, 1, 19],
  [14, 1, 16],
  [15, 1, 13],
  [16, 1, 4, 10],

  [16, 1, 4, 9],
  [16, 1, 6],
  [17, 1, 1],
  [17, 1, 1, 2],
  [17, 5, 1, 1, 2],

  [17, 3, 1, 1, 1, 1],
  [17, 1, 1, 1, 1, 2],
  [17, 1, 1, 1, 1, 1],
  [17, 2, 1, 1],
  [17, 1, 1, 1],

  [17, 1, 4, 2, 1],
  [16, 1, 4, 1, 1],
  [16, 1, 1, 2],
  [16, 1, 2, 2],
  [16, 1, 5, 2],

  [15, 1, 9],
  [15, 12],
  [16, 18],
  [43],
  [42],

  [40],
  [39],
  [7, 23],
  [2, 5, 25],
  [1, 2, 1],

  [1, 3, 1],
  [5, 1],
  [1],
  [1],
  [1],
];

const row_clues = [
  [],
  [],
  [4, 9],
  [2, 2, 3, 16],
  [2, 2, 3, 19],

  [2, 2, 3, 22],
  [1, 1, 3, 23],
  [2, 3, 25],
  [1, 2, 26],
  [2, 2, 27],

  [4, 28],
  [4, 29],
  [5, 29],
  [4, 30],
  [3, 31],

  [35],
  [2, 33],
  [1, 31, 1],
  [1, 1, 32, 1],
  [1, 1, 3, 7, 1],

  [1, 5, 6, 6, 7, 1],
  [2, 3, 4, 1, 1],
  [2, 3, 4, 1, 2],
  [4, 2, 2, 4, 1],
  [4, 2, 1, 2, 4, 2],

  [4, 2, 1, 2, 4, 2],
  [4, 2, 2, 2, 6],
  [5, 1, 6],
  [5, 1, 6],
  [5, 1, 6],

  [5, 4, 7],
  [6, 7],
  [6, 7],
  [6, 7],
  [7, 2, 7],

  [7, 6, 8],
  [8, 8],
  [8, 2, 9],
  [9, 9],
  [10, 10],

  [11, 11],
  [15, 14],
  [11, 5, 10],
  [11, 10],
  [11, 9],

  [13, 10],
  [10, 2, 2, 8],
  [10, 3, 2, 7],
  [8, 2, 2, 6],
  [10, 3, 7],
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
    -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, 1, 1, -1, -1, 1, 1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, 1, 1, -1, -1, 1, 1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, 1, 1, -1, -1, 1, 1, -1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, 1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, 1, 1, -1, -1, 1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1,
    -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1,
    -1, -1, -1, -1,
  ],
  [
    -1, -1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1,
    -1, -1, -1,
  ],
  [
    -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1,
    -1, -1, -1,
  ],
  [
    -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1,
    -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1,
    -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1,
    -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1,
    -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1,
    -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, 1, 1, 1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1,
    1, 1, 1, 1, -1, -1, 1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1,
    -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1,
    -1, -1, 1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1,
    1, 1, 1, -1, 1, -1, -1, 1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1,
    1, 1, 1, -1, 1, -1, 1, 1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, 1,
    1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1,
    1, 1, -1, -1, -1, 1, -1, -1, -1, -1,
  ],

  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, 1,
    1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1,
    1, -1, -1, 1, 1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, 1,
    1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1,
    1, -1, 1, 1, -1, -1, -1, -1, -1,
  ],

  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, 1,
    1, -1, -1, -1, 1, 1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1,
    1, 1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, -1, -1,
    -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1,
    1, 1, 1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, -1, -1,
    -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1,
    1, 1, 1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, -1, -1,
    -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1,
    1, 1, 1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, -1, -1,
    -1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1,
    1, 1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1,
    1, 1, 1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1,
    1, 1, 1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1,
    1, 1, 1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1,
    1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1,
    -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1,
    1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1,
    1, 1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1,
    -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1,
    -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    -1, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1,
    -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1,
    1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1,
    1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1,
    -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, 1,
    1, 1, -1, -1, -1, -1, -1, -1,
  ],
  [
    -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, 1, 1, 1, 1, 1, 1, 1,
  ],
];

// 완료 처리
function handleSolve() {
  // 이미지가 완료되었음을 나타내는 팝업 표시
  showPopupWithImage(
    "축하합니다!",
    '<img src="../nonogram/16.PNG" alt="Completed Image">'
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
    if (simpleBoxFlag == "row") {
      for (let i = 0; i < ROW_SIZE; ++i) {
        for (let j = 0; j < COL_SIZE; ++j) {
          if (pixelMap[i][j] == rows[i][j]) continue;
          pixelMap[i][j] = rows[i][j];
          const div = document.querySelector(".row" + i + "col" + j);
          const thumbnailDiv 