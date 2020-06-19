//variables used in addImage
var currLen = 0;
var currRow;
var container = document.getElementById("grid");
var baseURL = "https://github.com/reyluno/isolatingtogether.github.io/raw/master/img/create/";
var imgData = ['AlbertGwo2.jpg', 'RommelNunez3.jpg', 'AlbertGwo8.jpg', 'AlbertGwo5.jpg',
    'KyleeDanks1.png', 'RubaNadar1.jpeg', 'AdeBalogun2.jpg', 'AlbertGwo12.jpg', 'AlbertGwo11.jpg', 'ElianaRodgers3.jpg', 'RobertHunter.jpg', 'ElianaRodgers2.jpg', 'RubaNadar2.jpeg', 'CarlosOchoa1.jpg', 'RommelNunez1.jpg', 'AlbertGwo10.jpg', 'AlbertGwo4.jpg', 'GrantPace2.png', 'GrantPace1.jpg', 'LukeBolster4.jpg', 'AlbertGwo1.jpg', 'ElianaRodgers1.jpg', 'LukeBolster3.jpg', 'AlbertGwo6.JPG', 'AdeBalogun3.jpg', 'RubaNadar4.jpeg', 'AlbertGwo9.jpg', 'MadeleineMueller.jpeg', 'LukeBolster2.jpg', 'AlbertGwo7.jpg', 'CameronLee.jpg', 'RubaNadar3.jpeg', 'RommelNunez2.jpg', 'AdeBalogun1.jpg', 'FergusCampbell.gif', 'AshleyJiao.png', 'AlbertGwo3.jpg', 'LukeBolster1.jpeg'
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