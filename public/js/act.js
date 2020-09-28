// set our variables
firebase.analytics();
const filePath = "./data/States.xlsx";
var baseURL = "https://github.com/reyluno/isolatingtogether.github.io/raw/master/img/act/";
var viewer = document.getElementById('dataviewer');
var data = [];
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

//Default selection is New York
entry("New York");

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

function importFile(state) {
    // use loading function to get file from server-side
    fetch(filePath).then(function (res) {
            // data as arraybuffer
            if (!res.ok) throw new Error("importing failed");
            return res.arrayBuffer();
        })
        .then(function (ab) {
            var data = new Uint8Array(ab);
            var workbook = XLSX.read(data, {
                type: "array"
            });

            var worksheet = workbook.Sheets[state];
            var _JsonData = XLSX.utils.sheet_to_json(worksheet, {
                raw: true
            });

            clearCards(_JsonData.length);
            _JsonData.forEach(createCard);
            data = _JsonData;
        });
}

// this will be our entry point to the parsing
function entry(state) {
    importFile(state);
}

function clearCards(len) {
    var cards = document.getElementById("card_container");

    if (len == 0) {
        cards.innerHTML = "<p>No cards found.</p>";
    } else {
        cards.innerHTML = "";
    }
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
        clearCards(data.length);
        data.forEach(createCard);
    }
}


function createCard(item, index) {
    var cards = document.getElementById("card_container");
    data[index] = item;

    var row_id = "row" + Math.trunc(index / width);

    if (index % width == 0) {
        if (index != 0) {
            cards.innerHTML += '</div>';
        }

        cards.innerHTML += '<div class="row" id="' + row_id + '" >';
    }

    var temp = document.getElementsByTagName("template")[0];
    var clone = temp.content.cloneNode(true);

    //Update Title
    if (item.hasOwnProperty("Name")) {
        var title = clone.getElementById("temp-title");
        title.id += index;
        title.innerText = item["Name"];
    }

    //Update Description
    if (item.hasOwnProperty("Details")) {
        var desc = clone.getElementById("temp-desc");
        desc.id += index;
        desc.innerText = item["Details"];
    }

    //Update Image ID and Tag if needed
    var img = clone.getElementById("temp-img");
    img.id += index;

    if (item.hasOwnProperty("Type")) {
        var tag = item["Type"];

        if (tag == "Mutual Aid") {
            img.src = baseURL + "mutualAid.jpeg";
        } else if (tag == "Donate") {
            img.src = baseURL + "donation.jpeg";
        } else if (tag == "Volunteer") {
            img.src = baseURL + "volunteer.jpg";
        } else if (tag == "Central Resource") {
            img.src = baseURL + "centralResource.jpeg";
        } else if (tag == "NSRN") {
          img.src = baseURL + "NSRN.jpeg";
        }
    }

    //Update Location
    if (item.hasOwnProperty("Location")) {
        var location = clone.getElementById("temp-location");
        location.id += index;
        location.innerText = item["Location"];
    }

    if (item.hasOwnProperty("Link")) {
        var anchor1 = clone.getElementById("temp-img-link");
        anchor1.id += index;

        var anchor2 = clone.getElementById("temp-link");
        anchor2.id += index;

        anchor1.href = item["Link"];
        anchor2.href = item["Link"];
    }

    document.getElementById(row_id).appendChild(clone);
}
