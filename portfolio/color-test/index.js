var score; // 計分板
var level; // 關卡等級，同時也是每排方塊的數量
var winningTimesAtThislevel; // 在這個等級贏取的次數
var remainingTime; // 遊戲時間（秒）
var isPausing = false; // 暫停狀態

var containerElement = document.querySelector(".container");

tickingModule(); // 啟動計時功能
pausingModule(); // 啟動暫停功能
initialize();

// 初始化
function initialize() {
    if (score > 1) judgeLevel(level);
    score = 1;
    level = 2;
    winningTimesAtThislevel = 0;
    remainingTime = 60;
    createGame();
}

function createGame() {
    var specialTile = Math.floor(Math.random() * level ** 2);
    var gameboardElement = document.querySelector("#gameboard");
    var scoreElement = document.querySelector(".score > span");
    // 更新計分板與版面配置
    scoreElement.textContent = score;
    changeCSSVariables(score, level, getTileColor());
    // 創造一個含有特殊方塊的陣列並渲染至遊戲板
    gameboardElement.innerHTML = "";
    for (i = 0; i < level ** 2; i++) {
        i === specialTile
            ? (gameboardElement.innerHTML +=
                  '<div id="' + i + ' "class="tile special"></div>')
            : (gameboardElement.innerHTML +=
                  '<div id="' + i + ' "class="tile"></div>');
    }

    document.querySelectorAll(".tile").forEach(function (tileElement) {
        tileElement.addEventListener("click", function (e) {
            if (!isPausing) {
                Number(e.target.getAttribute("id")) === specialTile
                    ? win()
                    : isWarningModeActivated
                    ? alert("你再想一下！！！")
                    : initialize();
            }
        });
    });
}

// 🐔
function win() {
    score++;
    winningTimesAtThislevel++;
    winningTimesAtThislevel >= level - 1 ? updateLevel() : createGame();
}

// 更新關卡等級
function updateLevel() {
    level++;
    winningTimesAtThislevel = 0;
    createGame();
}

// 改變方塊顏色
function getTileColor() {
    return `rgb(${getRandomNumber()},${getRandomNumber()},${getRandomNumber()})`;
    function getRandomNumber() {
        return Math.floor(Math.random() * 200);
    }
}

// 改變 CSS 變數
function changeCSSVariables(score, level, tileColor) {
    var rootElement = document.querySelector(":root");
    if (score) rootElement.style.setProperty("--score", score);
    if (level) rootElement.style.setProperty("--level", level);
    if (tileColor) rootElement.style.setProperty("--tile-color", tileColor);
}

// 計時器功能
function tickingModule() {
    var timerElement = document.querySelector(".timer > span");
    timerElement.textContent = remainingTime;
    setInterval(function () {
        if (!isPausing) remainingTime--;
        timerElement.textContent = remainingTime;
        if (remainingTime <= 0) initialize();
    }, 1000);
}

// 暫停功能
function pausingModule() {
    document.querySelector(".pause-btn").addEventListener("click", function () {
        isPausing = !isPausing;
        isPausing
            ? containerElement.classList.add("pausing")
            : containerElement.classList.remove("pausing");
    });
}

// 限界など知らない！意味無い！
function judgeLevel(level) {
    var cpdLevel = [
        "🐁",
        "🦇",
        "🐠",
        "🦉",
        "🐬",
        "🐇",
        "🐈",
        "🐕",
        "🐎",
        "🐒",
        "🦍",
        "🦜",
        "🦅",
    ];
    alert(cpdLevel.slice(level, level + 1));
}

// 密技（並不是）
var userInput = "";
var isHardmodeActivated = false;
var isWarningModeActivated = false;

window.addEventListener("keydown", function (e) {
    userInput += e.key;
    if (/.*hardmode.*/i.test(userInput)) {
        isHardmodeActivated = !isHardmodeActivated;
        if (isHardmodeActivated) {
            alert("開啟困難模式。");
            containerElement.classList.add("windows-mode");
        } else {
            alert("關閉困難模式。");
            containerElement.classList.remove("windows-mode");
        }
        userInput = "";
    }
    if (/.*warning.*/i.test(userInput)) {
        isWarningModeActivated = !isWarningModeActivated;
        alert(`${isWarningModeActivated ? "開啟" : "關閉"}溫馨提醒模式。`);
        userInput = "";
    }
});
