let express = require("express");
let app = express();
let cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(express.json());

const { getAllMovie, getMovieById } = require("./controllers");

// Exercise 1: Retrieve All Movies
app.get("/movies", async (req, res) => {
  let movies = getAllMovie();
  res.json({ movies });
});

// Exercise 2: Retrieve Movie by ID
app.get("/movies/details/:id", async (req, res) => {
  let movie = getMovieById(parseInt(req.params.id));
  res.json({ movie });
});

module.exports = {
  app,
};
