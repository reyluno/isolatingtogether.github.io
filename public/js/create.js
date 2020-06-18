//variables used in addImage
var currLen = 0;
var currRow;
var container = document.getElementById("grid");
var baseURL = "https://github.com/reyluno/isolatingtogether.github.io/raw/master/img/create/";
var imgData = ["AdeBalogun1.jpg", "ElianaRodgers3.jpg", "LukeBolster3.jpg", "RommelNunez3.jpg", "AdeBalogun2.jpg",
    "FergusCampbell1.gif", "LukeBolster4.jpg", "RubaNadar1.jpeg", "AdeBalogun3.jpg", "GrantPace1.jpg",
    "MadeleineMueller1.jpeg", "RubaNadar2.jpeg", "AshleyJiao1.png", "GrantPace2.png", "RobertHunter1.jpg",
    "RubaNadar3.jpeg", "ElianaRodgers1.jpg", "KyleeDanks1.png", "RommelNunez1.jpg", "RubaNadar4.jpeg",
    "ElianaRodgers2.jpg", "LukeBolster2.jpg", "RommelNunez2.jpg"
];

imgData.forEach(addImage);

//This function adds rows/images to grid as needed
function addImage(url, index) {
    // Create new row if needed
    // TODO: This is hardcoded, not responsive
    if (currLen % 3 == 0) {
        var row = document.createElement("div")
        row.className = "row";
        container.appendChild(row);
        currRow = row;
    }

    // Create container for image
    var imgDiv = document.createElement("div");
    imgDiv.className = "col-6 col-md-4";

    //Create link to download wrap around img
    var anchor = document.createElement("a");
    anchor.href = baseURL + url;
    anchor.target = "_blank";
    imgDiv.appendChild(anchor);

    // Create image
    var img = document.createElement("img");
    img.src = baseURL + url;
    img.className = "img-fluid";
    anchor.appendChild(img);

    // Create Caption
    var myRegexp = /^[A-Z][-a-z]+/
    var firstName = myRegexp.exec(url);
    var lastName = myRegexp.exec(url.substring(firstName[0].length, url.length));

    var caption = document.createElement("div");
    caption.className = "caption text-center";
    caption.innerText = "Art by " + firstName + " " + lastName;
    imgDiv.appendChild(caption);

    // Append div to current row
    currRow.appendChild(imgDiv);

    currLen++;
}