// Display time of the last updated date
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
// Forecast hours
function forecastHourApi(parameter) {
  let apiKey = `94acf2da0785bb3e4d1e3cb839ee7521`;
  let units = `metric`;
  let url = `https://api.openweathermap.org/data/2.5/onecall?`;
  let apiUrl = `${url}lat=${parameter.lat}&lon=${parameter.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(addForecastHour);
}

function fixHourDisplay(key) {
  let time = new Date(key * 1000);
  let hour = time.getHours();
  if (hour < 10) {
    return `0${hour}`;
  } else {
    return hour;
  }
}

function addForecastHour(parameter) {
  let htmlElement = document.querySelector("#forecast-hour");
  let addHtml = `<div class="row cur-day">`;
  let hours = parameter.data.hourly;
  hours.forEach(function (hourForecast, index) {
    if (index < 6) {
      addHtml =
        addHtml +
        ` <div class="col-4 col-md-2 d-block justify-content-center p-2 text-center">
                <p class="hour">${fixHourDisplay(hourForecast.dt)}</p>
                <img
                  src="http://openweathermap.org/img/wn/${
                    hourForecast.weather[0].icon
                  }@2x.png"
                  alt="${hourForecast.weather[0].description}"
                  width="50px"
                  class="day-sign"
                  id="day-sign"
                />
                <p class="cur-day-temp">${Math.round(hourForecast.temp)}°</p>
              </div>`;
    }
  });
  addHtml = addHtml + ` </div>`;
  htmlElement.innerHTML = addHtml;
}

// Forecast days
function forecastDaysApi(parameter) {
  let apiKey = `94acf2da0785bb3e4d1e3cb839ee7521`;
  let units = `metric`;
  let url = `https://api.openweathermap.org/data/2.5/onecall?`;
  let apiUrl = `${url}lat=${parameter.lat}&lon=${parameter.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(addForecastDays);
}

function fixDayDisplay(key) {
  let time = new Date(key * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[time.getDay()];
  return day;
}

function addForecastDays(parameter) {
  let htmlElement = document.querySelector("#forecast");
  let addHtml = `<div class="row five-days">`;
  let days = parameter.data.daily;
  days.forEach(function (dayForecast, index) {
    if (index < 6) {
      addHtml =
        addHtml +
        `<div class="col-4 col-md-2 justify-content-center p-2 text-center">
                <p class="day">${fixDayDisplay(dayForecast.dt)}</p>
                <img
                  src="http://openweathermap.org/img/wn/${
                    dayForecast.weather[0].icon
                  }@2x.png"
                  alt="${dayForecast.weather[0].description}"
                  width="50px"
                  class="day-sign"
                  id="day-sign"
                />
                <p class="day-temp">
                  <span class="day-temp-min">${Math.round(
                    dayForecast.temp.min
                  )}°</span><span class="day-temp-max"> ${Math.round(
          dayForecast.temp.max
        )}°</span>
                </p>
              </div>`;
    }
  });
  addHtml = addHtml + `</div>`;
  htmlElement.innerHTML = addHtml;
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

  forecastDaysApi(temperature.data.coord);
  forecastHourApi(temperature.data.coord);
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

// Cities links
function searchKyiv(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  city.innerHTML = `Kyiv`;

  let apiKey = `94acf2da0785bb3e4d1e3cb839ee7521`;
  let units = `metric`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q`;
  let apiUrl = `${url}=Kyiv&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentTemp);
}

function searchVienna(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  city.innerHTML = `Vienna`;

  let apiKey = `94acf2da0785bb3e4d1e3cb839ee7521`;
  let units = `metric`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q`;
  let apiUrl = `${url}=Vienna&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentTemp);
}

function searchLondon(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  city.innerHTML = `London`;

  let apiKey = `94acf2da0785bb3e4d1e3cb839ee7521`;
  let units = `metric`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q`;
  let apiUrl = `${url}=London&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentTemp);
}

function searchParis(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  city.innerHTML = `Paris`;

  let apiKey = `94acf2da0785bb3e4d1e3cb839ee7521`;
  let units = `metric`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q`;
  let apiUrl = `${url}=Paris&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentTemp);
}

function searchBerlin(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  city.innerHTML = `Berlin`;

  let apiKey = `94acf2da0785bb3e4d1e3cb839ee7521`;
  let units = `metric`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q`;
  let apiUrl = `${url}=Berlin&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentTemp);
}

function searchLisbon(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  city.innerHTML = `Lisbon`;

  let apiKey = `94acf2da0785bb3e4d1e3cb839ee7521`;
  let units = `metric`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q`;
  let apiUrl = `${url}=Lisbon&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentTemp);
}

let linkKyiv = document.querySelector("#linkKyiv");
linkKyiv.addEventListener("click", searchKyiv);

let linkVienna = document.querySelector("#linkVienna");
linkVienna.addEventListener("click", searchVienna);

let linkLondon = document.querySelector("#linkLondon");
linkLondon.addEventListener("click", searchLondon);

let linkParis = document.querySelector("#linkParis");
linkParis.addEventListener("click", searchParis);

let linkBerlin = document.querySelector("#linkBerlin");
linkBerlin.addEventListener("click", searchBerlin);

let linkLisbon = document.querySelector("#linkLisbon");
linkLisbon.addEventListener("click", searchLisbon);

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
