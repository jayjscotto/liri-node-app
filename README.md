# liri-node-app

Language Interpretation and Recognition Interface app using NodeJS, and the BandsInTown, and Spotify APIs.
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.


## Commands:

`find-my-show` : find concerts for your favorite band 
`spotify-this-song` : Spotify search your favorite song
`movie-this` : search OMDB for your favorite movie
`do-what-it-says` : reads from random.txt file and executes the command & search term inside the file


## Usage:

To use this project you'll need:
    >NodeJS
    >[Axios][axios], 
    >[Spotify][node-spotify-api], 
    >[Moment][moment], 
    >[Dotenv][dotenv]

Installation of all dependencies is handled via npm:

    npm install

Please note that the following are also necessary to make the API requests:

    Spotify ID, Spotify Secret

These can be attained by creating an account or logging in to:

    https://developer.spotify.com/


## Demo:

1) COMMAND: run `$node liri.js find-my-show [Band/Artist Name Here]` ex: Metallica
Result:
![find-my-show-img](./images/bands_in_town_snippet.PNG?raw=true "BandsInTown")

2) COMMAND: run `$node liri.js spotify-this-song [Song Name Here]` ex: All The Small Things
Result:
![spotify-this-song-img](./images/spotify_this.jpg?raw=true "Spotify")

3) COMMAND: run `$node liri.js movie-this [Movie Name Here]` ex: Rush Hour 3
Result:
![movie-this-img](./images/movie_this.jpg?raw=true "OMDB")

4) COMMAND: run `$node liri.js do-what-it-says` 
Result:
(Reads from random.txt and files that as the command and search parameter)
![random-command-result](./images/doWhatItSays.jpg?raw=true "random result")
![random-command-img](./images/randomCommand.jpg?raw=true "random txt")

5) Logs:
Each command, search term and corresponding results are logged to the log.txt file.
![Log Results](./images/log.jpg?raw=true "log results")


## Contributors:
Jason Scotto

