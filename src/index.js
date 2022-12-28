//Update 1
//In the project, display the current date and time using JavaScript: Tuesday 16:00

let date = document.querySelector("#date");
let today = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
let day = days[today.getDay()];
let hour = today.getHours();
let minutes = today.getMinutes();
let dateToday = today.getDate();
let month = today.getMonth() + 1;

let updatedTime = `${day} ${dateToday}/${month} at ${hour}:${minutes}`;

date.innerHTML = updatedTime;

//Update 2 and Update from Week 5
//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

function changeTemp(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed} m/s`;
}

function showWeather(event) {
  event.preventDefault();
  let newCity = document.querySelector("#check-location");
  city.innerHTML = newCity.value;
  let apiKey = "72fcc2019b422e7c2787f6b074b1f6d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeTemp);
}

let city = document.querySelector("#city");
let form = document.querySelector("#submit-form");
form.addEventListener("submit", showWeather);

//Update 3
//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

function dispFahrenheitTemp() {
  //event.preventDefault();
  let celTemp = temperature.innerHTML;
  let fahTemp = celTemp * (9 / 5) + 32;
  temperature.innerHTML = Math.round(fahTemp);
}

function dispCelciusTemp() {
  let fahTemp = temperature.innerHTML;
  let celTemp = (fahTemp - 32) * (5 / 9);
  temperature.innerHTML = Math.round(celTemp);
}

let celcius = document.querySelector("#celsius-link");
let fahrenheit = document.querySelector("#fahrenheit-link");
let temperature = document.querySelector("#temperature");
let description = document.querySelector("#description");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
fahrenheit.addEventListener("click", dispFahrenheitTemp);
celcius.addEventListener("click", dispCelciusTemp);

//Week5 Updates
function dispCity(response) {
  city.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed} m/s`;
}
function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "72fcc2019b422e7c2787f6b074b1f6d4";
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    )
    .then(dispCity);
}
function currentLocTemp() {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}
let button = document.querySelector("#current-location");
button.addEventListener("click", currentLocTemp);
