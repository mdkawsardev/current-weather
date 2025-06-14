let searchInput = document.querySelector(".search input");
let searchBtn = document.querySelector(".search button");
let cLocation = document.querySelector(".location h1");
let locationTime = document.querySelector(".location p");
let sunriseTime = document.querySelector(".first p");
let sunsetTime = document.querySelector(".second p");
let img = document.querySelector(".img img");
let desc = document.querySelector(".box2 h3");
let feelsLike = document.querySelector(".box2 p");
let wind = document.querySelector(".title1 p");
let humidity = document.querySelector(".title2 p");
let Visibility = document.querySelector(".title3 p");
let Pressure = document.querySelector(".title4 p");

// Creating a function to get weather information
async function weather(city) {
        const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4a503c7c892dba9dbb26aac2de9bfac5&units=metric`
        const options = {
        method: "GET"
    }
    let response = await fetch(BASE_URL, options);
    //this is for valid city name
    if(response.status === 404 || searchInput.value === "") {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".error p").innerHTML = "Invalid city name!";
            document.querySelector(".parent").style.display = "none";
    } else {
        if(response.status === 200 || searchInput.value !== "") {
            document.querySelector(".error").style.display = "none";
            document.querySelector(".parent").style.display = "block";
            let result = await response.json();
            console.log(result)
            cLocation.innerHTML = result.name + " " + result.sys.country;
            let time = new Date(result.dt * 1000);
            let date = time.toLocaleTimeString();
            locationTime.innerHTML = date;

            let sunTime = new Date(result.sys.sunrise * 1000);
            let sRise = sunTime.toLocaleTimeString();
            sunriseTime.innerHTML = sRise;
            let sunseTime = new Date(result.sys.sunset * 1000);
            let sSet = sunseTime.toLocaleTimeString();
            sunsetTime.innerHTML = sSet;
            let celcious = document.querySelector(".celcious h2");
            celcious.innerHTML = Math.round(result.main.temp) + "<sup>°C</sup>";
            if (result.weather[0].main === "Clouds") {
                img.src = "image/cloudy.png";
            } else if (result.weather[0].main === "Rain") {
                img.src = "image/rain.png";
            } else if (result.weather[0].main === "Clear") {
                img.src = "image/sunny.png";
            }
            desc.innerHTML = result.weather[0].description;
            feelsLike.innerHTML = "Feels Like " + Math.round(result.main.feels_like) + "<sup>°C</sup>";
            wind.innerHTML = result.wind.speed + "km/h";
            humidity.innerHTML = result.main.humidity + "%";
            Visibility.innerHTML = (result.visibility / 1000) + "km";
            Pressure.innerHTML = result.main.pressure + " mb";
        }
    }
}
// setting a click event to call that function
searchBtn.addEventListener("click", () => {
        weather(searchInput.value)
})
