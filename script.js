var submitEl = document.querySelector("#submitBtn");
var inputEl = document.querySelector("#cityInput");
var msgEl = document.querySelector(".msg");
var APIkey = "a624cbc58502929687c870d48d2bc712";
var city;
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}"

function citySubmit(event) {
    event.preventDefault();
    console.log(event);
    console.log(inputEl.value);
}

submitEl.addEventListener("click", citySubmit);

