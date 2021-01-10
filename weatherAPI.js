
//Daily Weather Forecast

//Accuweather API Key and Location key for Melbourne City
var locationKey = "26216";

var apikey = "64ppKFNNDrwNlJmOWIct4Pfj8ecrRsDZ";

//var queryURL = "https://dataservice.accuweather.com/forecasts/v1/daily/1day/" + locationKey + "?apikey=" + apikey + "&language=en-us&details=false&metric=true"
var queryURL = "https://pfotis-eval-test.apigee.net/weatherapi/v1/cors-mock/" + locationKey + "?apikey=" + apikey + "&language=en-us&details=false&metric=true";
//DOM for storing weather data
var todaysForecast = {};
var displayWeather = document.getElementById("todaysForecast");

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

    
    var currentDate = moment().format('LLLL').slice(0, -8);
    var minTemp = "Min " + Math.trunc(resp.DailyForecasts[0].Temperature.Minimum.Value) + " °";
    var maxTemp = "Max " + Math.trunc(resp.DailyForecasts[0].Temperature.Maximum.Value) + " °";
    var weatherText = resp.DailyForecasts[0].Day.IconPhrase;
    var weatherIcon = document.createElement("img");
    weatherIcon.src = "assets/images/weatherImages/" + resp.DailyForecasts[0].Day.Icon + ".png";

    console.log(displayWeather)
    displayWeather.textContent = currentDate + "  " + minTemp + "  " + maxTemp + "  " + weatherText;
    displayWeather.appendChild(weatherIcon);

}
    
fetchWeather();










