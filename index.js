// Create variable to store each place details
var placeId = [];
var apiResults = [];
var openingHours = [];

// add the key here 

var Key = "AIzaSyDWXD4Z0EBFa-rotD5NSVVeRNQGjRhuTGg";

window.addEventListener('keydown', function (e) {
    if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter') {
        if (e.target.nodeName == 'INPUT' && e.target.type == 'text') {
            e.preventDefault(); return false;
        }
    }
}, true);

// Select homepage submit button
var submitBtn = document.querySelector("button");
var firstRow = document.querySelector(".results-row1");
var secondRow = document.querySelector(".results-row2");

// Add click to homepage submit button
submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".progress").classList.remove("hide");
    apiResults = [];
    placeId = [];
    firstRow.innerHTML = "";
    secondRow.innerHTML = "";

    // submitBtn.textContent = "New Search";
    // submitBtn.className = "reset";
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
            placeId.push(response.results[i].place_id);
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

            // Call the Google Photo API

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

        //var openingHours = [];

        for (var i = 0; i < 10; i++) {
            var hours = "not available";
            if (apiResults[i].results.opening_hours) {
                var hours = apiResults[i].results.opening_hours.weekday_text
            }
            openingHours.push(hours);

            // in case there is not rating at this time user visit the website
            if (apiResults[i].results.rating == null) {
                apiResults[i].results.rating = "-";
            }

            informationContainer(
                apiResults[i].photoUrl,
                apiResults[i].results.name,
                openingHours[i],
                apiResults[i].results.formatted_address.replace(/VIC|, Australia|/g, ""),
                apiResults[i].results.rating,
                apiResults[i].results.url,
                i);

        }
        checkIfUserLoggedIn();
    }
});

function checkIfUserLoggedIn() {
    var loginStatus = localStorage.getItem("login");
    if(!loginStatus)
    showForm();
}
// create Array data to store the favorites choices from the user

var data = new Array(6);

for (var i = 0; i < data.length; i++) {
    data[i] = [];
}

// check if there is any data in the localstorage from previous use

var textQ = localStorage.getItem("saveMyPlaces");
if (textQ != null) {
    data = JSON.parse(textQ);
}

