function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function refreshWeather(response) {
  //updating city data
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  //updating weather description
  let descriptionElement = document.querySelector("#weather-condition");
  descriptionElement.innerHTML = response.data.condition.description;
  //updating humidity description
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  //updating wind-speed
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  //updating time
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);
  //updating icon
  let iconElement = document.querySelector("#icon");
  let icon = `<img src="${response.data.condition.icon_url}" class="icon"/>`;
  iconElement.innerHTML = icon;
  //updating temperature
  let temperatureElement = document.querySelector("#temp-value");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "e4ce9c9t0c3f0014ab46bfba167d7oad";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");
  searchCity(searchInput.value);
}
function getForecast(city) {
  let apiKey = "e4ce9c9t0c3f0014ab46bfba167d7oad";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayforecast);
}
function displayforecast(response) {
  days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  forecastHTML = "";
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<section class="weather-forecast-day">
  <div class="weather-forecast">
    <div class="weather-forecast-date">${day}</div>
    <div class="weather-forecast-icon">🌥️</div>
    <div class="weather-forecast-temp">
      <div class="weather-forecast-temp-early">9°</div>
      <div class="weather-forecast-temp-late">
        <strong>15°</strong>
      </div>
    </div>
  </div>
</section>`;
  });
  let forecastElement = document.querySelector("#weather-forecast-day");
  forecastElement.innerHTML = forecastHTML;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

searchCity("Polokwane");
