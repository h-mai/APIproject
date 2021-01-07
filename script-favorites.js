var data = new Array(6);

for (var i = 0; i < data.length; i++) {
  data[i] = [];
}


var textQ = localStorage.getItem("saveMyPlaces");
if(textQ !=null){
    data = JSON.parse(textQ);
}
 console.log(data);

for(var i=0; i<data[0].length; i++){
    informationContainer(data[0][i],data[1][i], data[2][i], data[3][i], data[4][i], data[5][i], i);
}


function informationContainer(imageLink, title, operating, address, rate, link, id) {

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

    categories = ['', ' ', ' Rating : ',];

    var firstRow = document.querySelector(".favorites");

    var divContainer = document.createElement("div");
    divContainer.className = "col s12 m4 l2";
    firstRow.appendChild(divContainer);

    var cardDiv = document.createElement("div");
    cardDiv.className = "card";
    divContainer.appendChild(cardDiv);

    var cardImgDiv = document.createElement("div");
    cardImgDiv.className = "card-image";
    cardDiv.appendChild(cardImgDiv);

    var image = document.createElement("img");
    image.setAttribute("src", imageLink);
    image.setAttribute("onerror", "this.onerror=null;this.src='./5aykshsh-thumb.gif'");
    cardImgDiv.appendChild(image);

    var cardContentDiv = document.createElement("div");
    cardContentDiv.className = "card-content";
    cardDiv.appendChild(cardContentDiv);

    var favorite = document.createElement("i");
    favorite.setAttribute("onclick", "toggleStar(event)");
    favorite.setAttribute("data-id", id);
    favorite.className = ArrayOfClassName[4];
    cardContentDiv.appendChild(favorite);

    var cardTitle = document.createElement("h6");
    cardTitle.className = "card-title";
    cardTitle.appendChild(document.createTextNode(title));
    cardContentDiv.appendChild(cardTitle);

    for (var i = 0; i < categories.length; i++) {
        var cardInfo = document.createElement("div");
        var cardItag = document.createElement("i");
        cardItag.className = ArrayOfClassName[i];
        cardItag.appendChild(document.createTextNode(categories[i] + arrayInfo[i]));
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

    event.target.classList.toggle("fa-star-o");

    var id = event.target.dataset.id;

    for(var i=0; i<6; i++){
        data[i].splice(id,1);
    }
    
    localStorage.setItem("saveMyPlaces", JSON.stringify(data));
}