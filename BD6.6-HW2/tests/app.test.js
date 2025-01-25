const request = require("supertest");
const { getAllGames } = require("../controllers");
const { app } = require("../index");

const http = require("http");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllGames: jest.fn(),
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

  // Exercise 5: Mock the Get All Game Function
  it("should return all games", () => {
    let mockedGames = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ];

    getAllGames.mockReturnValue(mockedGames);
    let result = getAllGames();
    expect(result).toEqual(mockedGames);
    expect(result.length).toBe(3);
  });
});

describe("API Endpoints Testing", () => {
  // Exercise 3: Test Retrieve All Games
  it("GET /games should get all games", async () => {
    let result = await request(server).get("/games");
    expect(result.status).toBe(200);
    expect(result.body.games).toEqual([
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ]);
  });
  // Exercise 4: Test Retrieve Game by ID
  it("GET /games/details/:id should return game by ID", async () => {
    let result = await request(server).get("/games/details/1");
    expect(result.status).toBe(200);
    expect(result.body.game).toEqual({
      gameId: 1,
      title: "The Legend of Zelda: Breath of the Wild",
      genre: "Adventure",
      platform: "Nintendo Switch",
    });
  });
});
