var loginBtn = document.getElementById("loginBtn");

// create Array data to store the favorites choices from the user
var data = new Array(6);

function checkForFavs() {
    for (var i = 0; i < data.length; i++) {
        data[i] = [];
    }

    // check if there is any data in the localstorage from previous use

    var textQ = localStorage.getItem("saveMyPlaces");
    if (textQ) {
        data = JSON.parse(textQ);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    init();
});
// window.onload = init();

// allows the user to login and displays the favourites

loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    var loginName = document.getElementById("login_name").value;
    var loginPassword = document.getElementById("loginPassword").value;
    console.log(loginName, loginPassword);
    checkLogin(loginName, loginPassword);
});

//checks the login details against the details saved in local storage

function checkLogin(user, password) {
    var storedUser = localStorage.getItem("user");
    var storedPassword = localStorage.getItem("password");
    if (storedUser === user && storedPassword === password) {
        localStorage.setItem("login", true);
        window.location.reload()
    } else {
        M.toast({ html: 'Login Error' });
    };
}

//hides the form when the login is successful
function hideForm() {
    document.getElementById("loginForm").classList.add("hide");
    document.getElementById("loginBtn").classList.add("hide");
    document.getElementById("clearBtn").classList.remove("hide");
};

function displayFavorites(imageLink, title, operating, address, rate, link, id) {

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
    var ArrayOfClassName = ["fas fa-clock", "fas fa-map-marker-alt", "fas fa-heart", "fas fa-directions", "fa fa-star"];

    // store all the information about the place/restaurant/cafe to array and with the "for loop to insert to <i>"
    var arrayInfo = [];
    arrayInfo.push(hours);
    arrayInfo.push(address);
    arrayInfo.push(rate);
    arrayInfo.push(link);

    /* after the title there is four catgories follow in the card "openning hours" , "address" , " rating" because there is Loop for to add 
    this categotiries to card some of them the don't have any text only a space and the rating only the title */
    categories = ['', ' ', ' Rating : ',];

    var firstRow = document.querySelector(".favorites1");
    var secondRow = document.querySelector(".favorites2");

    // create the div will include the card

    var cardContainer = document.createElement("div");
    cardContainer.className = "col s6 m4 l2";
    firstRow.appendChild(cardContainer);
    if (firstRow.children.length === 6) {
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
    image.setAttribute("onerror", "this.onerror=null;this.src='./assets/images/MelbourneRebootLogo/melbourne reboot logo_resized.png'");
    cardImgDiv.appendChild(image);

    var cardContentDiv = document.createElement("div");
    cardContentDiv.className = "card-content";
    cardDiv.appendChild(cardContentDiv);

    // create the star will save in the local storage and will display to favorate-page

    var favorite = document.createElement("i");
    favorite.setAttribute("onclick", "toggleStar(event)");
    favorite.setAttribute("data-id", id);
    favorite.className = ArrayOfClassName[4];
    cardContentDiv.appendChild(favorite);

    // create <h6> tag the title will be here

    var cardTitle = document.createElement("h6");
    cardTitle.className = "card-title";
    cardTitle.appendChild(document.createTextNode(title));
    cardContentDiv.appendChild(cardTitle);

    // here is the Loop for create the "openning hours" , "address" , " rating" 

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

// this function change the status of the star and remove the information to local storage

function toggleStar(event) {

    event.target.classList.toggle("fa-star-o");

    var id = event.target.dataset.id;

    for (var i = 0; i < 6; i++) {
        data[i].splice(id, 1);
    }
    localStorage.setItem("saveMyPlaces", JSON.stringify(data));

    window.location.reload();
}
function isloggedIn() {
    var loginStatus = localStorage.getItem("login");
    return (loginStatus)

}

//checks if the user is logged in to display either login form or favourites

function init() {
    if (isloggedIn()) {
        checkForFavs()
        hideForm()
        for(var i=0; i<data[0].length; i++){
            displayFavorites(data[0][i],data[1][i], data[2][i], data[3][i], data[4][i], data[5][i], i);
    }
    }
};

//Clears all favourites

var clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", function (e) {
    clearFavourites();
});

// the following fuction clear the arrays from the data and save the new empty array to local storage and reload the page

function clearFavourites() {
    var index = "0";
    for (var i = 0; i < 6; i++) {
        data[i].splice(index, data[i].length);
    }
    localStorage.setItem("saveMyPlaces", JSON.stringify(data));
    window.location.reload();
}
