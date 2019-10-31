const axios = require("axios");
const keys = require("./keys.js");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const fs = require("fs");

const spotify = new Spotify(keys.spotify);


var Find = function() {

    //BANDSINTOWN SEARCH FUNCTION
    this.searchConcerts = function (arg) {
        axios({
            method: 'get',
            url:`https://rest.bandsintown.com/artists/${arg}/events?app_id=codingbootcamp&date=upcoming`,
            responseType: "JSON"
    })
    .then(response => {
        for (let i = 0; i < response.data.length; i++) {

            data = `\r\n Date: ${moment(`${response.data[i].datetime}`).format("MM/DD/YYYY")} \r\n Venue: ${response.data[i].venue.name} \n ${response.data[i].venue.city}, ${response.data[i].venue.country} \r\n Line-up: ${response.data[i].lineup.join(" ")} \r\n`

            console.log(data);
            this.appendLog(data);
        }
    }).catch(err => console.log(err));
    }

    //SPOTIFY SEARCH FUNCTION
    this.searchSpotify = function (arg) {
        if (!arg){
            arg = `The Sign`;
        } 
        spotify.search({type: "track", query: arg})
            .then(response => {
            let info = response.tracks

            for (let i = 0; i < response.tracks.items.length; i++) {
                data = `\n\r Artist: ${info.items[i].artists[0].name} \r\n Song: ${info.items[i].name} \r\n Preview Link: ${info.items[i].preview_url} \r\n Album: ${info.items[i].name} \r\n`;

                console.log(data);
                this.appendLog(data);
            }
            })
            .catch(err => console.log(err));
    }


    //OMDB SEARCH FUNCTION
    this.movieFind = function (arg) {
        if (!arg){
            arg = `Mr. Nobody`;
        } 
        axios.get(`http://www.omdbapi.com/?apikey=trilogy&t=${arg}`)
            .then(response => {
                let info = response.data;

                data = `\r\n Title: ${info.Title} \n\r Release Year: ${info.Year} \n\r IMDB Rating: ${info.Ratings[0].Value} \n\r Rotten Tomatoes Rating: ${info.Ratings[1].Value} \n\r Production Country/Countries: ${info.Country} \n\r Language(s): ${info.Language} \n\r Plot: ${info.Plot} \n\r Actors: ${info.Actors} \n\r`;
            
                console.log(data);
                this.appendLog(data);
            }).catch(err => console.log(err));
    }

    //append log file with output of each function
    this.appendLog = function (info) {
        fs.appendFile("./log.txt", info, function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
};


module.exports = Find;