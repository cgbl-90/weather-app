/* Catching errors */
function error(err) {
  console.log("ERROR(" + err.code + "): " + err.message);
}
function convertToDay(a) {
  let allDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return allDays[a];
}
function wSetTime(now) {
  let a = convertToDay(now.getDay());
  let b = now.getHours();
  let c = String(now.getMinutes()).padStart(2, "0");
  pTime.innerHTML = `${a}, ${b}:${c}`;
}

function convertToCelciusToFarenheit(event) {
  console.log("Event: click Celcius/Farenheit button");
  event.preventDefault();
  let a = GradToShow.innerHTML;
  let b = varFeelsLike.innerHTML;
  if (MetricToShow.innerHTML === "C|f") {
    a = (a * 9) / 5 + 32;
    b = (b * 9) / 5 + 32;
    GradToShow.innerHTML = Math.round(a);
    varFeelsLike.innerHTML = Math.round(b);
    MetricToShow.innerHTML = "F|c";
  } else {
    a = ((a - 32) * 5) / 9;
    b = ((b - 32) * 5) / 9;
    GradToShow.innerHTML = Math.round(a);
    varFeelsLike.innerHTML = Math.round(b);
    MetricToShow.innerHTML = "C|f";
  }
}
function swModes(event) {
  console.log("Event: click dark/ligth mode");
  event.preventDefault();
  let a = document.querySelector("html");
  if (myButtonBlackMode.innerHTML === "B") {
    // Apply dark mode
    a.classList.add("dark-mode");
    a.classList.remove("light-mode");
    myButtonBlackMode.classList.add("toogle_light");
    myButtonBlackMode.classList.remove("toogle");
    myButtonBlackMode.innerHTML = "P";
  } else {
    // Apply light mode
    a.classList.add("light-mode");
    a.classList.remove("dark-mode");
    myButtonBlackMode.classList.remove("toogle_light");
    myButtonBlackMode.classList.add("toogle");
    myButtonBlackMode.innerHTML = "B";
  }
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let hour = String(date.getHours()).padStart(2, "0");
  let mins = String(date.getMinutes()).padStart(2, "0");
  let time = hour + ":" + mins;
  return time;
}

function printHours(response) {
  let forecast = response.data.list;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast--hourly");
  let forecastHTML = `<div id="forecast--hourly" class="air row inline--1x4 align_left">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      index = index + 1;
      forecastHTML =
        forecastHTML +
        `
      <div class="card smallText">
        <div>${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div>
          <span class="boldText"> ${Math.round(
            forecastDay.main.temp_max
          )}° </span>
          <span> ${Math.round(forecastDay.main.temp_min)}° </span>
        </div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  console.log(forecastHTML);
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(id) {
  let apiRequest =
    "https://api.openweathermap.org/data/2.5/forecast?id=" +
    id +
    "&appid=" +
    apiKey +
    "&&units=metric";
  console.log(apiRequest);
  console.log("process: get forecast per hour");
  axios.get(apiRequest).then(printHours);
}

function printLocation(response) {
  console.log(response.data);
  myLatitude = response.data.coord.lat;
  myLongitude = response.data.coord.lon;
  cityToShow.innerHTML = response.data.name;
  MetricToShow.innerHTML = "C|f";
  countryToShow.innerHTML = response.data.sys.country;
  varHumidity.innerHTML = response.data.main.humidity;
  varWind.innerHTML = response.data.wind.speed;
  varDescription.innerHTML = response.data.weather[0].description;
  varPressure.innerHTML = response.data.main.pressure;
  GradToShow.innerHTML = Math.round(response.data.main.temp);
  varFeelsLike.innerHTML = Math.round(response.data.main.feels_like);
  let v =
    "http://openweathermap.org/img/wn/" +
    response.data.weather[0].icon +
    "@2x.png";
  console.log(v);
  weatherIcon.setAttribute("src", v);
  console.log("process: get forecast per hour");
  getForecast(response.data.id);
}
function searchCity(response) {
  console.log(response);
  if (response === "") {
    alert("Indicate the city");
  } else {
    let apiRequest =
      apiEndPoint + "q=" + response + "&appid=" + apiKey + "&&units=metric";
    console.log(apiRequest);
    axios.get(apiRequest).then(printLocation);
  }
}
function sWeatherCity(event) {
  console.log("Event: click search button");
  searchCity(cityToSearch.value);
}

function returnPosition(response) {
  console.log(response.coords.latitude);
  console.log(response.coords.longitude);
  myLatitude = response.coords.latitude;
  myLongitude = response.coords.longitude;
  let apiRequest =
    apiEndPoint +
    "lat=" +
    myLatitude +
    "&lon=" +
    myLongitude +
    "&appid=" +
    apiKey +
    "&&units=metric";
  console.log(apiRequest);
  axios.get(apiRequest).then(printLocation);
}
function findCityUsingLatLong() {
  console.log("Event: click locate me button");
  navigator.geolocation.getCurrentPosition(returnPosition, error, options);
}
/* Set variables */
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
let myButtonSearch = document.querySelector("#bSearch");
let cityToSearch = document.querySelector("#cSearch");
let countryToShow = document.querySelector("#countryLabel");
let cityToShow = document.querySelector("#cityLabel");
let myButtonLocate = document.querySelector("#bLocate");
let myButtonBlackMode = document.querySelector("#bMode");
let GradToShow = document.querySelector("#wGrad");
let MetricToShow = document.querySelector("#wMetric");
let pTime = document.querySelector("#wTime");
let varHumidity = document.querySelector("#humidity");
let varWind = document.querySelector("#wind");
let varDescription = document.querySelector("#description");
let varPressure = document.querySelector("#pressure");
let varFeelsLike = document.querySelector("#feelsLike");
let apiKey = "05da73ad69c615537c1579e06c8164fb";
let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
let weatherIcon = document.querySelector("#weather_icon");
let myLatitude = 0.0;
let myLongitude = 0.0;
/*  Clicks & Enter  */
myButtonSearch.addEventListener("click", sWeatherCity);
MetricToShow.addEventListener("click", convertToCelciusToFarenheit);
myButtonBlackMode.addEventListener("click", swModes);
myButtonLocate.addEventListener("click", findCityUsingLatLong);
cityToSearch.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sWeatherCity();
  }
});
/* Initial settings */
let now = new Date();
let initialCity = "Santo Domingo";
wSetTime(now);
searchCity(initialCity);
