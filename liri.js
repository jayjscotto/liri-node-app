require("dotenv").config();

const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);


//OPERATE FUNCTION
function operate(command) {
    let searchTerm = process.argv.slice(3).join(" ");

    switch (command) {
        case `find-my-show`:
            searchConcerts(searchTerm);
            break;

        case `spotify-this-song`: 
            searchSpotify(searchTerm);
            break;

        case `movie-this`:
            movieFind(searchTerm);
            break;

        case `do-what-it-says`:
            randomRead(searchTerm);
            break;
    }
}
operate(process.argv[2]);


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
                console.log(`\r\n`);
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
            console.log(`Artist:${response.tracks.items[i].artists[0].name}`);
            console.log(`Song: ${response.tracks.items[i].name}`);
            console.log(`Preview Link: ${response.tracks.items[i].preview_url}`);
            console.log(`Album: ${response.tracks.items[i].name}`);
            console.log(`\r\n`);
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
            console.log(`\r\n`);
            console.log(`Title: ${response.data.Title}`);
            console.log(`Release Year: ${response.data.Year}`);
            console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
            console.log(`Production Country/Countries: ${response.data.Country}`);
            console.log(`Language(s): ${response.data.Language}`);
            console.log(`\r\n`);
            console.log(`Plot: ${response.data.Plot}`);
            console.log(`\r\n`);
            console.log(`Actors: ${response.data.Actors}`);
            console.log(`\r\n`);

        })
        .catch(err => console.log(err))
}


//rando 

// 4. `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.