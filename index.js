const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");


var APIKey = "13a20bff688ee831cb1387d17a612e3a";

var currentLocation = document.getElementById("get-current-loc");

currentLocation.addEventListener("click", () => {
  //Geolocation APU is used to get geographical position of a user and is available inside the navigator object
  if (navigator.geolocation) {
    //returns position(latitude and longitude) or error
    navigator.geolocation.getCurrentPosition(showLocation, checkError);
  } else {
    //For old browser i.e IE
    locationDiv.innerText = "The browser does not support geolocation";
  }
});

//Error Checks
const checkError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      error404.innerText = "Please allow access to location";
      break;
    case error.POSITION_UNAVAILABLE:
      //usually fired for firefox
      error404.innerText = "Location Information unavailable";
      break;
    case error.TIMEOUT:
      error404.innerText = "The request to get user location timed out";
  }
};

const showLocation = async (position) => {
  //We user the NOminatim API for getting actual addres from latitude and longitude
  let response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
  );
  //store response object
  let data = await response.json();
  const currentLoc = data.address.city + "," + data.address.country;

  document.getElementById("searchfield").value = `${data.address.city}, ${data.address.country}`;


  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currentLoc}&appid=${APIKey}&units=metric`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "450px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const feelslike = document.querySelector(
        ".weather-details .feelslike span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      feelslike.innerHTML = `${Math.round(json.main.feels_like)}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "690px";
    });

  
};

search.addEventListener("click", () => {
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "450px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const feelslike = document.querySelector(
        ".weather-details .feelslike span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      feelslike.innerHTML = `${Math.round(json.main.feels_like)}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "690px";
    });
});
