
//Daily Weather Forecast

var queryURL= "https://dataservice.accuweather.com/forecasts/v1/daily/1day/26216?apikey=f6QbiHKwOvouxHGTPJ3GHffRRblmTZBG&language=en-us&details=false&metric=true"

// var queryURL = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + locationKey + "?apikey=" + apikey + "&language=en-us&details=false&metric=true"

//Accuweather API Key
var apikey = "f6QbiHKwOvouxHGTPJ3GHffRRblmTZBG";

//Accuweather Location Key for Melbourne City 
var locationKey = "26216";

var todaysForecast = {};

//fetching Accuweather Daily Weather Data
async function fetchWeather () {

    var resp = await fetch(queryURL)
    if (!resp.ok) {
        throw Error("ERROR");
    }
    resp = await resp.json()

    console.log(resp);

    console.log(resp.DailyForecasts[0].Date)
    console.log(resp.DailyForecasts[0].Temperature.Minimum.Value)
    console.log(resp.DailyForecasts[0].Temperature.Maximum.Value)
    console.log(resp.DailyForecasts[0].Day.IconPhrase)
    console.log(resp.DailyForecasts[0].Day.Icon)

    // src = "assets/" + resp.DailyForecasts[0].Day.Icon + ".png"


    todaysForecast = {
        currentDate :  resp.DailyForecasts[0].Date,
        minTemp : resp.DailyForecasts[0].Temperature.Minimum.Value,
        maxTemp : resp.DailyForecasts[0].Temperature.Maximum.Value,
        weatherText : resp.DailyForecasts[0].Day.IconPhrase,
        weatherIcon : resp.DailyForecasts[0].Day.Icon, 
    };
    
    console.log(todaysForecast)
}
    
fetchWeather();










