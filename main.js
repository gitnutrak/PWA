const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMessage = document.querySelector('p.error');
const cityName = document.querySelector('h2.city');

const weatherImg = document.getElementById('weatherImg');
const temperature = document.querySelector('p.temp');
const weatherDescription = document.querySelector('p.weatherDescription');
const feelslike = document.querySelector('span.feels_like');
const pressure = document.querySelector('span.pressure');
const wind_speed = document.querySelector('span.wind_speed');
const clouds = document.querySelector('span.clouds');
const humidity = document.querySelector('span.humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=9a7eb8d3726fdea590b95ac41eef5bdf';
const apiUnits = '&units=metric';
const apiLang = '&lang=pl';

function getWeather() {
    const apiCity = input.value;
    const URL = apiLink + apiCity + apiKey + apiUnits + apiLang;

    axios.get(URL).then(response => {
        console.log(response);
        cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
     
        weatherImg.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        temperature.textContent = `${Math.round(response.data.main.temp)} °C`;
        weatherDescription.textContent = `${response.data.weather[0].description}`;
        weatherDescription.classList.add('color');
        feelslike.textContent = `${Math.round(response.data.main.feels_like)} °C`;
        pressure.textContent = `${response.data.main.pressure} hPa`;
        humidity.textContent = `${response.data.main.humidity} %`;
        wind_speed.textContent = `${Math.round(response.data.wind.speed * 3.6)} km/h`;
        clouds.textContent = `${response.data.clouds.all} %`;
        errorMessage.textContent = '';
    }).catch(error => {
        errorMessage.textContent = `${error.response.data.message}`;
        weatherImg.src = '';
        [cityName, temperature, weatherDescription, pressure, humidity, wind_speed, clouds].forEach(element => {
            element.textContent = '';
        })
        weatherDescription.classList.remove('color')
    }).finally(() =>{
        input.value='';
    })
}

function getWeatherByEnter(e){
    if (e.key == 'Enter'){
        getWeather();
    }
}

button.addEventListener('click', getWeather);
input.addEventListener('keypress', getWeatherByEnter);
