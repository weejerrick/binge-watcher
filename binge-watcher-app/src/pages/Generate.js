import Medium from "../components/Medium";
import Genres from "../components/Genres";
import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
import Time from "../components/Time";
import Results from "../components/Results";
import dotenv from "dotenv";
dotenv.config();

/////////////
// Variables
/////////////

const APIKEY = process.env.REACT_APP_TMDB_API_KEY;
let tempTime = 0
let runTimeTotal = 0

const discoverURL = {
  base: "https://api.themoviedb.org/3/discover/",
  language: "en-US",
  sort: "popularity.desc",
  date: "2021",
  monetization: "flatrate",
};

const detailedURL = {
  base: "https://api.themoviedb.org/3/",
};

let fullShowData = [];
let curatedShows = []

export default function Generate() {
  const [mediumSelection, setMediumSelection] = useState("show");
  const [genreSelection, setGenreSelection] = useState(null);
  const [timeSelection, setTimeSelection] = useState(0);
  const [suggestions, setSuggestions] = useState([])

  /////////////////////
  // All click hanlders
  /////////////////////
  const handleMedium = (input) => {
    input === ""
      ? alert("please select a category")
      : setMediumSelection(input);
    console.log("medium selected:", input);
  };

  const handleGenre = (input) => {
    input === ""
      ? alert("please select at least one genre")
      : setGenreSelection(input.join("|"));
    console.log("geners passed:", input.join("|"));
  };

  //////////////////////////////////////
  // API Fetch and run time calculation
  //////////////////////////////////////
  const fetchShows = (input) => {
    setTimeSelection(input);
    console.log("medium selected:", mediumSelection);
    console.log("genre IDs:", genreSelection);
    console.log("time selected", input, "hours");
    console.log(input)
    tempTime = input

    const discoverFetch = async () => {
      const url = `${discoverURL.base}${mediumSelection}/?api_key=${APIKEY}&language=${discoverURL.language}&sort_by=${discoverURL.sort}&page=1&first_air_date_year=${discoverURL.date}&with_genres=${genreSelection}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`;
      const discoverResponse = await fetch(url);
      const discoverData = await discoverResponse.json();
      const showIDs = discoverData.results.map((show) => show.id);
      console.log(showIDs);

      const detailsFetch = async () => {
        for (const showID of showIDs) {
          const url2 = `${detailedURL.base}${mediumSelection}/${showID}?api_key=${APIKEY}&language=en-US`;
          const detailedResponse = await fetch(url2);
          const detailedData = await detailedResponse.json();
          fullShowData.push(detailedData);
        }
        console.log(fullShowData);

        let runtime = 0
        if (mediumSelection==="movie") {
          for (const movieData of fullShowData) {
            if(runtime < tempTime*60) {
              curatedShows.push(movieData)
              runtime += movieData.runtime
            } else {
              break;
            }
          }
        } 
        else if (mediumSelection==="tv") {
          for (const tvData of fullShowData) {
          if (runtime < tempTime * 60 * 10) {
            curatedShows.push(tvData)
            runtime +=
            (tvData.episode_run_time.length > 0
              ? tvData.episode_run_time[0]
              : tvData.episode_run_time) * tvData.number_of_episodes
          } else {
            break
          }
        }
      }
      runTimeTotal = runtime
      setSuggestions(curatedShows)
      console.log("HERE1", curatedShows)
      console.log("here2", suggestions)
      };
      detailsFetch();
    };
    discoverFetch();
  };

  return (
    <div>
      <Container>
        <Typography variant="h3" gutterBottom>Generate Watchplan</Typography>
        {mediumSelection === "show" ? (
          <Medium handleMedium={handleMedium} />
        ) : (
          ""
        )}
        {mediumSelection !== "show" && genreSelection === null ? (
          <Genres handleGenre={handleGenre} />
        ) : (
          ""
        )}
        {genreSelection !== null && timeSelection === 0 ? (
          <Time fetchShows={fetchShows} medium={mediumSelection} />
        ) : (
          ""
        )}
        {timeSelection !== 0 && <Results medium={mediumSelection} suggestions={suggestions} runtime={runTimeTotal}/>}
      </Container>
    </div>
  );
}
