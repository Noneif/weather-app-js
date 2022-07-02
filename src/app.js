//Feature #1
//In your project, display the current date and time using JavaScript: Tuesday 16:00
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let fullTime = `${day} ${hours}:${minutes}`;
  return fullTime;
}
let now = new Date();
let current = document.querySelector("#date");
current.innerHTML = formatDate(now);
//Feature #2
//Add a search engine, when searching for a city (i.e. Paris),
//display the city name on the page after the user submits the form.

//Bonus Feature
//Display a fake temperature (i.e 17) in Celsius and add
//a link to convert it to Fahrenheit. When clicking on it,
//it should convert the temperature to Fahrenheit. When clicking on Celsius,
//it should convert it back to Celsius.
function changeFormatTempF(event) {
  event.preventDefault();
  let curNum = document.querySelector("#cur-num");
  let temperature = curNum.innerHTML;
  let fTemp = Math.round((temperature * 9) / 5 + 32);
  curNum.innerHTML = `${fTemp}`;
}
let tempFormF = document.querySelector("#temp-farenheit");
tempFormF.addEventListener("click", changeFormatTempF);

function changeFormatTempC(event) {
  event.preventDefault();
  let curNum = document.querySelector("#cur-num");
  let temperature = curNum.innerHTML;
  let cTemp = Math.round(((temperature - 32) * 5) / 9);
  curNum.innerHTML = `${cTemp}`;
}
let tempFormC = document.querySelector("#temp-celcius");
tempFormC.addEventListener("click", changeFormatTempC);

// In your project, when a user searches for a city (example: New York),
// it should display the name of the city on the result page and the current
// temperature of the city.

function currentTemp(temperature) {
  let temp = Math.round(temperature.data.main.temp);
  let curTemp = document.querySelector(`#cur-num`);

  let status = temperature.data.weather[0].main;
  let generalStatus = document.querySelector(`#general-current-status`);

  let humidity = temperature.data.main.humidity;
  let hum = document.querySelector(`#humidity`);

  let wind = Math.round(temperature.data.wind.speed * 3.6);
  let windSpeed = document.querySelector(`#wind-speed`);

  let name = temperature.data.name;
  let cityName = document.querySelector(`#city`);

  curTemp.innerHTML = `${temp}`;
  generalStatus.innerHTML = `${status}`;
  hum.innerHTML = `${humidity}`;
  windSpeed.innerHTML = `${wind}`;
  cityName.innerHTML = `${name}`;
}

function searchCi(event) {
  event.preventDefault();
  let formControl = document.querySelector("#form-control");
  if (formControl.value !== "") {
    let city = document.querySelector("#city");
    city.innerHTML = `${formControl.value}`;

    let apiKey = `94acf2da0785bb3e4d1e3cb839ee7521`;
    let units = `metric`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q`;
    let apiUrl = `${url}=${formControl.value}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(currentTemp);
  }
}

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", searchCi);

// 🙀 Bonus point:
// Add a Current Location button. When clicking on it, it uses the Geolocation
// API to get your GPS coordinates and display and the city and current
// temperature using the OpenWeather API.

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = `94acf2da0785bb3e4d1e3cb839ee7521`;
  let units = `metric`;
  let url = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${url}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(currentTemp);
}

function nav() {
  //event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

//let button = document.querySelector(`#green`);
//button.addEventListener("click", nav);
nav();
