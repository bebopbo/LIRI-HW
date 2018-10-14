const keys = require("./keys.js");
const env = require("dotenv").config();
const inquirer = require("inquirer");
const moment = require("moment");

const command = process.argv[2];
const query = process.argv[3];

const spotifyThis = (spotifySong) => {

    const spotify = require("node-spotify-api");


    if (spotifySong === undefined) {
        spotifySong = "The Sign";

    } else {

        spotify.search({ type: 'track', query: spotifySong }, function (error, data) {
            if (error) {
                console.log('Error: ' + error);
            } else {
                for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
                    if (i === 0) {

                        console.log("Artist(s):    " + data.tracks.items[0].artists[i].name);
                        console.log("Song:         " + data.tracks.items[0].name);
                        console.log("Preview Link: " + data.tracks.items[0].preview_url);
                        console.log("Album:        " + data.tracks.items[0].album.name);
                    } else {
                        console.log("    ERRoR    ");
                    };
                };

            };


        });
    }
}

const movieThis = (movieSearch) => {

    const request = require("request");


    if (movieSearch === undefined) {
        movieSearch = "Mr. Nobody";
    }

    request("http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&r=json", function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("* Title of the movie:         " + JSON.parse(body).Title);
            console.log("* Year the movie came out:    " + JSON.parse(body).Year);
            console.log("* IMDB Rating of the movie:   " + JSON.parse(body).imdbRating);
            console.log("* Country produced:           " + JSON.parse(body).Country);
            console.log("* Language of the movie:      " + JSON.parse(body).Language);
            console.log("* Plot of the movie:          " + JSON.parse(body).Plot);
            console.log("* Actors in the movie:        " + JSON.parse(body).Actors);

            for (var i = 0; i < JSON.parse(body).Ratings.length; i++) {

                if (JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {

                    console.log("* Rotten Tomatoes Rating:     " + JSON.parse(body).Ratings[i].Value);
                    
                    if (JSON.parse(body).Ratings[i].Website !== undefined) {

                        console.log("* Rotten Tomatoes URL:        " + JSON.parse(body).Ratings[i].Website);
                    }
                }
            }
        }
    });
}

if (command === "spotify-this-song") {
    spotifyThis(spotifySong);

} else if

   (command === "movie-this") {
    movieThis(movieSearch);
}