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
var search = document.getElementById("search");
var currentLocation = document.querySelector(".currentLocation");
var cityName = document.querySelector(".cityName");
var degNumber = document.querySelector(".degNumber");
var dayName = document.querySelector(".dayName");
var timeNow = document.querySelector(".timeNow");
var minDeg = document.querySelector(".minDeg");
var maxDeg = document.querySelector(".maxDeg");
var currentDay = document.querySelector(".currentDay .dayNo");
var prevDay1 = document.querySelector(".prevDay1 .dayNo ");
var prevDay2 = document.querySelector(".prevDay2 .dayNo ");
var prevDay3 = document.querySelector(".prevDay3 .dayNo ");
var nextDay1 = document.querySelector(".nextDay1 .dayNo ");
var nextDay2 = document.querySelector(".nextDay2 .dayNo ");
var nextDay3 = document.querySelector(".nextDay3 .dayNo ");
var currentDaymaxDTemp = document.querySelector(".currentDay .dayNo .maxDTemp");
var prevDay1maxDTemp = document.querySelector(".prevDay1 .dayNo .maxDTemp");
var prevDay2maxDTemp = document.querySelector(".prevDay2 .dayNo .maxDTemp");
var prevDay3maxDTemp = document.querySelector(".prevDay3 .dayNo .maxDTemp");
var nextDay1maxDTemp = document.querySelector(".nextDay1 .dayNo .maxDTemp");
var nextDay2maxDTemp = document.querySelector(".nextDay2 .dayNo .maxDTemp");
var nextDay3maxDTemp = document.querySelector(".nextDay3 .dayNo .maxDTemp");
var currentDayminDTemp = document.querySelector(".currentDay .dayNo .minDTemp");
var prevDay1minDTemp = document.querySelector(".prevDay1 .dayNo .minDTemp");
var prevDay2minDTemp = document.querySelector(".prevDay2 .dayNo .minDTemp");
var prevDay3minDTemp = document.querySelector(".prevDay3 .dayNo .minDTemp");
var nextDay1minDTemp = document.querySelector(".nextDay1 .dayNo .minDTemp");
var nextDay2minDTemp = document.querySelector(".nextDay2 .dayNo .minDTemp");
var nextDay3minDTemp = document.querySelector(".nextDay3 .dayNo .minDTemp");
var air = document.querySelector(".air");
var hum = document.querySelector(".hum");
var clouds = document.querySelector(".clouds");
var sunset = document.querySelector(".sunset");
var sunrise = document.querySelector(".sunrise");
var temperature = document.querySelector(".temperature");
var latitude;
var longitude;
// Today's Date
// Days names
// Function to get the day name for a given date
function getDayName(dateString) {
    var date = new Date(dateString);
    var options = { weekday: "long" };
    var formatter = new Intl.DateTimeFormat("ar-EG", options);
    return formatter.format(date);
}
// Click on the location button.
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            getWeatherbyLoc();
        });
    }
}
currentLocation === null || currentLocation === void 0 ? void 0 : currentLocation.addEventListener("click", getLocation);
function getWeatherbyLoc() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, location, current, condition, humidity, temp_c, wind_kph, name;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://api.weatherapi.com/v1/history.json?q=".concat(latitude, ",").concat(longitude, "&days=7"), {
                        method: "GET",
                        headers: {
                            key: "58d16ebc01b6449bae5143135230110",
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    location = data.location, current = data.current;
                    condition = current.condition, humidity = current.humidity, temp_c = current.temp_c, wind_kph = current.wind_kph;
                    name = location.name;
                    return [2 /*return*/];
            }
        });
    });
}
// search with inbut value
search.addEventListener("blur", function () {
    getWeatherbyName(search.value);
});
function getWeatherbyName(city) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, forecastRes, forecastData, location, current, heatindex_c, humidity, wind_kph, name, localtime, forecast, forecastday, days, daysTemp, arabicDays;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://api.weatherapi.com/v1/current.json?q=".concat(city, "&days=7"), {
                        method: "GET",
                        headers: {
                            key: "58d16ebc01b6449bae5143135230110",
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [4 /*yield*/, fetch("http://api.weatherapi.com/v1/forecast.json?q=".concat(city, "&days=4"), {
                            method: "GET",
                            headers: {
                                key: "58d16ebc01b6449bae5143135230110",
                            },
                        })];
                case 3: return [4 /*yield*/, _a.sent()];
                case 4:
                    forecastRes = _a.sent();
                    return [4 /*yield*/, forecastRes.json()];
                case 5:
                    forecastData = _a.sent();
                    location = data.location, current = data.current;
                    heatindex_c = current.heatindex_c, humidity = current.humidity, wind_kph = current.wind_kph;
                    name = location.name, localtime = location.localtime;
                    forecast = forecastData.forecast;
                    forecastday = forecast.forecastday;
                    days = [];
                    daysTemp = [];
                    forecastday.forEach(function (day) {
                        days.push(day.date);
                        daysTemp.push(day.day);
                        // const dateStr = '2024-07-03';
                        // const dayName = getDayName(dateStr);
                    });
                    arabicDays = days.reduce(function (acc, day) {
                        var ar = getDayName(day);
                        acc.push(ar);
                        return acc;
                    }, []);
                    currentDay === null || currentDay === void 0 ? void 0 : currentDay.textContent = arabicDays[0];
                    prevDay1 === null || prevDay1 === void 0 ? void 0 : prevDay1.textContent = arabicDays[1];
                    prevDay2 === null || prevDay2 === void 0 ? void 0 : prevDay2.textContent = arabicDays[2];
                    displayData(heatindex_c, humidity, wind_kph, name, localtime);
                    return [2 /*return*/];
            }
        });
    });
}
function displayData(heatindex_c, humidity, wind_kph, name, localtime) {
    degNumber.textContent = heatindex_c;
    hum.textContent = humidity;
    air.textContent = wind_kph;
    cityName.textContent = name;
    timeNow.textContent = localtime.slice(10);
}
function getHistory(startDate, endDate) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://api.weatherapi.com/v1/history.json?q=cairo&dt=".concat(startDate, "&end_dt=").concat(endDate), {
                        method: "GET",
                        headers: {
                            key: "58d16ebc01b6449bae5143135230110",
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    return [2 /*return*/];
            }
        });
    });
}
function getForecast() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://api.weatherapi.com/v1/forecast.json?q=cairo&days=3", {
                        method: "GET",
                        headers: {
                            keys: "58d16ebc01b6449bae5143135230110",
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    return [2 /*return*/];
            }
        });
    });
}
