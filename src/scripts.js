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
  pTime.innerHTML =
    convertToDay(now.getDay()) + ", " + now.getHours() + ":" + now.getMinutes();
}
function convertToCelciusToFarenheit(event) {
  console.log("Click Celcius and Farenheit button");
  event.preventDefault();
  let a = GradToShow.innerHTML;
  let b = varFeelsLike.innerHTML;
  if (myButtonGrad.innerHTML === "F") {
    a = (a * 9) / 5 + 32;
    b = (b * 9) / 5 + 32;
    GradToShow.innerHTML = a.toFixed(2);
    varFeelsLike.innerHTML = b.toFixed(2);
    myButtonGrad.innerHTML = "C";
    MetricToShow.innerHTML = "F";
  } else {
    a = ((a - 32) * 5) / 9;
    b = ((b - 32) * 5) / 9;
    GradToShow.innerHTML = a.toFixed(2);
    varFeelsLike.innerHTML = b.toFixed(2);
    myButtonGrad.innerHTML = "F";
    MetricToShow.innerHTML = "C";
  }
}
function swModes(event) {
  console.log("Click Black & Ligth mode");
  event.preventDefault();
  let a = document.querySelector("html");
  if (myButtonBlackMode.innerHTML === "B") {
    // Apply dark mode
    a.classList.add("dark-mode");
    a.classList.remove("light-mode");
    myButtonBlackMode.innerHTML = "W";
  } else {
    // Apply light mode
    a.classList.add("light-mode");
    a.classList.remove("dark-mode");
    myButtonBlackMode.innerHTML = "B";
  }
}
function printLocation(response) {
  console.log(response.data);
  cityToShow.innerHTML = response.data.name;
  GradToShow.innerHTML = response.data.main.temp;
  MetricToShow.innerHTML = "C";
  countryToShow.innerHTML = response.data.sys.country;
  varHumidity.innerHTML = response.data.main.humidity;
  varWind.innerHTML = response.data.wind.speed;
  varDescription.innerHTML = response.data.weather[0].description;
  varPressure.innerHTML = response.data.main.pressure;
  varFeelsLike.innerHTML = response.data.main.feels_like;
}
function searchCity(response) {
  console.log(response);
  if (response === "") {
    alert("Indicate the city");
  } else {
    let apiRequest =
      apiEndPoint +
      "q=" +
      response +
      "&appid=" +
      apiKey +
      "&&units=metric";
    console.log(apiRequest);
    axios.get(apiRequest).then(printLocation);
}

function sWeatherCity(event) {
  console.log("Click search button");
  SearchCity(cityToSearch.value);
}

function returnPosition(response) {
  myLatitude = response.coords.latitude;
  myLongitude = response.coords.longitude;
}

function findCityUsingLatLong() {
  console.log("Click locate me button");
  navigator.geolocation.getCurrentPosition(returnPosition, error, options);
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

/* Set variables */
var options = {
  enableHighAccuracy: true,
  timeout: 500,
  maximumAge: 0
};
let myButtonSearch = document.querySelector("#bSearch");
let cityToSearch = document.querySelector("#cSearch");
let countryToShow = document.querySelector("#countryLabel");
let cityToShow = document.querySelector("#cityLabel");
let myButtonLocate = document.querySelector("#bLocate");
let myButtonBlackMode = document.querySelector("#bMode");
let myButtonGrad = document.querySelector("#bGrad");
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
let myLatitude = 0.0;
let myLongitude = 0.0;

/*  Clicks & events  */
myButtonSearch.addEventListener("click", sWeatherCity);
myButtonBlackMode.addEventListener("click", swModes);
myButtonGrad.addEventListener("click", convertToCelciusToFarenheit);
myButtonLocate.addEventListener("click", findCityUsingLatLong);

/* Initial settings */
let now = new Date();
wSetTime(now);
searchCity('Santo Domingo');