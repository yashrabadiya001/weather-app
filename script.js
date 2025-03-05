const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');

async function checkWeather(city) {
    const apiKey = "32b4171205f5511372d04d8e4da8131c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const weatherData = await response.json();

        if (weatherData.cod === "404") {
            locationNotFound.style.display = "block";
            weatherBody.style.display = "none";
            return;
        }

        locationNotFound.style.display = "none";
        weatherBody.style.display = "block";

        temperature.innerHTML = `${Math.round(weatherData.main.temp)}°C`;
        description.innerHTML = weatherData.weather[0].description;
        humidity.innerHTML = `${weatherData.main.humidity}%`;
        windSpeed.innerHTML = `${weatherData.wind.speed} Km/H`;

        const weatherIcons = {
            Clouds: "cloud.png",
            Clear: "clear.png",
            Rain: "rain.png",
            Mist: "mist.png",
            Snow: "snow.png"
        };

        weatherImg.src = `assets/${weatherIcons[weatherData.weather[0].main] || "cloud.png"}`;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
