 // Create variable to store each place details
 var placeId = [];
 var apiResults = [];

//Select homepage submit button
var submitBtn = document.querySelector("button");

// Add click to homepage submit button
submitBtn.addEventListener("click", function(e) {
    e.preventDefault();

    //Get the suburb, radius selected by the user and the available activity types
    var suburb = document.getElementById("suburb").value;
    var radius = document.getElementById("test5").value;
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
    checkedTypes = checkedTypes.map(function(e) {
        return JSON.stringify(e);
    });

    console.log(checkedTypes);

    //Edit the stringified array to be used in the query URL
    var typesForURL = checkedTypes.join("+").replace(/(['"])/g, "");
    console.log(typesForURL);

    //Narrow the user choices to Australia
    var location = suburb+"+Victoria";
    console.log(location);


    // Define the queryURL with the values selected by the user
    var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+ typesForURL +"%2Bin%2B"+location+"&radius="+radius+"&key=XXXXXX";
    // var queryURL = "https://pfotis-eval-test.apigee.net/v1/cors-mock?query="+ typesForURL +"%2Bin%2B"+location+"&radius="+radius+ "&key=XXXXXX";
    console.log(queryURL);

    // Define the function to run the Google Place Search API query and get the places_ID
    async function fetchId() {
        await fetch(queryURL)
        .then(response => {
        if(!response.ok) {
            throw Error("ERROR");
        }
            return response.json();
        })
        .then(res => {
            console.log(res);
            for (var i=0; i<= 10; i++) 
            placeId.push(res.results[i].place_id)
            console.log(placeId)
            fetchData();
        })
    }
        
   fetchId();

    console.log(placeId)

    // Define a function to call the Google Place Detail API for each result 
    async function fetchData () {
        for (var i=0; i<= 10; i++) 
        await fetch("https://maps.googleapis.com/maps/api/place/details/json?place_id=" + placeId[i] + "&fields=photos,name,opening_hours,formatted_address,rating,url&key=XXXXXX")
        .then(response => {
            if(!response.ok) {
                throw Error("ERROR");
            }
                return response.json();      
        })
        .then(res => {
            console.log(res);

            // Call the Google Photo API (Note: An issue arises if there is no photos in the res)
            fetch("https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+res.result.photos[0].photo_reference+"&key=XXXXXX")
            .then(response => {
                if(!response.ok) {
                    throw Error("ERROR");
                }

                //Store the results 
                apiResults.push({
                    results: res.result,
                    photoUrl: response.url,
            })

            console.log(apiResults);
        })
        })
    }
})








