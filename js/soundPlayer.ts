const audio = document.getElementById("audio") as HTMLAudioElement;
const playPause = document.querySelector(".playPause") as HTMLButtonElement;
const totalTime = document.querySelector(".totalTime") as HTMLSpanElement;
const currentTime = document.querySelector(".currentTime") as HTMLSpanElement;
const surahTitle = document.querySelector(".surahTitle") as HTMLSpanElement;
const readerName = document.querySelector(".readerName") as HTMLSpanElement;
const surahSource = document.getElementById("surahSource") as HTMLSourceElement;
const prev = document.querySelector(".prev") as HTMLButtonElement;
const next = document.querySelector(".next") as HTMLButtonElement;

// Handlers
playPause?.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPause.firstElementChild?.getAttribute("src");
    playPause.firstElementChild?.setAttribute("src", "./assets/imgs/Pause.svg");
  } else {
    audio.pause();
    playPause.firstElementChild?.setAttribute("src", "./assets/imgs/Play.svg");
  }
});

// auto switch
audio.addEventListener("ended", function () {
  next.click();
});

next?.addEventListener("click", async () => {
  let id: string;
  let currentSurah = surahSource.getAttribute("src");
  let currentSurahString = currentSurah?.slice(-7).slice(0, -4);
  let currentSurahNumber = Number(currentSurahString);
  if (currentSurahNumber < 99 && currentSurahNumber > 9) {
    id = `0${currentSurahNumber + 1}`;
  } else if (currentSurahNumber < 9) {
    id = `00${currentSurahNumber + 1}`;
  } else if (currentSurahNumber == 114) {
    id = `001`;
  } else {
    id = `${currentSurahNumber + 1}`;
  }
  let x = await getQuran(id);
  surahSource.setAttribute("src", x);
  let y = await getSurahName(currentSurahNumber);
  surahTitle.textContent = `سورة ${y}`;
  audio.load();
});

prev?.addEventListener("click", async () => {
  let id: string;
  let currentSurah = surahSource.getAttribute("src");
  let currentSurahString = currentSurah?.slice(-7).slice(0, -4);
  let currentSurahNumber = Number(currentSurahString);
  if (currentSurahNumber < 99 && currentSurahNumber > 9) {
    id = `0${currentSurahNumber - 1}`;
  } else if (currentSurahNumber == 1) {
    id = `114`;
  } else if (currentSurahNumber < 9) {
    id = `00${currentSurahNumber - 1}`;
  } else {
    id = `${currentSurahNumber - 1}`;
  }
  let x = await getQuran(id);
  surahSource.setAttribute("src", x);
  let y = await getSurahName(Number(id) - 1);
  surahTitle.textContent = `سورة ${y}`;
  audio.load();
});
// Seconds counter
audio.addEventListener("timeupdate", function () {
  updateCurrentTime();
});
// Update total time for each surah
audio?.addEventListener("loadedmetadata", function () {
  updateTotalTime();
});

// Handlers functions 458.5481321
function updateTotalTime() {
  let hours: string | number = Math.floor(audio.duration / 3600);
  let minutes: string | number = Math.floor((audio.duration % 3600) / 60);
  let seconds: string | number = Math.floor((audio.duration % 3600) % 60);
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
  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60);
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  currentTime.textContent = `${minutes}:${formattedSeconds}`;
}

// Quran API Audio Fetch
async function getQuran(surahNo: string) {
  // Hussary
  let response = await fetch(
    "https://www.mp3quran.net/api/v3/reciters?language=ar&rewaya=1&reciter=118"
  );
  let data = await response.json();
  let serverLink = data.reciters[0].moshaf[0].server;
  // Select surah
  let surahAudio = serverLink + `${surahNo}.mp3`;
  return surahAudio;
}
// Surah Name Fetch
async function getSurahName(id: number) {
  let response = await fetch("https://mp3quran.net/api/v3/suwar?language=ar");
  let data = await response.json();
  let surahName = data.suwar[id].name;
  return surahName;
}
