// import _ from "lodash";
import "./style.scss";
import "./index.html";
import playList from "./js/playList";
import ApiService from "./js/api";

// const API_KEY = "9cb594847a8332efc8a48a01c59a89de";
// const getCurrentApiUrl = (city, key) =>
//   `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=${key}&units=metric`;

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
const weatherContainer = document.querySelector(".weather-container");
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
const rangeVolume = document.querySelector(".range-volume");
const settingsImg = document.querySelector(".settings-img");
const todoButton = document.querySelector(".todo-button");
const todoContainer = document.querySelector(".todo-container");
const form = document.querySelector(".todo-header-form");
const todoheaderInput = document.querySelector(".todo-header-input");
const list_el = document.querySelector(".task-list");
const taskInput = document.querySelector(".task-input");

// console.log(todoContainer);
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

const greetingTranslation = {
  en: ["Good night", "Good morning", "Good afternoon", "Good evening"],
  by: ["Дабранач", "Добрай раницы", "Добрага дня", "Добры вечар"],
};

// get time & show greeting
function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
  getCurrentDate();
  showGreeting();
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
  const great = greetingTranslation.en[timeOfDay];
  greeting.innerHTML = `${great},`;
}

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 0 && hours < 6) {
    return 0;
  } else if (hours >= 6 && hours < 12) {
    return 1;
  } else if (hours >= 12 && hours < 18) {
    return 2;
  } else if (hours >= 18 && hours < 24) {
    return 3;
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

// get & set background images from githubusercontent depend of Time Of Day

function getRandomNum() {
  const random = Math.ceil(Math.random() * 20)
    .toString()
    .padStart(2, "0");
  return random;
}

let bgNum = getRandomNum();

function setBg() {
  const timeOfDay = getTimeOfDay();
  const imgOfDay = dayTime[timeOfDay];
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/1zemzem/stage1-tasks/assets/images/${imgOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url("https://raw.githubusercontent.com/1zemzem/stage1-tasks/assets/images/${imgOfDay}/${bgNum}.jpg")`;
  };
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

// get & change quotes from api

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

// get weather forecast from API
cityInput.addEventListener("change", getWeather);

async function getWeather() {
  try {
    const city = cityInput.value;
    const data = await ApiService.getWeatherInfo(city);
    weatherContainer.classList.remove("weather-container-error");
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = `${data.weather[0].description}`;
    wind.textContent = `wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `humidity: ${data.main.humidity}%`;

    console.log(data);
  } catch (error) {
    cityInput.value = "error, no data";
    weatherContainer.classList.add("weather-container-error");
  }
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

// Audio player
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

//Advanced audio player
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

function setProgressVolume() {
  audio.volume = parseFloat(this.value / 10);
}
rangeVolume.addEventListener("change", setProgressVolume);

//todo

todoButton.addEventListener("click", () => {
  if (todoContainer.classList.contains("todo-container-active")) {
    todoContainer.classList.add("todo-container");
    todoContainer.classList.remove("todo-container-active");
  } else {
    todoContainer.classList.remove("todo-container");
    todoContainer.classList.add("todo-container-active");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = todoheaderInput.value;

  const task_el = document.createElement("div");
  task_el.classList.add("task");

  const task_content_el = document.createElement("div");
  task_content_el.classList.add("task-content");

  task_el.appendChild(task_content_el);

  const task_input_el = document.createElement("input");
  task_input_el.classList.add("task-input");
  task_input_el.type = "text";
  task_input_el.value = task;
  task_input_el.setAttribute("readonly", "readonly");

  task_content_el.appendChild(task_input_el);

  const task_actions_el = document.createElement("div");
  task_actions_el.classList.add("actions");

  const task_done_el = document.createElement("button");
  task_done_el.classList.add("done");
  task_done_el.innerText = "done";

  const task_edit_el = document.createElement("button");
  task_edit_el.classList.add("edit");
  task_edit_el.innerText = "edit";

  const task_delete_el = document.createElement("button");
  task_delete_el.classList.add("delete");
  task_delete_el.innerText = "del";

  task_actions_el.appendChild(task_done_el);
  task_actions_el.appendChild(task_edit_el);
  task_actions_el.appendChild(task_delete_el);

  task_content_el.appendChild(task_actions_el);

  list_el.appendChild(task_el);
  localStorage.setItem(
    "tasks",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("tasks") || "[]"),
      { task: task.value, completed: false },
    ])
  );

  // input.value = '';

  task_edit_el.addEventListener("click", (e) => {
    if (task_edit_el.innerText.toLowerCase() == "edit") {
      task_edit_el.innerText = "save";
      task_input_el.removeAttribute("readonly");
      task_input_el.focus();
    } else {
      task_edit_el.innerText = "edit";
      task_input_el.setAttribute("readonly", "readonly");
    }
  });

  task_delete_el.addEventListener("click", (e) => {
    list_el.removeChild(task_el);
  });

  task_done_el.addEventListener("click", (e) => {
    task_input_el.classList.toggle("todo-done");
  });
});
