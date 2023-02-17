// import _ from "lodash";
import "./style.scss";
import "./index.html";

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
// console.log(changeQuote);
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
  setTimeout(setBg, 500);
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
  console.log(data[quotaNum]?.text);
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
