# liri-node-app

Language Interpretation and Recognition Interface app using NodeJS, and the BandsInTown, and Spotify APIs.
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

## Commands:
`find-my-show` : find concerts for your favorite band
`spotify-this-song` : Spotify search your favorite song
`movie-this` : search OMDB for your favorite movie


## Usage:

To use this project you'll need:

    [Axios][axios], 
    [Spotify][node-spotify-api], 
    [Moment][moment], 
    [Dotenv][dotenv]

Installation of all dependencies is handled via npm:

    npm install


Next, create a `.env` file and add the following to it, replacing the values with your API keys once you have them:

```
SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
```

## Contributors:
Jason Scotto

