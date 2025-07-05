const apiKey = "6d6f1448962a439fa7672855250407";
const apiUrl = "https://api.weatherapi.com/v1/current.json?aqi=no&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather img");

async function getWeather(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&key=${apiKey}`);
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.location.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.current.temp_c) + "°C";
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
    document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";

    const condition = data.current.condition.text.toLowerCase();

    if (condition.includes("cloud")) {
      weatherIcon.src = "images/cloud.png";
    } else if (condition.includes("clear") || condition.includes("sunny")) {
      weatherIcon.src = "images/clear.png";
    } else if (condition.includes("rain")) {
      weatherIcon.src = "images/rain.png";
    } else if (condition.includes("mist") || condition.includes("fog")) {
      weatherIcon.src = "images/mist.png";
    } else if (condition.includes("snow")) {
      weatherIcon.src = "images/snow.png";
    } else if (condition.includes("drizzle")) {
      weatherIcon.src = "images/drizzle.png";
    } else {
      weatherIcon.src = "images/clear.png"; // fallback
    }
  } catch (error) {
    alert("City not found or API error");
    console.error(error);
  }
}

// 🔍 Search button click
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

// ⌨️ Enter key press
searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = searchBox.value.trim();
    if (city !== "") {
      getWeather(city);
    }
  }
});

// 🌍 Auto fetch weather on page load using geolocation
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation not supported by your browser.");
  }
});

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log("Your location:", latitude, longitude);

  // Pass coordinates to weather API
  getWeather(`${latitude},${longitude}`);
}

function error() {
  alert("Location access denied. Please enter a city manually.");
}
