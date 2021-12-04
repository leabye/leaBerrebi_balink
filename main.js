const api = {
    base:"https://www.metaweather.com/api/location/",
    icon: "https://www.metaweather.com/static/img/weather/ico"
}



let searchbox = document.querySelector('.country');

//valeur par defaults
//init with New York
getWeatherData('2459115');
document.querySelector('.country').onchange = function(){
    getWeatherData(searchbox.value);
 }


function getWeatherData(query) {
    fetch(`${api.base}${query}`)
    .then(weather => {
        return weather.json();
    }).then(displayWeatherData);
}



function displayWeatherData(weather) {
    let tableContainingDays = document.getElementById('table1');
    tableContainingDays.innerHTML = "";
    let nbDays = 0;
    let nbPageTotal = page1 ? 6:1;    
    
    while (nbDays < nbPageTotal){
        weatherData = weather.consolidated_weather[nbDays];
        let dayName = getDayName(nbDays,page1,weather);
        let maxTemp = Math.floor(weatherData.max_temp);
        let windSpeed = Math.floor(weatherData.wind_speed);
        let minTemp =  Math.floor(weatherData.min_temp);
        let airPressure = Math.floor(weatherData.air_pressure);
        let icon = weatherData.weather_state_abbr;
        

        const weatherHTML = `<div class="weatherTab"> \
                    <div> <h3>${dayName} </h3></div>\
                    <div><div id ="prec"><img  id="imgs" class="icon" src="${api.icon}/${icon}.ico"></div>\
                    <div id ="propert">${weatherData.weather_state_name}</div></div>\
                    <div> \
                    <div id="maxval" >Max:</div><div id = "maxval"> ${maxTemp}°C</div></div>\
                    <div> <div id="maxval">Min:</div><div id = "maxval"> ${minTemp} °C</div></div>\
                    <div class="precip" id="prec"> ${windSpeed} mph</div>\
                    <div ><b>Humidity</b></div>\
                    <div id ="prec"> ${weatherData.humidity}%</div>\
                    <div ><b>Visibility</b></div>\
                    <div> ${parseFloat(weatherData.visibility).toFixed(1)} miles</div>\
                    <div><div ><b>Pressure</b></div>\
                    <div>  ${airPressure} mb</div>\
                    <div><b>Confidence</b></div>\
                    <div> ${weatherData.predictability}%</div>\
        </div>`;
        
        tableContainingDays.innerHTML += weatherHTML;
        nbDays++;    
    }

    setSunData(weather);

}

function setSunData(weather) {
    let city = document.querySelectorAll('.city');
    city.forEach(i => i.innerText = `${weather.title}`);
    let time = document.querySelector('.time');
    time.innerText = getTime(`${weather.time}`);
    let sunrise = document.querySelector('.sunrise');
    sunrise.innerText = getTime(`${weather.sun_rise}`);
    let sunset = document.querySelector('.sunset');
    sunset.innerText = getTime(`${weather.sun_set}`);
}

function getTime(hour) {
    let hourValue = hour.split("T")[1].split(".")[0].slice(0,5);
    return hourValue.split(":")[0] > 12 ?  hourValue + " p.m." : hourValue + " a.m."; 
}

function getDayName(nbDays,page1,weather){
    if(page1){
        if(nbDays == 0){dayName = 'Today'};
        if(nbDays == 1){dayName = 'Tomorrow'};
        if(nbDays >= 2){
            dayMonth = new Date(`${weatherData.applicable_date}`).toString().split(" ");
            dayName = dayMonth[0]+" "+dayMonth[2]+" "+dayMonth[1];
        }
    }
    else{
        dayName='';
    }
return dayName;
}
