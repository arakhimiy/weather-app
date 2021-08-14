const cityLocation = document.querySelector(".city");
const weatherIcon = document.querySelector(".icon");
const weatherDescription = document.querySelector(".description");
const weatherTemp = document.querySelector(".temperature");
const input = document.querySelector(".search-input");
const btn = document.getElementById("myBtn");
const err = document.querySelector(".error-message");
const card = document.querySelector(".card");

card.style.display = "none";

err.style.display = "none";

const errHandler = (status = "none", message) => {
  err.innerText = message;
  err.style.display = status;
};

const weather = {
  apiKey: "a64cbdb4e4f5b9b685d9cdc3fe7c2727",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.displayWeather(data);
        errHandler("none", "");
        card.style.display = "block";
      })
      .catch((err) => {
        errHandler("block", "Oops, Something wrong try again!");
        card.style.display = "none";
      });
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const temperature = data.main.temp;

    cityLocation.innerText = name;
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherDescription.innerText = description;
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + description + "')";
    weatherTemp.innerText = `${temperature} °C`;
  },
};

let log = "";

input.addEventListener("input", (e) => {
  log = e.target.value;
});

// btn.addEventListener("click", () => {
//   weather.fetchWeather(log);
//   input.value = "";
// });

input.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    weather.fetchWeather(log);
    input.value = "";
  }
});
