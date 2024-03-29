require('dotenv').config();

const api = {
  endpoint: process.env.REACT_APP_WEATHER_API_ENDPOINT,
  key: process.env.REACT_APP_WEATHER_API_KEY,
};

getApiGeolocation();

async function getApiGeolocation() { 
    const resGeolocation = await fetch(`${process.env.REACT_APP_GEO_API_ENDPOINT}?api_key=${process.env.REACT_APP_GEO_API_KEY}`);
    const resultGeolocation = await resGeolocation.json(); 
    getInfo(resultGeolocation.city);
}

const input = document.querySelector('#input');
input.addEventListener("keypress", enter);

function enter(e) {
    if (e.keyCode === 13) {
        getInfo(input.value);
    }
}

async function getInfo(data) {
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`);
    const resReceived = await res.json();
    displayResult(resReceived);
    input.value="";
}

function displayResult(resReceived) {
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + resReceived.name + "')";
    let city = document.querySelector("#city");
    city.textContent = `${resReceived.name}, ${resReceived.sys.country}`;

    getOurDate();

    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = `${Math.round(resReceived.main.temp)}<span>°</span>`;

    let feelsLike = document.querySelector("#feelsLike");
    feelsLike.innerHTML = `Feels like: ${Math.round(resReceived.main.feels_like)}<span>°</span>`;

    let conditions = document.querySelector("#conditions");
    conditions.textContent = `${resReceived.weather[0].main}`;

    let variation = document.querySelector("#variation");
    variation.innerHTML = "Min: " + `${Math.round(resReceived.main.temp_min)}<span>°</span>` + " " + "Max " + `${Math.round(resReceived.main.temp_max)}<span>°</span>`
}

function getOurDate() {
    const myDate = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    let day = days[myDate.getDay()];
  
    let todayDate = myDate.getDate();

    let month = months[myDate.getMonth()];

     let year = myDate.getFullYear();

     let showDate = document.querySelector("#date");
     showDate.textContent = `${day}` + " " + `${todayDate}` + " " + `${month}` + " " + `${year}` 
}