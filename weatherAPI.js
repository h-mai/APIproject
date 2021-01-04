
//Daily Weather Forecast

var queryURL = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + locationKey "?apikey=" + apikey + "&language=en-us&details=false&metric=true"

//Accuweather API Key
var apikey = "f6QbiHKwOvouxHGTPJ3GHffRRblmTZBG";

//Accuweather Location Key for Melbourne City 
var locationKey = "26216";

var minTemp = [];	
var maxTemp = [];	
var currentDate = [];
var weatherText = [];
var weatherIcon = [];
var forecastDay = 1

//fetching Accuweather Daily Weather Data
async function fetchWeather () {

    await fetch(queryURL)
    .then(function(resp) { return resp.json() })
    .then(function(data) {
      console.log(data);
    })
    .catch(function() {

    });

}

var dailyForecast = function(data) {

    for (var i = 0; i < forecastDay; i++) {
        currentDate[i] = data.DailyForecasts[i].Date;
        minTemp[i] = data.DailyForecasts[i].Temperature.Minimum.Value;
        maxTemp[i] = data.DailyForecasts[i].Temperature.Maximum.Value;
        weatherText[i] = data.DailyForecasts[i].Day.IconPhrase;
        weatherIcon[i] = data.DailyForecasts[i].Day.Icon;
        
    }
console.log(dailyForecast)
};









