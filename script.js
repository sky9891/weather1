const apiKey = "6d6f1448962a439fa7672855250407";
const apiUrl = "https://api.weatherapi.com/v1/current.json?aqi=no&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather img");

async function getWeather(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&key=${apiKey}`);
    const data = await response.json();

    // ✅ Extract & log condition for debug
    const condition = data.current.condition.text.toLowerCase();
    console.log("Weather condition received:", condition);

    // ✅ Update values
    document.querySelector(".city").innerText = data.location.name;
    document.querySelector(".temp").innerText =
      Math.round(data.current.temp_c) + "°C";
    document.querySelector(".humidity").innerText = data.current.humidity + "%";
    document.querySelector(".wind").innerText = data.current.wind_kph + " km/h";

    // ✅ Update image based on condition
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

// 🌍 Auto fetch weather on load using geolocation
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation not supported.");
  }
});

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getWeather(`${lat},${lon}`);
}

function error() {
  alert("Location access denied. Please search manually.");
}
