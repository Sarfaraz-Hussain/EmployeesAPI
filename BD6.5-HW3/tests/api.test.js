const request = require("supertest");
const { app, validateArticle, vali, validateAuthor } = require("../index.js");

const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  // validateEmployee: jest.fn(),
  // validateCompany: jest.fn(),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3006, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints to add data", () => {
  // Exercise 3: Test Add a New Article with Valid Input
  it("Should add a new article with valid input", async () => {
    const res = await request(server).post("/api/articles").send({
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 3,
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    });
  });

  // Exercise 4: Test Add a New Article with Invalid Input

  it("Should return 400 from invalid article input", async () => {
    const res = await request(server).post("/api/articles").send({
      title: "Mastering Node.js",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Content is required and should be a string.");
  });

  // // Exercise 5: Test Add a New Author with Valid Input
  it("Should add a new author with valid input", async () => {
    const res = await request(server).post("/api/authors").send({
      name: "Alice Johnson",
      articleId: 3,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 3,
      name: "Alice Johnson",
      articleId: 3,
    });
  });

  // Exercise 6: Test Add a New Author with Invalid Input
  it("Should return 400 from invalid author input", async () => {
    const res = await request(server).post("/api/authors").send({
      name: "Alice Johnson",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("ArticleId is required and should be a number.");
  });
});

describe("Validation Functions", () => {
  // Exercise 7: Test Article Validation Function with Jest Mocks
  it("Should validate article input correctly", () => {
    expect(
      validateArticle({
        title: "Mastering Node.js",
        content: "Node.js is a powerful tool for backend development...",
      }),
    ).toBeNull();
  });
  // Exercise 8: Test Article Validation Function Error Handling with Jest Mocks
  it("Should validate article with invalid input", () => {
    expect(validateArticle({ title: "Mastering Node.js" })).toEqual(
      "Content is required and should be a string.",
    );
    expect(
      validateArticle({
        content: "Node.js is a powerful tool for backend development...",
      }),
    ).toEqual("Title is required and should be a string.");
  });
  // Exercise 9: Test author Validation Function with Jest Mocks
  it("Should validate company input correctly", () => {
    expect(
      validateAuthor({
        name: "Alice Johnson",
        articleId: 3,
      }),
    ).toBeNull();
  });
  //  Exercise 10: Test author Validation Function Error Handling with Jest Mocks
  it("Should valid company with invalid input", () => {
    expect(
      validateAuthor({
        name: "Alice Johnson",
      }),
    ).toEqual("ArticleId is required and should be a number.");

    expect(
      validateAuthor({
        articleId: 3,
      }),
    ).toEqual("Name is required and should be a string.");
  });
});
