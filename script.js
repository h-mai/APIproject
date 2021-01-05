// Create variable to store each place details
var placeId = [];
var apiResults = [];

// add the key here 

 var Key = "AIzaSyDWXD4Z0EBFa-rotD5NSVVeRNQGjRhuTGg";

//Select homepage submit button
var submitBtn = document.querySelector("button");

// Add click to homepage submit button
submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    //Get the suburb, radius selected by the user and the available activity types
    var suburb = document.getElementById("suburb").value;
    var radius = document.getElementById("test5").value * 1000;
    var types = document.querySelectorAll('input[type="checkbox"]');

    console.log(suburb, radius);
    console.log(types);

    //Get the types checked by the user into an array
    var checkedTypes = [];
    var i;
    for (i = 0; i < types.length; i++) {
        if (types[i].checked) {
            checkedTypes.push(types[i].value);
        }
    }

    console.log(checkedTypes);

    //Stringify the array of the checked types
    checkedTypes = checkedTypes.map(function (e) {
        return JSON.stringify(e);
    });

    console.log(checkedTypes);

    //Edit the stringified array to be used in the query URL
    var typesForURL = checkedTypes.join("+").replace(/(['"])/g, "");
    console.log(typesForURL);

    //Narrow the user choices to Australia
    var location = suburb + "+Victoria";
    console.log(location);


    // Define the queryURL with the values selected by the user
    // var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+ typesForURL +"%2Bin%2B"+location+"&radius="+radius+"&key=" + Key ;
    var queryURL = "https://pfotis-eval-test.apigee.net/v1/cors-mock?query=" + typesForURL + "%2Bin%2B" + location + "&radius=" + radius + "&key=" + Key;
    console.log(queryURL);

    // Define the function to run the Google Place Search API query and get the places_ID
    async function fetchId() {
        var response = await fetch(queryURL)
        if (!response.ok) {
            throw Error("ERROR");
        }
        response = await response.json()

        console.log(response);

        for (var i = 0; i < 10; i++)
            placeId.push(response.results[i].place_id)
        fetchData();

    }

    fetchId();

    console.log(placeId)

    // Define a function to call the Google Place Detail API for each result 
    async function fetchData() {
        for (var i = 0; i < 10; i++) {
            // await fetch("https://maps.googleapis.com/maps/api/place/details/json?place_id=" + placeId[i] + "&fields=photos,name,opening_hours,formatted_address,rating,url&key=" + Key )
            var response = await fetch("https://pfotis-eval-prod.apigee.net/cors-place?place_id=" + placeId[i] + "&fields=photos,name,opening_hours,formatted_address,rating,url&key=" + Key)
            if (!response.ok) {
                throw Error("ERROR");
            }

            response = await response.json()

            let photoRef = "ATtYBwLIMpWiZiOwfDYy1XGHZ1c-EhzV8hZG2GhB5JhZ90qnvMpfLT5oCDqV7So6Fpt9X6oCnuQGijeC6CjETpLxGiH3LhOg6zKAETrszrt2yWzWxdUxAX2jhz5cTeDTakip448RserT1iN_ukOPp2X3LhHvJeYOym4WiJ27pO5LlsHhzCh9"
            console.log(response)
            if (response.result.photos) {
                photoRef = response.result.photos[0].photo_reference
            }

            console.log(photoRef);

            // Call the Google Photo API (Note: An issue arises if there is no photos in the res)
            // fetch("https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+res.result.photos[0].photo_reference+"&key=" + Key )
            var photo = await fetch("https://pfotis-eval-prod.apigee.net/cors-photo?maxwidth=400&photoreference=" + photoRef + "&key=" + Key)

            if (!photo.ok) {
                throw Error("ERROR");
            }

            //Store the results 
            apiResults.push({
                results: response.result,
                photoUrl: photo.url,
            })
        }

        console.log(apiResults);

        for (var i=0; i<10; i++){

            console.log(apiResults[i].photoUrl);
            console.log(apiResults[i].results.formatted_address);
            console.log(apiResults[i].results.name);
            console.log(apiResults[i].results.opening_hours.weekday_text[0]);
            console.log(apiResults[i].results.rating);
            console.log(apiResults[i].results.url);

            informationContainer(apiResults[i].photoUrl, apiResults[i].results.name, apiResults[i].results.opening_hours.weekday_text[0], apiResults[i].results.formatted_address, apiResults[i].results.rating, apiResults[i].results.url)
        }

    }
})



function informationContainer(imageLink, title, operating , address , rate , link , placeID){
    
    var today = moment().format('dddd')+":";
    var tempArray = operating.split(" ");
    console.log(tempArray);
    var hours = "";

    if(today == tempArray[0]){
        for(var i=1; i<tempArray.length ;i++)
            hours = hours+" "+tempArray[i];
    }
    var ArrayOfClassName = ["fas fa-clock", "fas fa-map-marker-alt", "fas fa-heart", "fas fa-directions", "fa fa-star-o"];

    var arrayInfo = [];
    arrayInfo.push(hours);
    arrayInfo.push(address);
    arrayInfo.push(rate);
    arrayInfo.push(link);
    categories = ['', '', 'Rating : ',];
    var firstRow = document.querySelector(".row");

    var divContainer = document.createElement("div");
    divContainer.className="col s12 m4 l2";
    firstRow.appendChild(divContainer);
    
    var cardDiv = document.createElement("div");
    cardDiv.className="card";
    divContainer.appendChild(cardDiv);

    var cardImgDiv = document.createElement("div");
    cardImgDiv.className="card-image";
    cardDiv.appendChild(cardImgDiv);

    var image = document.createElement("img");
    image.setAttribute("src", imageLink);
    image.setAttribute("onerror", "this.onerror=null;this.src='./5aykshsh-thumb.gif'");
    cardImgDiv.appendChild(image);

    var cardContentDiv = document.createElement("div");
    cardContentDiv.className="card-content";
    cardDiv.appendChild(cardContentDiv);

    var favorite = document.createElement("i");
    favorite.setAttribute("onclick", "toggleStar(event)");
    favorite.className = ArrayOfClassName[4];
    cardContentDiv.appendChild(favorite);

    var cardTitle = document.createElement("h6");
    cardTitle.className = "card-title";
    cardTitle.appendChild(document.createTextNode(title));
    cardContentDiv.appendChild(cardTitle);

    for(var i=0; i<categories.length; i++){
        var cardInfo = document.createElement("div");
        var cardItag = document.createElement("i");
        cardItag.className = ArrayOfClassName[i];
        cardItag.appendChild(document.createTextNode(categories[i] +arrayInfo[i]));
        cardContentDiv.appendChild(cardInfo);
        cardInfo.appendChild(cardItag);
    }

    var linkDiv = document.createElement("a");
    linkDiv.className = ArrayOfClassName[3];
    linkDiv.appendChild(document.createTextNode("directions"));
    linkDiv.setAttribute("href", arrayInfo[3]);
    linkDiv.setAttribute("target", "_blank");
    cardContentDiv.appendChild(linkDiv);

    
    
}

function toggleStar(event) {
   event.target.classList.toggle("fa-star");
}





