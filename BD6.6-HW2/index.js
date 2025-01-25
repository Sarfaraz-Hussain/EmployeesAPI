let express = require("express");
let app = express();
let cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(express.json());

const { getAllGames, getGameById } = require("./controllers");

// Exercise 1: Retrieve All Games
app.get("/games", async (req, res) => {
  let games = getAllGames();
  res.json({ games });
});

// Exercise 2: Retrieve Game by ID
app.get("/games/details/:id", async (req, res) => {
  let game = getGameById(parseInt(req.params.id));
  res.json({ game });
});

module.exports = {
  app,
};
