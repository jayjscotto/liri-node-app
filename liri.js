require("dotenv").config();

//require modules
const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const fs = require("fs")
const spotify = new Spotify(keys.spotify);

//OPERATE FUNCTION
function operate(command, searchTerm) {
    appendLog(`\r\n Command: ${command} Search Parameter: ${searchTerm} \r\n`);
    switch (command) {
        //bandsintown function
        case `find-my-show`:
            searchConcerts(searchTerm);
            break;

        //spotify function
        case `spotify-this-song`: 
            searchSpotify(searchTerm);
            break;

        //omdb function
        case `movie-this`:
            movieFind(searchTerm);
            break;

        //file-system function
        case `do-what-it-says`:
            randomRead(searchTerm);
            break;
    }
}
operate(process.argv[2], process.argv.slice(3).join(" "));


//BANDSinTOWN
function searchConcerts (arg) {
    axios({
            method: 'get',
            url:`https://rest.bandsintown.com/artists/${arg}/events?app_id=codingbootcamp&date=upcoming`,
            responseType: "JSON"
    })
    .then(response => {
        for (let i = 0; i < response.data.length; i++) {

            data = `\r\n Date: ${moment(`${response.data[i].datetime}`).format("MM/DD/YYYY")} \r\n Venue: ${response.data[i].venue.name} \n ${response.data[i].venue.city}, ${response.data[i].venue.country} \r\n Line-up: ${response.data[i].lineup.join(" ")} \r\n`

            console.log(data);
            appendLog(data)
        }

    }).catch(err => console.log(err));
}

//SPOTIFY SEARCH FUNCTION
function searchSpotify (arg) {
    if (!arg){
        arg = `The Sign`;
    } 
    spotify.search({type: "track", query: arg})
        .then(response => {
        for (let i = 0; i < response.tracks.items.length; i++) {

            data = `\n\r Artist: ${response.tracks.items[i].artists[0].name} \r\n Song: ${response.tracks.items[i].name} \r\n Preview Link: ${response.tracks.items[i].preview_url} \r\n Album: ${response.tracks.items[i].name} \r\n`;

            console.log(data);
            appendLog(data);
        }
        })
        .catch(err => console.log(err));
}


//OMDB SEARCH FUNCTION
function movieFind (arg) {
    if (!arg){
        arg = `Mr. Nobody`;
    } 
    axios.get(`http://www.omdbapi.com/?apikey=trilogy&t=${arg}`)
        .then(response => {

            data = `\r\n Title: ${response.data.Title} \n\r Release Year: ${response.data.Year} \n\r IMDB Rating: ${response.data.Ratings[0].Value} \n\r Rotten Tomatoes Rating: ${response.data.Ratings[1].Value} \n\r Production Country/Countries: ${response.data.Country} \n\r Language(s): ${response.data.Language} \n\r Plot: ${response.data.Plot} \n\r Actors: ${response.data.Actors} \n\r`;
        
            console.log(data);
            appendLog(data);
        }).catch(err => console.log(err));
}


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

//append log file with output of each function
function appendLog(info) {
    fs.appendFile("./log.txt", info, function (err) {
        if (err) {
            console.log(err);
        }
    })
}