function informationContainer(imageLink, title, operating, address, rate, link, id) {
    document.querySelector(".progress").classList.add("hide");
    var today = moment().format('dddd') + ":";
    var tempArray = "";

    var hours = "";

    /* run the array with the opening hours and split each line to arrayline to find the today 
    schedule for the place and to store to variable hours */

    for (var j = 0; j < operating.length; j++) {
        if (operating[j]) {
            var tempArray = operating[j].split(" ");
            if (today == tempArray[0]) {
                for (var i = 1; i < tempArray.length; i++)
                    hours = hours + " " + tempArray[i];
            }
        }
    }

    // store all the class name to array and with the "for loop to insert to <i>"
    var ArrayOfClassName = ["fas fa-clock", "fas fa-map-marker-alt", "fas fa-heart", "fas fa-directions", "fa fa-star fa-star-o"];

    // store all the information about the place/restaurant/cafe to array and with the "for loop to insert to <span>"
    var arrayInfo = [];
    arrayInfo.push(hours);
    arrayInfo.push(address);
    arrayInfo.push(rate);
    arrayInfo.push(link);

    /* after the title there is four catgories follow in the card "opening hours" , "address" , " rating" because there is Loop to add 
    this categories to card some of them the don't have any text, only a space and the rating only the title */
    categories = ['', ' ', ' Rating : ',];

    // create the div will include the card

    var cardContainer = document.createElement("div");
    cardContainer.className = "col s6 m4 l3 xl2";
    firstRow.appendChild(cardContainer)
    if (firstRow.children.length === 6 && window.innerWidth > 1200) {
        secondRow.appendChild(cardContainer);
    }

    var cardDiv = document.createElement("div");
    cardDiv.className = "card large";
    cardContainer.appendChild(cardDiv);

    var cardImgDiv = document.createElement("div");
    cardImgDiv.className = "card-image";
    cardDiv.appendChild(cardImgDiv);

    // create the <img> tag will include the image 

    var image = document.createElement("img");
    image.setAttribute("src", imageLink);
    image.setAttribute("onerror", "this.onerror=null;this.src='./assets/images/Melbourne Reboot Logo/melbourne reboot logo_resized.png'");
    cardImgDiv.appendChild(image);

    var cardContentDiv = document.createElement("div");
    cardContentDiv.className = "card-content black-text";
    cardDiv.appendChild(cardContentDiv);

    // create the star will save in the local storage and will display to favorate-page

    var favorite = document.createElement("i");
    favorite.setAttribute("onclick", "toggleStar(event)");
    favorite.setAttribute("data-id", id);
    favorite.setAttribute("data-save", "not-saved");
    favorite.className = ArrayOfClassName[4];
    cardContentDiv.appendChild(favorite);

    // create <h6> tag the title will be here

    var cardTitle = document.createElement("h6");
    cardTitle.className = "card-title black-text";
    cardTitle.appendChild(document.createTextNode(title));
    cardContentDiv.appendChild(cardTitle);


    // here is the Loop for create the "openning hours" , "address" , " rating" 
    // Add place details and icons to card 

    for (var i = 0; i < categories.length; i++) {
        var cardInfo = document.createElement("div");
        cardInfo.className = "placeDetails";
        var info = document.createElement("span");
        var cardItag = document.createElement("i");
        cardItag.className = ArrayOfClassName[i];
        info.appendChild(document.createTextNode(categories[i] + arrayInfo[i]));
        cardContentDiv.appendChild(cardInfo);
        cardInfo.appendChild(info);
        cardInfo.prepend(cardItag);
    }


    // Display Google Maps link
    var linkDiv = document.createElement("div");
    linkDiv.className = "card-action";
    var mapsLink = document.createElement("a");
    var mapsIcon = document.createElement("i")
    mapsIcon.className = ArrayOfClassName[3];
    mapsLink.appendChild(document.createTextNode("  directions"));
    mapsLink.setAttribute("href", arrayInfo[3]);
    mapsLink.setAttribute("target", "_blank");

    cardContentDiv.appendChild(linkDiv);
    linkDiv.appendChild(mapsLink);
    mapsLink.prepend(mapsIcon);
}
// this function change the status of the star and save the information to local storage

function toggleStar(event) {

    var saveInfo = event.target.getAttribute("data-save");
    var id = event.target.dataset.id;
    event.target.classList.toggle("fa-star-o");
    console.log(id);
    if (saveInfo == "not-saved") {

        /* change the status to "saved" to be able from the javascript in case the user unfavourite to delete from the localstorage
        
         when the card saved as favourite from user then the "data-id" change from the spot get in to array in case the user unfavourite
        before change page*/

        event.target.setAttribute("data-save", "saved");
        event.target.setAttribute("data-id", data[0].length);

        data[0].push(apiResults[id].photoUrl);
        data[1].push(apiResults[id].results.name);
        data[2].push(openingHours[id]);
        data[3].push(apiResults[id].results.formatted_address);
      data[4].push(apiResults[id].results.rating);
        data[5].push(apiResults[id].results.url)
        localStorage.setItem("saveMyPlaces", JSON.stringify(data));

    } else {

        event.target.setAttribute("data-save", "not-saved");
        for (var i = 0; i < 6; i++) {
            data[i].splice(id, 1);
        }
        localStorage.setItem("saveMyPlaces", JSON.stringify(data));
    }

}

function showForm() {
    document.getElementById("showRow").classList.remove("hide");
    document.getElementById("showBtn").classList.remove("hide");
};


function showPreloader() {
    document.querySelector(".progress").classList.remove("hide");
    
    if (firstRow.innerHTML != "" && secondRow.innerHTML != "") {

        document.querySelector(".progress").classList.add("hide");
    }
  
}



