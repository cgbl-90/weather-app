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
  console.log("Event: click Celcius/Farenheit button");
  event.preventDefault();
  let a = GradToShow.innerHTML;
  let b = varFeelsLike.innerHTML;
  if (myButtonGrad.innerHTML === "F") {
    a = (a * 9) / 5 + 32;
    b = (b * 9) / 5 + 32;
    GradToShow.innerHTML = a;
    varFeelsLike.innerHTML = b;
    myButtonGrad.innerHTML = "C";
    MetricToShow.innerHTML = "F";
  } else {
    a = ((a - 32) * 5) / 9;
    b = ((b - 32) * 5) / 9;
    GradToShow.innerHTML = a;
    varFeelsLike.innerHTML = b;
    myButtonGrad.innerHTML = "F";
    MetricToShow.innerHTML = "C";
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
  latestSearch.innerHTML = response;
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
function repeatSearch() {
  cityToSearch.value = latestSearch.innerHTML;
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
let latestSearch = document.querySelector("#latestSearchCity");
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
/*  Clicks & Enter  */
cityToSearch.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sWeatherCity();
  }
});
latestSearch.addEventListener("click", repeatSearch);
myButtonSearch.addEventListener("click", sWeatherCity);
myButtonBlackMode.addEventListener("click", swModes);
myButtonGrad.addEventListener("click", convertToCelciusToFarenheit);
myButtonLocate.addEventListener("click", findCityUsingLatLong);
/* Initial settings */
let now = new Date();
let initialCity = "Santo Domingo";
wSetTime(now);
searchCity(initialCity);
