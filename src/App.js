import React, { useState, useEffect } from "react";

import {
  Typography,
  AppBar,
  Toolbar,
  Grid,
  Card,
  Box,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card2 from "./Card2";

const useStyles = makeStyles({
  box: { display: "flex", flexDirection: "column" },
  appBar: { display: "flex", flexDirection: "row" },
  grid: {
    padding: "24px",
    backgroundColor: "black",
    width: "100vw",
    marginTop: "0px",
    marginLeft: "0px",
    justifyContent: "center",
  },
  card: { height: "425px", width: "300px" },
});

function App() {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const SEARCH_API =
    "https://api.themoviedb.org/3/search/movie?&api_key=44bbf69196f500f79d6c850ce7671586&query=";

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      axios.get(SEARCH_API + searchTerm).then((res) => {
        setMovies(res.data.results);
      });
      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchMovies = async () => {
    try {
      await axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=223f703010a6a483e7b42e200f3b132c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
        )
        .then((res) => {
          setMovies(res.data.results);
          console.log(res.data.results);
        });
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return !loading ? (
    <CircularProgress color="textSecondary" />
  ) : (
    <Box className={classes.box} borderTop={1}>
      <AppBar
        className={classes.appBar}
        position="static"
        color="textSecondary"
        xs={12}
      >
        <Toolbar style={{ flex: "1 0 auto" }}>
          <Typography variant="h6" color="textPrimary">
            MOVIES CENTRAL
          </Typography>
        </Toolbar>
        <form onSubmit={handleOnSubmit}>
          <TextField
            style={{ paddingRight: "20px" }}
            id="standard-basic"
            color="textPrimary"
            value={searchTerm}
            onChange={handleOnChange}
            label="Search Movies..."
          />
        </form>
      </AppBar>
      <Grid container spacing={10} xs={12} lg={12} className={classes.grid}>
        {movies.length > 0 &&
          movies.map((movie) => {
            return (
              <Grid item>
                <Card my={10} className={classes.card}>
                  <Card2 key={movie.id} {...movie} />
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}

export default App;
