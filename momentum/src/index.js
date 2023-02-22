// import _ from "lodash";
import "./style.scss";
import "./index.html";
import playList from "./js/playList";

const API_KEY = "9cb594847a8332efc8a48a01c59a89de";
const getCurrentApiUrl = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=9cb594847a8332efc8a48a01c59a89de&units=metric`;

const body = document.querySelector(".body");
const time = document.querySelector(".time");
const todayDate = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const input = document.querySelector(".name");
const prevSlider = document.querySelector(".slide-prev");
const nextSlider = document.querySelector(".slide-next");
const quoteText = document.querySelector(".quote");
const quoteAuthor = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const weatherIcon = document.querySelector(".weather-icon");
const cityInput = document.querySelector(".city");
const playBtn = document.querySelector(".play");
const playNext = document.querySelector(".play-next");
const playPrev = document.querySelector(".play-prev");
const playListContainer = document.querySelector(".play-list");
const playItem = document.querySelector(".play-item");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const timeDurationProgress = document.querySelector(".time-progress");
const timeDuration = document.querySelector(".time-duration");
const volumeSound = document.querySelector(".volume-sound");
const volumeSlider = document.querySelector(".volume-progress-container");
const volumeProgress = document.querySelector(".volume-progress");

// console.log(playListContainer);
const quotes = "https://type.fit/api/quotes";

const monthes = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dayTime = ["night", "morning", "afternoon", "evening"];

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
  setTimeout(getCurrentDate, 1000);
  setTimeout(showGreeting, 1000);
}
showTime();

function getCurrentDate() {
  const date = new Date();
  const weekdayNumber = date.getDay();
  const weekday = week[weekdayNumber];
  const monthNumber = date.getMonth().toString();
  const month = monthes[monthNumber];
  const day = date.getDate();
  todayDate.innerHTML = `${weekday}, ${month} ${day}`;
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  greeting.innerHTML = `Good ${timeOfDay},`;
}

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 0 && hours < 6) {
    return dayTime[0];
  } else if (hours >= 6 && hours < 12) {
    return dayTime[1];
  } else if (hours >= 12 && hours < 18) {
    return dayTime[2];
  } else if (hours >= 18 && hours < 24) {
    return dayTime[3];
  }
}

function setLocalStorage() {
  localStorage.setItem("name", input.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    input.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);

function getRandomNum() {
  const random = Math.ceil(Math.random() * 20)
    .toString()
    .padStart(2, "0");
  return random;
}

let bgNum = getRandomNum();

function setBg() {
  const timeOfDay = getTimeOfDay();
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/1zemzem/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url("https://raw.githubusercontent.com/1zemzem/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg")`;
  };
  // setTimeout(setBg, 500);
}
setBg();

function getSlideNext() {
  bgNum = +bgNum;
  if (bgNum < 20) {
    bgNum = (bgNum + 1).toString().padStart(2, "0");
  } else if (bgNum == 20) {
    bgNum = "1".padStart(2, "0");
  }
  setBg(bgNum);
}

function getSlidePrev() {
  bgNum = +bgNum;
  if (bgNum > 1) {
    bgNum = (bgNum - 1).toString().padStart(2, "0");
  } else if (bgNum == 1) {
    bgNum = "20";
  }
  setBg(bgNum);
}

prevSlider.addEventListener("click", getSlidePrev);
nextSlider.addEventListener("click", getSlideNext);

function getRandomNumQuota() {
  const random = Math.ceil(Math.random() * 1000)
    .toString()
    .padStart(2, "0");
  return random;
}

let quotaNum = getRandomNumQuota();

changeQuote.addEventListener("click", setQuota);

async function getQuotes() {
  const res = await fetch(quotes);
  const data = await res.json();
  quoteText.innerHTML = data[quotaNum]?.text;
  quoteAuthor.innerHTML = data[quotaNum]?.author;
  return data;
}

