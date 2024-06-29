const audio = document.getElementById("audio") as HTMLAudioElement;
const playPause = document.querySelector(".playPause") as HTMLButtonElement;
const totalTime = document.querySelector(".totalTime") as HTMLSpanElement;
const currentTime = document.querySelector(".currentTime") as HTMLSpanElement;
const surahTitle = document.querySelector(".surahTitle") as HTMLSpanElement;
const readerName = document.querySelector(".readerName") as HTMLSpanElement;
const prev = document.querySelector(".prev") as HTMLButtonElement;
const next = document.querySelector(".next") as HTMLButtonElement;

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

audio.addEventListener("timeupdate", function () {
  updateCurrentTime();
});
audio?.addEventListener("loadedmetadata", function () {
  updateTotalTime();
});
function updateTotalTime() {
  let minutes: string | number = Math.floor(audio.duration / 60);
  let seconds: string | number = Math.floor(audio.duration % 60);
  let hours: string | number = Math.floor(audio.duration / 3600);
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
