 // Create variable to store each place details
 var placeDetails = [];
 var placeFotoRef = [];
 var photoSearchURLList = [];
 var photoURLList = [];

//Select homepage submit button
var submitBtn = document.querySelector("button");

// Add click to homepage submit button
submitBtn.addEventListener("click", function(e) {
    e.preventDefault();

    //Get the suburb, radius selected by the user and the available activity types
    var suburb = document.getElementById("suburb").value;
    var radius = document.getElementById("test5").value;
    var types = document.querySelectorAll('input[type="checkbox"]');

    console.log(suburb);
    console.log(radius);
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

    /* query URL that returns a CORS error:
    var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+ typesForURL +"%2Bin%2B"+location+"&radius="+radius+"&key=XXXXXXXX";
    console.log(queryURL);
    */

    // Define the queryURL with the values selected by the user
    var queryURL = "https://pfotis-eval-test.apigee.net/v1/cors-mock?query="+ typesForURL +"%2Bin%2B"+location+"&radius="+radius+ "&key=XXXXXXXXXXX";
    console.log(queryURL);

    // Define the function to run the Google Place Search API query and get the places_ID
    function fetchId() {
        fetch(queryURL)
        .then(response => {
            if (!response.ok) {
                throw Error("ERROR");
            }
                return response.json();
        })
        .then(res => {
            console.log(res.results);
            var placesId = res.results.map(place => {
                return place.place_id;
            })

            console.log(placesId);

            //Create a list with the ten URLs to call the Google Place Detail API
            queryURLList = [];
            for (var i=0; i<= 9; i++) {
                var placeDetailsURL = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + placesId[i] + "&fields=photos,name,opening_hours,formatted_address,rating,url&key=XXXXXXXXX"
                console.log(placeDetailsURL)
                queryURLList.push(placeDetailsURL);
            }

            console.log(queryURLList); 

            // Define a function to call the Google Place Detail API for each result
            function fetchData () {
                for (var i=0; i<= 9; i++) {
                    fetch(queryURLList[i])

                    .then(response => {
                        if(!response.ok) {
                            throw Error("ERROR");
                        }
                            return response.json();      
                    })

                    .then(res => {
                        console.log(res);

                        //Push to array the each place details
                        placeDetails.push(res.result);
                        console.log(placeDetails);

                        // Push to array each photo reference
                        placeFotoRef.push(res.result.photos[0].photo_reference);
                        console.log(placeFotoRef);

                        // Define URL to call Google Places Photo API to retrieve the src of the imge
                        photoSearchURLList = placeFotoRef.map(myfunction)
                        
                        function myfunction(x){
                            return "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + x + "&key=XXXXXX"
                        }
                        
                        console.log(photoSearchURLList);

                        function fetchPhoto () {
                            for (var i=0; i<= 9; i++) {
                                fetch(photoSearchURLList[i])
                                .then(response => {
                                    if(!response.ok) {
                                        throw Error("ERROR");
                                    }
                                       return response;

                                })
                                .then(response => {
                                    console.log(response.url);
                                    photoURLList.push(response.url);
                                    console.log(photoURLList);
                                })  
                            }
                        }
                        //Call the Google Place Photo API
                        fetchPhoto()
                    })
                }                 
            }                    
            //Call the Google Place Detail API
            fetchData()
        })
    }   
    // Call the Google Place Search API query
    fetchId()
    
})



/*Draft code to display the place details the card

                return `<div>
                <p>Name: ${place.photos.photo_reference} </p>
                <p>Name: ${place.name} </p>
                <p>Address: ${place.formatted_address}</p>
                <p>Rating: ${place.rating}</p>
                <p>Rating: ${place.url}</p>
                </div>`    
            })
            document.querySelector(".card-content").childNodes[1].innerHTML =  ....;
        })
    }
*/

    /* Code to move from one html page to the other
    window.location.href = "page2.html";
    */








