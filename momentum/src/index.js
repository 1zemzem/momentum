import _ from "lodash";
import "./scss/style.scss";

function showTime() {
  const time = document.querySelector(".time");
  time.textContent = "Text";
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  const currentData = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
}
showTime();

function getCurrentDate() {
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
  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const todayDate = document.querySelector(".date");
  const date = new Date(Date.now());  
  const weekdayNumber = date.getDay();
  const weekday = week[weekdayNumber];
  const monthNumber = date.getMonth().toString();
  const month = monthes[monthNumber];
  const day = date.getDate();
  console.log(month);
  todayDate.innerHTML = `${weekday}, ${month} ${day}`;
}
getCurrentDate();
