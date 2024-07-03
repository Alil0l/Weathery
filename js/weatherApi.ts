const search = document.getElementById("search") as HTMLInputElement;
const currentLocation = document.querySelector(
  ".currentLocation"
) as HTMLButtonElement;
let cityName = document.querySelector(".cityName");
let degNumber = document.querySelector(".degNumber");
let dayName = document.querySelector(".dayName");
let timeNow = document.querySelector(".timeNow");
let minDeg = document.querySelector(".minDeg");
let maxDeg = document.querySelector(".maxDeg");
let currentDay = document.querySelector(".currentDay .dayNo");
let prevDay1 = document.querySelector(".prevDay1 .dayNo ");
let prevDay2 = document.querySelector(".prevDay2 .dayNo ");
let prevDay3 = document.querySelector(".prevDay3 .dayNo ");
let nextDay1 = document.querySelector(".nextDay1 .dayNo ");
let nextDay2 = document.querySelector(".nextDay2 .dayNo ");
let nextDay3 = document.querySelector(".nextDay3 .dayNo ");
let currentDaymaxDTemp = document.querySelector(".currentDay .dayNo .maxDTemp");
let prevDay1maxDTemp = document.querySelector(".prevDay1 .dayNo .maxDTemp");
let prevDay2maxDTemp = document.querySelector(".prevDay2 .dayNo .maxDTemp");
let prevDay3maxDTemp = document.querySelector(".prevDay3 .dayNo .maxDTemp");
let nextDay1maxDTemp = document.querySelector(".nextDay1 .dayNo .maxDTemp");
let nextDay2maxDTemp = document.querySelector(".nextDay2 .dayNo .maxDTemp");
let nextDay3maxDTemp = document.querySelector(".nextDay3 .dayNo .maxDTemp");
let currentDayminDTemp = document.querySelector(".currentDay .dayNo .minDTemp");
let prevDay1minDTemp = document.querySelector(".prevDay1 .dayNo .minDTemp");
let prevDay2minDTemp = document.querySelector(".prevDay2 .dayNo .minDTemp");
let prevDay3minDTemp = document.querySelector(".prevDay3 .dayNo .minDTemp");
let nextDay1minDTemp = document.querySelector(".nextDay1 .dayNo .minDTemp");
let nextDay2minDTemp = document.querySelector(".nextDay2 .dayNo .minDTemp");
let nextDay3minDTemp = document.querySelector(".nextDay3 .dayNo .minDTemp");
let air = document.querySelector(".air");
let hum = document.querySelector(".hum");
let clouds = document.querySelector(".clouds");
let sunset = document.querySelector(".sunset");
let sunrise = document.querySelector(".sunrise");
let temperature = document.querySelector(".temperature") as HTMLSpanElement;
let latitude: number;
let longitude: number;

// Today's Date
// Days names
// Function to get the day name for a given date
function getDayName(dateString) {
  const date = new Date(dateString);
  const options = { weekday: "long" };
  const formatter = new Intl.DateTimeFormat("ar-EG", options);
  return formatter.format(date);
}

// Click on the location button.
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      getWeatherbyLoc();
    });
  }
}
currentLocation?.addEventListener("click", getLocation);

async function getWeatherbyLoc() {
  let response = await fetch(
    `http://api.weatherapi.com/v1/history.json?q=${latitude},${longitude}&days=7`,
    {
      method: "GET",
      headers: {
        key: "58d16ebc01b6449bae5143135230110",
      },
    }
  );
  let data = await response.json();
  console.log(data);
  // Handle the data here
  let { location, current } = data;
  let { condition, humidity, temp_c, wind_kph } = current;
  let { name } = location;
}

// search with inbut value
search.addEventListener("blur", () => {
  getWeatherbyName(search.value);
});

async function getWeatherbyName(city: string | number) {
  // current data
  let response = await fetch(
    `http://api.weatherapi.com/v1/current.json?q=${city}&days=7`,
    {
      method: "GET",
      headers: {
        key: "58d16ebc01b6449bae5143135230110",
      },
    }
  );
  let data = await response.json();
  let forecastRes = await await fetch(
    `http://api.weatherapi.com/v1/forecast.json?q=${city}&days=4`,
    {
      method: "GET",
      headers: {
        key: "58d16ebc01b6449bae5143135230110",
      },
    }
  );
  let forecastData = await forecastRes.json();
  // Handle the data here
  let { location, current } = data;
  let { heatindex_c, humidity, wind_kph } = current;
  let { name, localtime } = location;
  // forecast
  let { forecast } = forecastData;
  let { forecastday } = forecast;
  let days = [];
  let daysTemp = [];
  forecastday.forEach((day) => {
    days.push(day.date);
    daysTemp.push(day.day);
    // const dateStr = '2024-07-03';
    // const dayName = getDayName(dateStr);
  });
  let arabicDays = days.reduce((acc, day) => {
    let ar = getDayName(day);
    acc.push(ar);
    return acc;
  }, []);
  currentDay?.textContent = arabicDays[0];
  prevDay1?.textContent = arabicDays[1];
  prevDay2?.textContent = arabicDays[2];

  displayData(heatindex_c, humidity, wind_kph, name, localtime);
}

function displayData(heatindex_c, humidity, wind_kph, name, localtime) {
  degNumber!.textContent = heatindex_c;
  hum!.textContent = humidity;
  air!.textContent = wind_kph;
  cityName!.textContent = name;
  timeNow!.textContent = localtime.slice(10);
}

async function getHistory(startDate: number, endDate: number) {
  let response = await fetch(
    `http://api.weatherapi.com/v1/history.json?q=cairo&dt=${startDate}&end_dt=${endDate}`,
    {
      method: "GET",
      headers: {
        key: "58d16ebc01b6449bae5143135230110",
      },
    }
  );
  let data = await response.json();
  console.log(data);
  // Handle the data here
}

async function getForecast() {
  let response = await fetch(
    "http://api.weatherapi.com/v1/forecast.json?q=cairo&days=3",
    {
      method: "GET",
      headers: {
        keys: "58d16ebc01b6449bae5143135230110",
      },
    }
  );
  let data = await response.json();
  console.log(data);
}
