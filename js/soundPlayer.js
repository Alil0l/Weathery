var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var audio = document.getElementById("audio");
var playPause = document.querySelector(".playPause");
var totalTime = document.querySelector(".totalTime");
var currentTime = document.querySelector(".currentTime");
var surahTitle = document.querySelector(".surahTitle");
var readerName = document.querySelector(".readerName");
var surahSource = document.getElementById("surahSource");
var prev = document.querySelector(".prev");
var next = document.querySelector(".next");
// Handlers
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
// auto switch
audio.addEventListener("ended", function () {
    next.click();
});
next === null || next === void 0 ? void 0 : next.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    var id, currentSurah, currentSurahString, currentSurahNumber, x, y;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentSurah = surahSource.getAttribute("src");
                currentSurahString = currentSurah === null || currentSurah === void 0 ? void 0 : currentSurah.slice(-7).slice(0, -4);
                currentSurahNumber = Number(currentSurahString);
                if (currentSurahNumber < 99 && currentSurahNumber > 9) {
                    id = "0".concat(currentSurahNumber + 1);
                }
                else if (currentSurahNumber < 9) {
                    id = "00".concat(currentSurahNumber + 1);
                }
                else if (currentSurahNumber == 114) {
                    id = "001";
                }
                else {
                    id = "".concat(currentSurahNumber + 1);
                }
                return [4 /*yield*/, getQuran(id)];
            case 1:
                x = _a.sent();
                surahSource.setAttribute("src", x);
                return [4 /*yield*/, getSurahName(currentSurahNumber)];
            case 2:
                y = _a.sent();
                surahTitle.textContent = "\u0633\u0648\u0631\u0629 ".concat(y);
                audio.load();
                return [2 /*return*/];
        }
    });
}); });
prev === null || prev === void 0 ? void 0 : prev.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    var id, currentSurah, currentSurahString, currentSurahNumber, x, y;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentSurah = surahSource.getAttribute("src");
                currentSurahString = currentSurah === null || currentSurah === void 0 ? void 0 : currentSurah.slice(-7).slice(0, -4);
                currentSurahNumber = Number(currentSurahString);
                if (currentSurahNumber < 99 && currentSurahNumber > 9) {
                    id = "0".concat(currentSurahNumber - 1);
                }
                else if (currentSurahNumber == 1) {
                    id = "114";
                }
                else if (currentSurahNumber < 9) {
                    id = "00".concat(currentSurahNumber - 1);
                }
                else {
                    id = "".concat(currentSurahNumber - 1);
                }
                return [4 /*yield*/, getQuran(id)];
            case 1:
                x = _a.sent();
                surahSource.setAttribute("src", x);
                return [4 /*yield*/, getSurahName(Number(id) - 1)];
            case 2:
                y = _a.sent();
                surahTitle.textContent = "\u0633\u0648\u0631\u0629 ".concat(y);
                audio.load();
                return [2 /*return*/];
        }
    });
}); });
// Seconds counter
audio.addEventListener("timeupdate", function () {
    updateCurrentTime();
});
// Update total time for each surah
audio === null || audio === void 0 ? void 0 : audio.addEventListener("loadedmetadata", function () {
    updateTotalTime();
    audio.play();
});
// Handlers functions 458.5481321
function updateTotalTime() {
    var hours = Math.floor(audio.duration / 3600);
    var minutes = Math.floor((audio.duration % 3600) / 60);
    var seconds = Math.floor((audio.duration % 3600) % 60);
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
// Quran API Audio Fetch
function getQuran(surahNo) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, serverLink, surahAudio;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://www.mp3quran.net/api/v3/reciters?language=ar&rewaya=1&reciter=118")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    serverLink = data.reciters[0].moshaf[0].server;
                    surahAudio = serverLink + "".concat(surahNo, ".mp3");
                    return [2 /*return*/, surahAudio];
            }
        });
    });
}
// Surah Name Fetch
function getSurahName(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, surahName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://mp3quran.net/api/v3/suwar?language=ar")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    surahName = data.suwar[id].name;
                    return [2 /*return*/, surahName];
            }
        });
    });
}
