var audio = document.getElementById("audio");
var playPause = document.querySelector(".playPause");
var totalTime = document.querySelector(".totalTime");
var currentTime = document.querySelector(".currentTime");
var surahTitle = document.querySelector(".surahTitle");
var readerName = document.querySelector(".readerName");
var prev = document.querySelector(".prev");
var next = document.querySelector(".next");
playPause === null || playPause === void 0 ? void 0 : playPause.addEventListener("click", function () {
    var _a, _b, _c;
    if (audio.paused) {
        audio.play();
        (_a = playPause.firstElementChild) === null || _a === void 0 ? void 0 : _a.getAttribute("src");
        (_b = playPause.firstElementChild) === null || _b === void 0 ? void 0 : _b.setAttribute("src", "./assets/imgs/Pause.svg");
    }
    else {
        audio.pause();
        (_c = playPause.firstElementChild) === null || _c === void 0 ? void 0 : _c.setAttribute("src", "./assets/imgs/Play.svg");
    }
});
audio.addEventListener("timeupdate", function () {
    updateCurrentTime();
});
audio === null || audio === void 0 ? void 0 : audio.addEventListener("loadedmetadata", function () {
    updateTotalTime();
});
function updateTotalTime() {
    var minutes = Math.floor(audio.duration / 60);
    var seconds = Math.floor(audio.duration % 60);
    var hours = Math.floor(audio.duration / 3600);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    hours != 0
        ? (totalTime.innerHTML = hours + ":" + minutes + ":" + seconds)
        : (totalTime.innerHTML = minutes + ":" + seconds);
}
function updateCurrentTime() {
    var minutes = Math.floor(audio.currentTime / 60);
    var seconds = Math.floor(audio.currentTime % 60);
    var formattedSeconds = seconds < 10 ? "0".concat(seconds) : seconds;
    currentTime.textContent = "".concat(minutes, ":").concat(formattedSeconds);
}
