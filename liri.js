require("dotenv").config();

const keys = require("./keys.js");
const axios = require("axios");
const Spotify = require("node-spotify-api");

const spotify = new Spotify(keys.spotify);

console.log(spotify);
function operate(command) {
    switch (command) {
        case `spotify-this-song`: 
            searchSpotify(process.argv[3]);
            break;

        case `movie-this`:
            movieFind(process.argv[3]);
            break;

        case `do-what-it-says`:
            randomRead(process.argv[3]);
            break;
    }
}
operate(process.argv[2]);

//SPOTIFY
// 2. `node liri.js spotify-this-song '<song name here>'`
//    * This will show the following information about the song in your terminal/bash window
//      * Artist(s)
//      * The song's name
//      * A preview link of the song from Spotify
//      * The album that the song is from
//    * If no song is provided then your program will default to "The Sign" by Ace of Base.

//SPOTIFY SEARCH FUNCTION
function searchSpotify (arg1) {
    spotify.search({type: "track", query: arg1}).then(response => {
        let trackArray = response.tracks.items;
        for (let i = 0; i < trackArray.length; i++) {
            console.log(`Artist:${response.tracks.items[i].artists[0].name}`);
            console.log(`Song: ${response.tracks.items[i].name}`);
            console.log(`Preview Link: ${response.tracks.preview_url}`);
            console.log(`Album: ${response.tracks.items[i].name}`);
            console.log("\r\n\r\n");
        }
    }).catch(err => console.log(err));
}



// //OMDB 
// 3. `node liri.js movie-this '<movie name here>'`

//    * This will output the following information to your terminal/bash window:

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'


//rando 

// 4. `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.