function setQuota() {
  if (quotaNum === quotaNum) {
    quotaNum = Math.ceil(Math.random() * 1000)
      .toString()
      .padStart(2, "0");
  }
  getQuotes();
}
setQuota();

cityInput.addEventListener("change", getWeather);

async function getWeather() {
  const city = cityInput.value;
  const res = await fetch(getCurrentApiUrl(city));
  if (!res.ok) {
    throw new Error((cityInput.value = "error"));
  }
  const data = await res.json();
  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = `${data.weather[0].description}`;
  wind.textContent = `wind speed: ${Math.round(data.wind.speed)} m/s`;
  humidity.textContent = `humidity: ${data.main.humidity}%`;
}
getWeather();

function setLocalStorageCity() {
  localStorage.setItem("city", cityInput.value);
}
window.addEventListener("beforeunload", setLocalStorageCity);

function getLocalStorageCity() {
  if (localStorage.getItem("city")) {
    cityInput.value = localStorage.getItem("city");
    getWeather();
  }
}
window.addEventListener("load", getLocalStorageCity);

let isPlay = false;
const audio = new Audio();
let playNum = 0;

function playAudio() {
  if (!isPlay) {
    isPlay = true;
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    playBtn.classList.remove("play");
    playBtn.classList.add("pause");
    playItem.innerHTML = playList[playNum].title;
    audio.play();
  } else {
    isPlay = false;
    playBtn.classList.remove("pause");
    playBtn.classList.add("play");
    audio.pause();
  }
}

playBtn.addEventListener("click", playAudio);
playNext.addEventListener("click", getTrackNext);
playPrev.addEventListener("click", getTrackPrev);
audio.addEventListener("ended", getTrackNext);

function getTrackNext() {
  if (playNum == 3) {
    playNum = 0;
  } else {
    playNum = playNum + 1;
  }
  isPlay = false;
  playAudio(playNum);
}

function getTrackPrev() {
  if (playNum == 0) {
    playNum = 3;
  } else {
    playNum = playNum - 1;
  }
  isPlay = false;
  playAudio(playNum);
}

function updateProgress(e) {
  const currentTimeAudio =
    Math.round(parseFloat(e.srcElement.currentTime / 60) * 100) / 100;
  const durationTimeAudio =
    Math.round(parseFloat(e.srcElement.duration / 60) * 100) / 100;
  timeDurationProgress.innerHTML = currentTimeAudio;
  timeDuration.innerHTML = durationTimeAudio;
  const progressPercent = (currentTimeAudio / durationTimeAudio) * 100;
  progress.style.width = `${progressPercent}%`;
}
audio.addEventListener("timeupdate", updateProgress);

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener("click", setProgress);

function getSound() {
  if (!audio.muted) {
    audio.muted = true;
    volumeSound.classList.remove("volume-sound");
    volumeSound.classList.add("volume-mute");
  } else {
    audio.muted = false;
    volumeSound.classList.remove("volume-mute");
    volumeSound.classList.add("volume-sound");
  }
}

volumeSound.addEventListener("click", getSound);


// volumeSlider.addEventListener('click', e => {
//   const sliderWidth = window.getComputedStyle(volumeSlider).width;
//   const newVolume = e.offsetX / parseInt(sliderWidth);
//   audio.volume = newVolume;
//   audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
// }, false)

// function setProgressVolume(e) {
//   const width = this.clientWidth;
//   const clickX = e.offsetX;
//   audio.volume = clickX;
//   audio.currentTime = (clickX / width) * duration;
// }

// volumeSlider .addEventListener("click", setProgressVolume);

// //click volume slider to change volume
// const volumeSlide = audioPlayer.querySelector(".controls .volume-slider"); // volumeProgress
// volumeProgress.addEventListener('click', e => {
//   const sliderWidth = window.getComputedStyle(volumeProgress).width;
//   const newVolume = e.offsetX / parseInt(sliderWidth);
//   audio.volume = newVolume;
//   volumeProgress.style.width = newVolume * 100 + '%';
// }, false)