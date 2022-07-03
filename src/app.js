function formatDate(date) {
  let now = new Date(date);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let fullTime = `${day} ${hours}:${minutes}`;
  return fullTime;
}
// Convert temperature
function changeFormatTempF(event) {
  event.preventDefault();
  tempFormC.classList.remove("active");
  tempFormF.classList.add("active");
  let curNum = document.querySelector("#cur-num");
  let fTemp = Math.round((celciusTemperature * 9) / 5 + 32);
  curNum.innerHTML = `${fTemp}`;
}
let tempFormF = document.querySelector("#temp-farenheit");
tempFormF.addEventListener("click", changeFormatTempF);

function changeFormatTempC(event) {
  event.preventDefault();
  tempFormF.classList.remove("active");
  tempFormC.classList.add("active");
  let curNum = document.querySelector("#cur-num");
  curNum.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let tempFormC = document.querySelector("#temp-celcius");
tempFormC.addEventListener("click", changeFormatTempC);

// API object
function currentTemp(temperature) {
  let temp = Math.round(temperature.data.main.temp);
  let curTemp = document.querySelector(`#cur-num`);

  celciusTemperature = temperature.data.main.temp;

  let status = temperature.data.weather[0].description;
  let generalStatus = document.querySelector(`#general-current-status`);

  let humidity = temperature.data.main.humidity;
  let hum = document.querySelector(`#humidity`);

  let wind = Math.round(temperature.data.wind.speed * 3.6);
  let windSpeed = document.querySelector(`#wind-speed`);

  let name = temperature.data.name;
  let stateName = temperature.data.sys.country;
  let cityName = document.querySelector(`#city`);

  let icon = temperature.data.weather[0].icon;
  let iconImage = document.querySelector(`#icon`);

  let curDate = temperature.data.dt * 1000;
  let currentDate = document.querySelector("#date");

  curTemp.innerHTML = `${temp}`;
  generalStatus.innerHTML = `${status}`;
  hum.innerHTML = `${humidity}`;
  windSpeed.innerHTML = `${wind}`;
  cityName.innerHTML = `${name}, ${stateName}`;
  currentDate.innerHTML = formatDate(curDate);
  iconImage.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconImage.setAttribute("alt", temperature.data.weather[0].description);
}
// Add a search engine
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

// Current Location
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
  navigator.geolocation.getCurrentPosition(currentPosition);
}

nav();
