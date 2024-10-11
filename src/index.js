function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temp-value");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
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
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

searchCity("Polokwane");
