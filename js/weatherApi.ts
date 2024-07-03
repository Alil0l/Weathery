const search = document.getElementById("search") as HTMLInputElement;
const currentLocation = document.querySelector(
  ".currentLocation"
) as HTMLButtonElement;
const cityName = document.querySelector(".cityName");
const degNumber = document.querySelector(".degNumber");
const dayName = document.querySelector(".dayName");
const timeNow = document.querySelector(".timeNow");
const minDeg = document.querySelector(".minDeg");
const maxDeg = document.querySelector(".maxDeg");
const currentDay = document.querySelector(".currentDay .dayNo");
const prevDay1 = document.querySelector(".prevDay1 .dayNo ");
const prevDay2 = document.querySelector(".prevDay2 .dayNo ");
const prevDay3 = document.querySelector(".prevDay3 .dayNo ");
const prevDay4 = document.querySelector(".prevDay4 .dayNo");
const nextDay1 = document.querySelector(".nextDay1 .dayNo ");
const nextDay2 = document.querySelector(".nextDay2 .dayNo ");
const currentDaymaxDTemp = document.querySelector(".currentDay .maxDTemp");
const prevDay1maxDTemp = document.querySelector(".prevDay1 .maxDTemp");
const prevDay2maxDTemp = document.querySelector(".prevDay2 .maxDTemp");
const prevDay3maxDTemp = document.querySelector(".prevDay3 .maxDTemp");
const prevDay4maxDTemp = document.querySelector(".prevDay4 .maxDTemp");
const nextDay1maxDTemp = document.querySelector(".nextDay1 .maxDTemp");
const nextDay2maxDTemp = document.querySelector(".nextDay2 .maxDTemp");
const currentDayminDTemp = document.querySelector(".currentDay .minDTemp");
const prevDay1minDTemp = document.querySelector(".prevDay1 .minDTemp");
const prevDay2minDTemp = document.querySelector(".prevDay2 .minDTemp");
const prevDay3minDTemp = document.querySelector(".prevDay3 .minDTemp");
const prevDay4minDTemp = document.querySelector(".prevDay4 .minDTemp");
const nextDay1minDTemp = document.querySelector(".nextDay1 .minDTemp");
const nextDay2minDTemp = document.querySelector(".nextDay2 .minDTemp");
const air = document.querySelector(".air");
const hum = document.querySelector(".hum");
const clouds = document.querySelector(".clouds");
const sunset = document.querySelector(".sunset");
const sunrise = document.querySelector(".sunrise");
const temperature = document.querySelector(".temperature") as HTMLSpanElement;
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

function subtractDays(date, days) {
  function formatDate(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return formatDate(result);
}
// Click on the location button.
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      getWeatherbyLoc(latitude, longitude);
    });
  }
}
currentLocation?.addEventListener("click", getLocation);

