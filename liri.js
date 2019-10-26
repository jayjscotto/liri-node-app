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
function searchConcerts(arg) {
    axios({
            method: 'get',
            url:`https://rest.bandsintown.com/artists/${arg}/events?app_id=codingbootcamp&date=upcoming`,
            responseType: "JSON"
    })
    .then(response => {
            for (let i = 0; i < response.data.length; i++) {
                console.log(`Date: ${moment(`${response.data[i].datetime}`).format("MM/DD/YYYY")}`);
                console.log(`Venue: ${response.data[i].venue.name}`);
                console.log(`${response.data[i].venue.city}, ${response.data[i].venue.country}`);
                console.log(`Line-up: ${response.data[i].lineup.join(" ")}`);
                console.log(`\r`);
            }
    })
    .catch(err => console.log(err));
}

//SPOTIFY SEARCH FUNCTION
function searchSpotify (arg) {
    spotify.search({type: "track", query: arg}).then(response => {
        let trackArray = response.tracks.items;
        for (let i = 0; i < trackArray.length; i++) {
            console.log(`\r\n`);
            console.log(`Artist: ${response.tracks.items[i].artists[0].name}`);
            console.log(`Song: ${response.tracks.items[i].name}`);
            console.log(`Preview Link: ${response.tracks.items[i].preview_url}`);
            console.log(`Album: ${response.tracks.items[i].name}`);
            console.log(`\r`);
        }
    }).catch(err => console.log(err));
}


//OMDB SEARCH FUNCTION
function movieFind (arg) {
    if (!arg){
        arg = `Mr. Nobody`;
    } 
    axios.get(`http://www.omdbapi.com/?apikey=trilogy&t=${arg}`)
        .then(response => {
            console.log(`\r`);
            console.log(`Title: ${response.data.Title}`);
            console.log(`Release Year: ${response.data.Year}`);
            console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
            console.log(`Production Country/Countries: ${response.data.Country}`);
            console.log(`Language(s): ${response.data.Language}`);
            console.log(`\r`);
            console.log(`Plot: ${response.data.Plot}`);
            console.log(`\r`);
            console.log(`Actors: ${response.data.Actors}`);
            console.log(`\r`);

        })
        .catch(err => console.log(err))
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
    })
}
