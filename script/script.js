var suburbInput = document.querySelector("input");
var suburb = suburbInput.value;
//console.log(suburbInput.value);
//console.log(suburb);

suburbInput.addEventListener('keypress', function (e){
    if (e.key === 'Enter') {
    suburb = suburbInput.value;
    //console.log(suburbInput.value);
    //console.log(suburb);
    fetchData();
    }
});

//console.log(suburbInput.value+"14");
//console.log(suburb+"15");

//var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=cafe+in" + suburb + "&key=";

function fetchData() {
    var type = "bar";
    var location = suburb+"+Victoria";
    var radius = "10000";
    fetch("https://pfotis-eval-test.apigee.net/v1/cors-mock?query="+type+"%2Bin%2B"+location+"&radius="+radius+"&key=")
    .then(response => {
        if (!response.ok) {
            throw Error("ERROR");
        }
            return response.json();
    })
    .then(res => {
        console.log(res.results);
        var html = res.results.map(place => {
            return `<div class="options">
            <p>Name: ${place.name} </p>
            <p>Address: ${place.formatted_address}</p>
            <p>Rating: ${place.rating}</p>
            </div>`    
        })
        .join("");
        console.log(html);
        document.querySelector(".result").innerHTML =  html;
    })
}



//loadJSON('https://api.foursquare.com/v2/venues/explore?client_id=FS2133IMEESBV1WI3N3K1NLROKV31WHAGORBF2Z5SMYJOGUA&client_secret=UXEACQWUXHFOCXND2O5MYOHXYYLXYBWM5KRF3DAMRQWGGMU4&v=20180323&limit=1&ll=-37.7941207,144.9276659&query=cafe')


// var request = new XMLHttpRequest()

// request.open('GET', 'https://api.foursquare.com/v2/venues/explore?client_id=FS2133IMEESBV1WI3N3K1NLROKV31WHAGORBF2Z5SMYJOGUA&client_secret=UXEACQWUXHFOCXND2O5MYOHXYYLXYBWM5KRF3DAMRQWGGMU4&v=20180323&limit=1&ll=-37.7941207,144.9276659&query=cafe', true);
// request.send();
// console.log(this.response);
