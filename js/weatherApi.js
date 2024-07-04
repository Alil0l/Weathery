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
var prevDay4 = document.querySelector(".prevDay4 .dayNo");
var nextDay1 = document.querySelector(".nextDay1 .dayNo ");
var nextDay2 = document.querySelector(".nextDay2 .dayNo ");
var currentDaymaxDTemp = document.querySelector(".currentDay .maxDTemp");
var prevDay1maxDTemp = document.querySelector(".prevDay1 .maxDTemp");
var prevDay2maxDTemp = document.querySelector(".prevDay2 .maxDTemp");
var prevDay3maxDTemp = document.querySelector(".prevDay3 .maxDTemp");
var prevDay4maxDTemp = document.querySelector(".prevDay4 .maxDTemp");
var nextDay1maxDTemp = document.querySelector(".nextDay1 .maxDTemp");
var nextDay2maxDTemp = document.querySelector(".nextDay2 .maxDTemp");
var currentDayminDTemp = document.querySelector(".currentDay .minDTemp");
var prevDay1minDTemp = document.querySelector(".prevDay1 .minDTemp");
var prevDay2minDTemp = document.querySelector(".prevDay2 .minDTemp");
var prevDay3minDTemp = document.querySelector(".prevDay3 .minDTemp");
var prevDay4minDTemp = document.querySelector(".prevDay4 .minDTemp");
var nextDay1minDTemp = document.querySelector(".nextDay1 .minDTemp");
var nextDay2minDTemp = document.querySelector(".nextDay2 .minDTemp");
var air = document.querySelector(".air");
var hum = document.querySelector(".hum");
var clouds = document.querySelector(".clouds");
var sunset = document.querySelector(".sunset");
var sunrise = document.querySelector(".sunrise");
var temperature = document.querySelector(".temperature");
var weatherIcon = document.querySelector(".weatherIcon img");
// selecting icons
var currentDayIcon = document.querySelector(".currentDay img");
var prevDay1Icon = document.querySelector(".prevDay1 img ");
var prevDay2Icon = document.querySelector(".prevDay2 img ");
var prevDay3Icon = document.querySelector(".prevDay3 img ");
var prevDay4Icon = document.querySelector(".prevDay4 img");
var nextDay1Icon = document.querySelector(".nextDay1 img ");
var nextDay2Icon = document.querySelector(".nextDay2 img ");
var latitude;
var longitude;
var trig = false;
// Today's Date
// Days names
// Function to get the day name for a given date
function getDayName(dateString) {
    var date = new Date(dateString);
    var options = { weekday: "long" };
    var formatter = new Intl.DateTimeFormat("ar-EG", options);
    return formatter.format(date);
}
function subtractDays(date, days) {
    function formatDate(date) {
        var yyyy = date.getFullYear();
        var mm = String(date.getMonth() + 1).padStart(2, "0");
        var dd = String(date.getDate()).padStart(2, "0");
        return "".concat(yyyy, "-").concat(mm, "-").concat(dd);
    }
    var result = new Date(date);
    result.setDate(result.getDate() - days);
    return formatDate(result);
}
// Click on the location button.
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            getWeatherbyLoc(latitude, longitude);
        });
    }
}
currentLocation === null || currentLocation === void 0 ? void 0 : currentLocation.addEventListener("click", getLocation);
function getWeatherbyLoc(latitude, longitude) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, _a, name, localtime, _b, heatindex_c, humidity, wind_kph, text, forecastRes, forecastData, forecastday, forecastValues, arabicDays, daysTemp, astro, subdays, hist, historyValues;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    search.value = "";
                    return [4 /*yield*/, fetch("https://api.weatherapi.com/v1/current.json?q=".concat(latitude, ",").concat(longitude, "&days=7"), {
                            method: "GET",
                            headers: {
                                key: "58d16ebc01b6449bae5143135230110",
                            },
                        })];
                case 1:
                    response = _c.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _c.sent();
                    _a = data.location, name = _a.name, localtime = _a.localtime, _b = data.current, heatindex_c = _b.heatindex_c, humidity = _b.humidity, wind_kph = _b.wind_kph, text = _b.condition.text;
                    return [4 /*yield*/, fetch("https://api.weatherapi.com/v1/forecast.json?q=".concat(name, "&days=4"), {
                            method: "GET",
                            headers: {
                                key: "58d16ebc01b6449bae5143135230110",
                            },
                        })];
                case 3:
                    forecastRes = _c.sent();
                    return [4 /*yield*/, forecastRes.json()];
                case 4:
                    forecastData = _c.sent();
                    forecastday = forecastData.forecast.forecastday;
                    forecastValues = extractDays(forecastday);
                    arabicDays = forecastValues.arabicDays, daysTemp = forecastValues.daysTemp, astro = forecastValues.astro;
                    currentDay.textContent = arabicDays[0];
                    currentDayminDTemp.textContent = "".concat(Math.ceil(Number(daysTemp[0].mintemp_c)), " C\u00B0");
                    weatherIcon === null || weatherIcon === void 0 ? void 0 : weatherIcon.setAttribute("src", weatherIcons(daysTemp[0].condition.text));
                    currentDayIcon === null || currentDayIcon === void 0 ? void 0 : currentDayIcon.setAttribute("src", weatherIcons(daysTemp[0].condition.text));
                    minDeg.textContent = "".concat(Math.ceil(Number(daysTemp[0].mintemp_c)), " C\u00B0");
                    currentDaymaxDTemp.textContent = "".concat(Math.ceil(Number(daysTemp[0].maxtemp_c)), " C\u00B0");
                    maxDeg.textContent = "".concat(Math.ceil(Number(daysTemp[0].maxtemp_c)), " C\u00B0");
                    nextDay1Icon === null || nextDay1Icon === void 0 ? void 0 : nextDay1Icon.setAttribute("src", weatherIcons(daysTemp[1].condition.text));
                    nextDay1.textContent = arabicDays[1];
                    nextDay1maxDTemp.textContent = "".concat(Math.ceil(Number(daysTemp[1].maxtemp_c)), " C\u00B0");
                    nextDay1minDTemp.textContent = "".concat(Math.ceil(Number(daysTemp[1].mintemp_c)), " C\u00B0");
                    nextDay2Icon === null || nextDay2Icon === void 0 ? void 0 : nextDay2Icon.setAttribute("src", weatherIcons(daysTemp[2].condition.text));
                    nextDay2.textContent = arabicDays[2];
                    nextDay2maxDTemp.textContent = "".concat(Math.ceil(Number(daysTemp[2].maxtemp_c)), " C\u00B0");
                    nextDay2minDTemp.textContent = "".concat(Math.ceil(Number(daysTemp[2].mintemp_c)), " C\u00B0");
                    temperature.textContent = "".concat(Math.round((Number(daysTemp[0].mintemp_c) + Number(daysTemp[0].maxtemp_c)) / 2), " C\u00B0");
                    sunrise.textContent = astro[0].sunrise;
                    sunset.textContent = astro[0].sunset;
                    displayData(heatindex_c, humidity, wind_kph, name, localtime);
                    subdays = subtractDays(forecastday[0].date, 4);
                    return [4 /*yield*/, getHistory(name, subdays, forecastday[0].date)];
                case 5:
                    hist = _c.sent();
                    historyValues = extractDays(hist.forecast.forecastday);
                    // display the rest of the days
                    prevDay4.textContent = historyValues.arabicDays[0];
                    prevDay4Icon === null || prevDay4Icon === void 0 ? void 0 : prevDay4Icon.setAttribute("src", weatherIcons(historyValues.daysTemp[0].condition.text));
                    prevDay4maxDTemp.textContent = "".concat(Math.ceil(Number(historyValues.daysTemp[0].maxtemp_c)), " C\u00B0");
                    prevDay4minDTemp.textContent = "".concat(Math.ceil(Number(historyValues.daysTemp[0].mintemp_c)), " C\u00B0");
                    prevDay3.textContent = historyValues.arabicDays[1];
                    prevDay3Icon === null || prevDay3Icon === void 0 ? void 0 : prevDay3Icon.setAttribute("src", weatherIcons(historyValues.daysTemp[1].condition.text));
                    prevDay3maxDTemp.textContent = "".concat(Math.ceil(Number(historyValues.daysTemp[1].maxtemp_c)), " C\u00B0");
                    prevDay3minDTemp.textContent = "".concat(Math.ceil(Number(historyValues.daysTemp[1].mintemp_c)), " C\u00B0");
                    prevDay2.textContent = historyValues.arabicDays[2];
                    prevDay2Icon === null || prevDay2Icon === void 0 ? void 0 : prevDay2Icon.setAttribute("src", weatherIcons(historyValues.daysTemp[2].condition.text));
                    prevDay2maxDTemp.textContent = "".concat(Math.ceil(Number(historyValues.daysTemp[2].maxtemp_c)), " C\u00B0");
                    prevDay2minDTemp.textContent = "".concat(Math.ceil(Number(historyValues.daysTemp[2].mintemp_c)), " C\u00B0");
                    prevDay1.textContent = historyValues.arabicDays[3];
                    prevDay1Icon === null || prevDay1Icon === void 0 ? void 0 : prevDay1Icon.setAttribute("src", weatherIcons(historyValues.daysTemp[3].condition.text));
                    prevDay1maxDTemp.textContent = "".concat(Math.ceil(Number(historyValues.daysTemp[3].maxtemp_c)), " C\u00B0");
                    prevDay1minDTemp.textContent = "".concat(Math.ceil(Number(historyValues.daysTemp[3].mintemp_c)), " C\u00B0");
                    return [2 /*return*/];
            }
        });
    });
}
function eventHandler() {
    var temp = search.value;
    getWeatherbyName(temp);
    search.value = "";
    trig = false;
}
// search with inbut value
search.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
        if (trig == false) {
            trig = true;
            eventHandler();
        }
    }
});
search.addEventListener("blur", function () {
    if (trig == false) {
        trig = true;
        eventHandler();
    }
});
function getWeatherbyName(city) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, forecastRes, forecastData, _a, name, localtime, _b, heatindex_c, humidity, wind_kph, forecastday, forecastValues, arabicDays, daysTemp, astro, subdays, hist, historyValues;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, fetch("https://api.weatherapi.com/v1/current.json?q=".concat(city, "&days=7"), {
                        method: "GET",
                        headers: {
                            key: "58d16ebc01b6449bae5143135230110",
                        },
                    })];
                case 1:
                    response = _c.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _c.sent();
                    return [4 /*yield*/, fetch("https://api.weatherapi.com/v1/forecast.json?q=".concat(city, "&days=4"), {
                            method: "GET",
                            headers: {
                                key: "58d16ebc01b6449bae5143135230110",
                            },
                        })];
                case 3:
                    forecastRes = _c.sent();
                    return [4 /*yield*/, forecastRes.json()];
                case 4:
                    forecastData = _c.sent();
                    _a = data.location, name = _a.name, localtime = _a.localtime, _b = data.current, heatindex_c = _b.heatindex_c, humidity = _b.humidity, wind_kph = _b.wind_kph;
                    forecastday = forecastData.forecast.forecastday;
                    forecastValues = extractDays(forecastday);
                    arabicDays = forecastValues.arabicDays, daysTemp = forecastValues.daysTemp, astro = forecastValues.astro;
                    currentDay.textContent = arabicDays[0];
                    currentDayminDTemp.textContent = "".concat(Math.ceil(Number(daysTemp[0].mintemp_c)), " C\u00B0");
                    weatherIcon === null || weatherIcon === void 0 ? void 0 : weatherIcon.setAttribute("src", weatherIcons(daysTemp[0].condition.text));
                    currentDayIcon === null || currentDayIcon === void 0 ? void 0 : currentDayIcon.setAttribute("src", weatherIcons(daysTemp[0].condition.text));
                    minDeg.textContent = "".concat(Math.ceil(Number(daysTemp[0].mintemp_c)), " C\u00B0");
                    currentDaymaxDTemp.textContent = "".concat(Math.ceil(Number(daysTemp[0].maxtemp_c)), " C\u00B0");
                    maxDeg.textContent = "".concat(Math.ceil(Number(daysTemp[0].maxtemp_c)), " C\u00B0");
                    nextDay1Icon === null || nextDay1Icon === void 0 ? void 0 : nextDay1Icon.setAttribute("src", weatherIcons(daysTemp[1].condition.text));
                    nextDay1.textContent = arabicDays[1];
                    nextDay1maxDTemp.textContent = "".concat(Math.ceil(Number(daysTemp[1].maxtemp_c)), " C\u00B0");
                    nextDay1minDTemp.textContent = "".concat(Math.ceil(Number(daysTemp[1].mintemp_c)), " C\u00B0");
                    nextDay2Icon === null || nextDay2Icon === void 0 ? void 0 : nextDay2Icon.setAttribute("src", weatherIcons(daysTemp[2].condition.text));
                    nextDay2.textContent = arabicDays[2];
                    nextDay2maxDTemp.textContent = "".concat(Math.ceil(Number(daysTemp[2].maxtemp_c)), " C\u00B0");
                    nextDay2minDTemp.textContent = "".concat(Math.ceil(Number(daysTemp[2].mintemp_c)), " C\u00B0");
                    temperature.textContent = "".concat(Math.round((Number(daysTemp[0].mintemp_c) + Number(daysTemp[0].maxtemp_c)) / 2), " C\u00B0");
                    sunrise.textContent = astro[0].sunrise;
                    sunset.textContent = astro[0].sunset;
                    displayData(heatindex_c, humidity, wind_kph, name, localtime);
                    subdays = subtractDays(forecastday[0].date, 4);
                    return [4 /*yield*/, getHistory(city, subdays, forecastday[0].date)];
                case 5:
                    hist = _c.sent();
                    historyValues = extractDays(hist.forecast.forecastday);
                    // display the rest of the days
                    prevDay4.textContent = historyValues.arabicDays[0];
                    prevDay4Icon === null || prevDay4Icon === void 0 ? void 0 : prevDay4Icon.setAttribute("src", weatherIcons(historyValues.daysTemp[0].condition.text));
                    prevDay4maxDTemp.textContent = "".concat(Math.ceil(Number(historyValues.daysTemp[0].maxtemp_c)), " C\u00B0");
                    prevDay4minDTemp.textContent = "".concat(Math.ceil(Number(historyValues.daysTemp[0].mintemp_c)), " C\u00B0");
                    prevDay3.textContent = historyValues.arabicDays[1];
                    prevDay3Icon === null || prevDay3Icon === void 0 ? void 0 : prevDay3Icon.setAttribute("src", weatherIcons(historyValues.daysTemp[1].condition.text));
                    prevDay3maxDTemp.textContent = "".concat(Math.ceil(Number(historyValues.daysTemp[1].maxtemp_c)), " C\u00B0");
                    prevDay3minDTemp.textContent = "".concat(Math.ceil(Number(historyValues.daysTemp[1].mintemp_c)), " C\u00B0");
                    prevDay2.textContent = historyValues.arabicDays[2];
                    prevDay2Icon === null || prevDay2Icon === void 0 ? void 0 : prevDay2Icon.setAttribute("src", weatherIcons(historyValues.daysTemp[2].condition.text));
                    prevDay2maxDTemp.textContent = "".concat(Math.ceil(Number(historyValues.daysTemp[2].maxtemp_c)), " C\u00B0");
                    prevDay2minDTemp.textContent = "".concat(Math.ceil(Number(historyValues.daysTemp[2].mintemp_c)), " C\u00B0");
                    prevDay1.textContent = historyValues.arabicDays[3];
                    prevDay1Icon === null || prevDay1Icon === void 0 ? void 0 : prevDay1Icon.setAttribute("src", weatherIcons(historyValues.daysTemp[3].condition.text));
                    prevDay1maxDTemp.textContent = "".concat(Math.ceil(Number(historyValues.daysTemp[3].maxtemp_c)), " C\u00B0");
                    prevDay1minDTemp.textContent = "".concat(Math.ceil(Number(historyValues.daysTemp[3].mintemp_c)), " C\u00B0");
                    return [2 /*return*/];
            }
        });
    });
}
function extractDays(forecastday) {
    var days = [];
    var daysTemp = [];
    var astro = [];
    var arabicDays = [];
    forecastday.forEach(function (day) {
        days.push(day.date);
        daysTemp.push(day.day);
        astro.push(day.astro);
    });
    arabicDays = days.reduce(function (acc, day) {
        // const dateStr = '2024-07-03';
        // const dayName = getDayName(dateStr);
        var ar = getDayName(day);
        acc.push(ar);
        return acc;
    }, []);
    // daysTemp.reduce((acc,dayTemp)=>{
    // acc.max = dayTemp
    // },{})
    return { arabicDays: arabicDays, daysTemp: daysTemp, astro: astro };
}
function displayData(heatindex_c, humidity, wind_kph, name, localtime) {
    degNumber.textContent = heatindex_c;
    hum.textContent = "".concat(humidity, " %");
    air.textContent = "".concat(wind_kph, " kph");
    cityName.textContent = name;
    timeNow.textContent = localtime.slice(10);
}
function getHistory(city, startDate, endDate) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://api.weatherapi.com/v1/history.json?q=".concat(city, "&dt=").concat(startDate, "&end_dt=").concat(endDate), {
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
                    // Handle the data here
                    return [2 /*return*/, data];
            }
        });
    });
}
// async function getForecast() {
//   let response = await fetch(
//     "https://api.weatherapi.com/v1/forecast.json?q=cairo&days=3",
//     {
//       method: "GET",
//       headers: {
//         keys: "58d16ebc01b6449bae5143135230110",
//       },
//     }
//   );
//   let data = await response.json();
//   console.log(data);
// }
// weather coniditions and icons
/*
Sunny
Partly Cloudy
Cloudy
Overcast
Patchy rain nearby / Patchy light rain
Patchy snow nearby / Blowing snow /Blizzard / Heavy freezing drizzle
Thundery outbreaks in nearby
*/
// handle weather icons
function weatherIcons(cond) {
    var condition = cond.toLowerCase();
    if (condition.includes("sun")) {
        return "./../assets/imgs/Sun.png";
    }
    else if (condition.includes("snow")) {
        return "./../assets/imgs/Snow.png";
    }
    else if (condition.includes("rain")) {
        return "./../assets/imgs/Rain.png";
    }
    else if (condition.includes("cloud")) {
        return "./../assets/imgs/Clouds.png";
    }
    else {
        return "./../assets/imgs/Sky.png";
    }
}
