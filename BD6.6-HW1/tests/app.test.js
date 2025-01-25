const request = require("supertest");
const { getAllMovie } = require("../controllers");
const { app } = require("../index");

const http = require("http");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllMovie: jest.fn(),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3007, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Controller Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Exercise 5: Mock the Get All Movie Function
  it("should return all movies", () => {
    let mockedMovies = [
      {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      },
      {
        movieId: 2,
        title: "The Shawshank Redemption",
        genre: "Drama",
        director: "Frank Darabont",
      },
      {
        movieId: 3,
        title: "The Godfather",
        genre: "Crime",
        director: "Francis Ford Coppola",
      },
    ];

    getAllMovie.mockReturnValue(mockedMovies);
    let result = getAllMovie();
    expect(result).toEqual(mockedMovies);
    expect(result.length).toBe(3);
  });
});

describe("API Endpoints Testing", () => {
  // Exercise 3: Test Retrieve All Movies
  it("GET /movies should get all movies", async () => {
    let result = await request(server).get("/movies");
    expect(result.status).toBe(200);
    expect(result.body.movies).toEqual([
      {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      },
      {
        movieId: 2,
        title: "The Shawshank Redemption",
        genre: "Drama",
        director: "Frank Darabont",
      },
      {
        movieId: 3,
        title: "The Godfather",
        genre: "Crime",
        director: "Francis Ford Coppola",
      },
    ]);
  });
  // Exercise 4: Test Retrieve Employee by ID
  it("GET /movies/details/:id should return movie by ID", async () => {
    let result = await request(server).get("/movies/details/1");
    expect(result.status).toBe(200);
    expect(result.body.movie).toEqual({
      movieId: 1,
      title: "Inception",
      genre: "Sci-Fi",
      director: "Christopher Nolan",
    });
  });
});
