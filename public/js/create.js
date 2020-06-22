//variables used in addImage
var currLen = 0;
var currRow;
var container = document.getElementById("grid");
var baseURL = "https://github.com/reyluno/isolatingtogether.github.io/raw/master/img/create/";
var currWidth = getWidth();
var wideLimit = 1200;
var thinLimit = 800;
var width;

if (currWidth > wideLimit) {
    width = 3;
} else if (currWidth > thinLimit) {
    width = 2;
} else {
    width = 1;
}

generateCards();

//Pull json and call a function to parse it
function generateCards() {
    clearCards();

    $.getJSON("data/create.json", function (json) {
        parseJSON(json);
    });
}

function clearCards(len) {
    var cards = document.getElementById("grid");
    cards.innerHTML = "";
}

function getWidth() {
    var viewWidth;

    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth != 'undefined') {
        viewWidth = window.innerWidth;
    }

    // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    else if (typeof document.documentElement != 'undefined' &&
        typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
        viewPortWidth = document.documentElement.clientWidth;
    }

    // older versions of IE
    else {
        viewPortWidth = document.getElementsByTagName('body')[0].clientWidth;
    }
    return viewWidth;
}

function onResize() {
    currWidth = getWidth();

    var widthChanged = false;
    if (currWidth > wideLimit) {
        if (width != 3) {
            width = 3;
            console.log("Showing 3 cards.")
            widthChanged = true;
        }
    } else if (currWidth > thinLimit) {
        if (width != 2) {
            width = 2;
            console.log("Showing 2 cards.")
            widthChanged = true;
        }
    } else {
        if (width != 1) {
            width = 1;
            console.log("Showing 1 card.")
            widthChanged = true;
        }
    }

    if (widthChanged) {
        generateCards();
    }
}

//Create cards from json
function parseJSON(json) {
    var art = json["art"];
    var i = 0;
    for (var key in art) {
        addImage(art[key], key, i)
        i++;
    }
}

//This function uses the id of card clicked on to pull data from JSON and fill the popup
function fillPopup(img) {
    //Get ID of anchor to pull data from
    var linkID = img.id.split("-")[0];

    //get data from anchor to fill in boxes
    var data = $("#" + linkID).data("json");

    if (typeof data !== 'undefined') {
        var popupTitle = document.getElementById("popupTitle")
        if (data["title"]) {
            popupTitle.innerText = data["title"];
        } else {
            popupTitle.innerText = "Untitiled";
        }

        if (data["artist"]) {
            popupTitle.innerText += " by " + data["artist"];
        }

        if (data["url"]) {
            var popupImg = document.getElementById("popupImg");
            popupImg.src = baseURL + data["url"];
        }

        if (data["description"]) {
            var popupBody = document.getElementById("popupBody");
            popupBody.innerText = data["description"];
        }
    }
}

//This function adds rows/images to grid as needed
//url is relative to base path, key is random string in json
function addImage(data, key, index) {
    var url = data["url"];

    // Create new row if needed
    if (currLen % width == 0) {
        var row = document.createElement("div")
        row.className = "row";
        container.appendChild(row);
        currRow = row;
    }

    // Create card container
    var imgDiv = document.createElement("div");
    imgDiv.className = "col";

    //Create link for popup
    var anchor = document.createElement("a");
    anchor.id = key;
    anchor.setAttribute("data-toggle", "modal");
    anchor.setAttribute("data-target", "#centralModalLg");
    anchor.setAttribute("data-json", JSON.stringify(data));
    imgDiv.appendChild(anchor);

    // Create image card to put in link
    var img = document.createElement("img");
    img.id = key + "-img";
    img.src = baseURL + url;
    img.className = "img-fluid";
    img.setAttribute("onclick", "fillPopup(this)")
    anchor.appendChild(img);

    // Append div to current row
    currRow.appendChild(imgDiv);

    currLen++;
}