async function getWeatherbyLoc(latitude, longitude) {
  let response = await fetch(
    `http://api.weatherapi.com/v1/current.json?q=${latitude},${longitude}&days=7`,
    {
      method: "GET",
      headers: {
        key: "58d16ebc01b6449bae5143135230110",
      },
    }
  );
  let data = await response.json();

  // Handle the data here
  let {
    location: { name, localtime },
    current: { heatindex_c, humidity, wind_kph },
  } = data;
  // forecast data
  let forecastRes = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?q=${name}&days=4`,
    {
      method: "GET",
      headers: {
        key: "58d16ebc01b6449bae5143135230110",
      },
    }
  );
  // forecast
  let forecastData = await forecastRes.json();
  let {
    forecast: { forecastday },
  } = forecastData;
  let forecastValues = extractDays(forecastday);
  let { arabicDays, daysTemp, astro } = forecastValues;

  currentDay!.textContent = arabicDays[0];
  currentDayminDTemp!.textContent = `${Math.ceil(
    Number(daysTemp[0].mintemp_c)
  )} C°`;

  minDeg!.textContent = `${Math.ceil(Number(daysTemp[0].mintemp_c))} C°`;
  currentDaymaxDTemp!.textContent = `${Math.ceil(
    Number(daysTemp[0].maxtemp_c)
  )} C°`;
  maxDeg!.textContent = `${Math.ceil(Number(daysTemp[0].maxtemp_c))} C°`;
  nextDay1!.textContent = arabicDays[1];
  nextDay1maxDTemp!.textContent = `${Math.ceil(
    Number(daysTemp[1].maxtemp_c)
  )} C°`;
  nextDay1minDTemp!.textContent = `${Math.ceil(
    Number(daysTemp[1].mintemp_c)
  )} C°`;
  nextDay2!.textContent = arabicDays[2];
  nextDay2maxDTemp!.textContent = `${Math.ceil(
    Number(daysTemp[2].maxtemp_c)
  )} C°`;
  nextDay2minDTemp!.textContent = `${Math.ceil(
    Number(daysTemp[2].mintemp_c)
  )} C°`;
  temperature!.textContent = `${Math.round(
    (Number(daysTemp[0].mintemp_c) + Number(daysTemp[0].maxtemp_c)) / 2
  )} C°`;
  sunrise!.textContent = astro[0].sunrise;
  sunset!.textContent = astro[0].sunset;

  displayData(heatindex_c, humidity, wind_kph, name, localtime);
  // history dataa
  let subdays = subtractDays(forecastday[0].date, 4);
  let hist = await getHistory(name, subdays, forecastday[0].date);
  let historyValues = extractDays(hist.forecast.forecastday);
  // display the rest of the days
  prevDay4!.textContent = historyValues.arabicDays[0];
  prevDay4maxDTemp!.textContent = `${Math.ceil(
    Number(historyValues.daysTemp[0].maxtemp_c)
  )} C°`;
  prevDay4minDTemp!.textContent = `${Math.ceil(
    Number(historyValues.daysTemp[0].mintemp_c)
  )} C°`;
  prevDay3!.textContent = historyValues.arabicDays[1];
  prevDay3maxDTemp!.textContent = `${Math.ceil(
    Number(historyValues.daysTemp[1].maxtemp_c)
  )} C°`;
  prevDay3minDTemp!.textContent = `${Math.ceil(
    Number(historyValues.daysTemp[1].mintemp_c)
  )} C°`;
  prevDay2!.textContent = historyValues.arabicDays[2];
  prevDay2maxDTemp!.textContent = `${Math.ceil(
    Number(historyValues.daysTemp[2].maxtemp_c)
  )} C°`;
  prevDay2minDTemp!.textContent = `${Math.ceil(
    Number(historyValues.daysTemp[2].mintemp_c)
  )} C°`;
  prevDay1!.textContent = historyValues.arabicDays[3];
  prevDay1maxDTemp!.textContent = `${Math.ceil(
    Number(historyValues.daysTemp[3].maxtemp_c)
  )} C°`;
  prevDay1minDTemp!.textContent = `${Math.ceil(
    Number(historyValues.daysTemp[3].mintemp_c)
  )} C°`;
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
  // forecast data
  let forecastRes = await fetch(
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
  let {
    location: { name, localtime },
    current: { heatindex_c, humidity, wind_kph },
  } = data;
  // forecast
  let {
    forecast: { forecastday },
  } = forecastData;
  let forecastValues = extractDays(forecastday);
  let { arabicDays, daysTemp, astro } = forecastValues;

  currentDay!.textContent = arabicDays[0];
  currentDayminDTemp!.textContent = `${Math.ceil(
    Number(daysTemp[0].mintemp_c)
  )} C°`;

  minDeg!.textContent = `${Math.ceil(Number(daysTemp[0].mintemp_c))} C°`;
  currentDaymaxDTemp!.textContent = `${Math.ceil(
    Number(daysTemp[0].maxtemp_c)
  )} C°`;
  maxDeg!.textContent = `${Math.ceil(Number(daysTemp[0].maxtemp_c))} C°`;
  nextDay1!.textContent = arabicDays[1];
  nextDay1maxDTemp!.textContent = `${Math.ceil(
    Number(daysTemp[1].maxtemp_c)
  )} C°`;
  nextDay1minDTemp!.textContent = `${Math.ceil(
    Number(daysTemp[1].mintemp_c)
  )} C°`;
  nextDay2!.textContent = arabicDays[2];
  nextDay2maxDTemp!.textContent = `${Math.ceil(
    Number(daysTemp[2].maxtemp_c)
  )} C°`;
  nextDay2minDTemp!.textContent = `${Math.ceil(
    Number(daysTemp[2].mintemp_c)
  )} C°`;
  temperature!.textContent = `${Math.round(
    (Number(daysTemp[0].mintemp_c) + Number(daysTemp[0].maxtemp_c)) / 2
  )} C°`;
  sunrise!.textContent = astro[0].sunrise;
  sunset!.textContent = astro[0].sunset;

  displayData(heatindex_c, humidity, wind_kph, name, localtime);
  // history dataa
  let subdays = subtractDays(forecastday[0].date, 4);
  let hist = await getHistory(city, subdays, forecastday[0].date);
  let historyValues = extractDays(hist.forecast.forecastday);
  // display the rest of the days
  prevDay4!.textContent = historyValues.arabicDays[0];
  prevDay4maxDTemp!.textContent = `${Math.ceil(
    Number(historyValues.daysTemp[0].maxtemp_c)
  )} C°`;
  prevDay4minDTemp!.textContent = `${Math.ceil(
    Number(historyValues.daysTemp[0].mintemp_c)
  )} C°`;
  prevDay3!.textContent = historyValues.arabicDays[1];
  prevDay3maxDTemp!.textContent = `${Math.ceil(
    Number(historyValues.daysTemp[1].maxtemp_c)
  )} C°`;
  prevDay3minDTemp!.textContent = `${Math.ceil(
    Number(historyValues.daysTemp[1].mintemp_c)
  )} C°`;
  prevDay2!.textContent = historyValues.arabicDays[2];
  prevDay2maxDTemp!.textContent = `${Math.ceil(
    Number(historyValues.daysTemp[2].maxtemp_c)
  )} C°`;
  prevDay2minDTemp!.textContent = `${Math.ceil(
    Number(historyValues.daysTemp[2].mintemp_c)
  )} C°`;
  prevDay1!.textContent = historyValues.arabicDays[3];
  prevDay1maxDTemp!.textContent = `${Math.ceil(
    Number(historyValues.daysTemp[3].maxtemp_c)
  )} C°`;
  prevDay1minDTemp!.textContent = `${Math.ceil(
    Number(historyValues.daysTemp[3].mintemp_c)
  )} C°`;
}

function extractDays(forecastday) {
  let days = [];
  let daysTemp = [];
  let astro = [];
  let temp = [];
  let arabicDays = [];

  forecastday.forEach((day) => {
    days.push(day.date);
    daysTemp.push(day.day);
    astro.push(day.astro);
  });
  arabicDays = days.reduce((acc, day) => {
    // const dateStr = '2024-07-03';
    // const dayName = getDayName(dateStr);
    let ar = getDayName(day);
    acc.push(ar);
    return acc;
  }, []);

  // daysTemp.reduce((acc,dayTemp)=>{
  // acc.max = dayTemp
  // },{})

  return { arabicDays, daysTemp, astro };
}

function displayData(heatindex_c, humidity, wind_kph, name, localtime) {
  degNumber!.textContent = heatindex_c;
  hum!.textContent = `${humidity} %`;
  air!.textContent = `${wind_kph} kph`;
  cityName!.textContent = name;
  timeNow!.textContent = localtime.slice(10);
}

async function getHistory(city, startDate, endDate) {
  let response = await fetch(
    `http://api.weatherapi.com/v1/history.json?q=${city}&dt=${startDate}&end_dt=${endDate}`,
    {
      method: "GET",
      headers: {
        key: "58d16ebc01b6449bae5143135230110",
      },
    }
  );
  let data = await response.json();
  // Handle the data here
  return data;
}
// async function getForecast() {
//   let response = await fetch(
//     "http://api.weatherapi.com/v1/forecast.json?q=cairo&days=3",
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
