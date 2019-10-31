require("dotenv").config();

//require modules
const fs = require("fs");
const Find = require("./search");
var find = new Find();

//OPERATE FUNCTION
function operate(command, searchTerm) {

    let logData = `\r\n Command: ${command} Search Parameter: ${searchTerm} \r\n`
    find.appendLog(logData);

    switch (command) {
        //bandsintown function
        case `find-my-show`:
            find.searchConcerts(searchTerm);
            break;

        //spotify function
        case `spotify-this-song`: 
            find.searchSpotify(searchTerm);
            break;

        //omdb function
        case `movie-this`:
            find.movieFind(searchTerm);
            break;

        //file-system function
        case `do-what-it-says`:
            randomRead(searchTerm);
            break;
        default:
            operate(`spotify-this-song`, `Kickstart My Heart`);
            break;
    }
}
//call the function with command line arguments
operate(process.argv[2], process.argv.slice(3).join(" "));

//random search
function randomRead(arg) {
    fs.readFile("./random.txt", "utf-8", function (err, data) {
        if (err) {
            console.log(err);
        }

        //takes data returned from the readFile method 
        //adds it to an array
        //first index of the array is the command param to operate();
        //remaining indexes are the searchTerm param to operate();
        let argArray = data.split(" ");
        let searchCommand = argArray[0];
        let searchContent = argArray.splice(1).join(" ");

        //function call
        operate(searchCommand, searchContent);
    }); 
}