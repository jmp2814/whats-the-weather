var submitEl = document.querySelector("#submitBtn");
var inputEl = document.querySelector("#cityInput");
var msgEl = document.querySelector(".msg");
var cityList = document.querySelector("#prev-city");
var current = document.querySelector("#curr-city");
var city;
var cityLi = "";
const APIkey = "a624cbc58502929687c870d48d2bc712";
const baseAPIurl = "https://api.openweathermap.org";

function fetchLocation(searchText) {
    const apiUrl = `${baseAPIurl}/geo/1.0/direct?q=${searchText}&limit=5&appid=${APIkey}`;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("Data is: ", data);
            if (!data[0]) {
                alert("Location not found!");
                return;
            }
            fetchWeather(data[0].lat, data[0].lon)
        })
}

function fetchWeather(latitude, longitude) {

    var queryURL = `${baseAPIurl}/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${APIkey}`;

    fetch(queryURL)
        .then(function (resonse) {
            return resonse.json();
        })
        .then(function (data) {
            // var supText = "o";
            console.log(data);
            document.getElementById("temp-span").innerText=data.current.temp;
            document.getElementById("wind-span").innerText=data.current.wind_speed + " MPH";
            document.getElementById("humi-span").innerText=data.current.humidity;
            document.getElementById("uv-span").innerText=data.current.uvi;

            document.getElementById("day1").innerText=data.daily[0].weather.icon;
        
        })

}

function citySubmit(event) {

    event.preventDefault();
    console.log(event);
    console.log(inputEl.value);
    fetchLocation(inputEl.value);
    current.removeAttribute("hidden");
    cityAdd();
    document.getElementById("citySearch").reset();
    // var ul = cityList;
    // var li = document.createElement("button");
    // li.innerHTML = inputEl.value;
    // ul.appendChild(li);


}

// function to create button for previously searched cities and add it to a list below search bar

function cityAdd() {
    var cityUl = cityList
    var cityLi = document.createElement("button");
    cityLi.innerHTML = inputEl.value;
    cityUl.appendChild(cityLi)
    cityLi.classList.add("prevCityBtn");
}

function reCitySubmit(event) {
    event.preventDefault();
    inputEl = cityLi.innerText;
    // console.log(event);
    // console.log(inputEl.value);
    // fetchLocation(inputEl.value);
    citySubmit();
}

// cityLi.addEventListener("click", reCitySubmit);
submitEl.addEventListener("click", citySubmit);

