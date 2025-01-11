let request = require("supertest");
let { app, validateUser, validateBook, validateReview } = require("./index");

let http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3002, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API input validation testing", () => {
  it("should add new user", async () => {
    const result = await request(server)
      .post("/v1/users/new")
      .send({ name: "akash", email: "data@gmail.com" });
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual({
      id: 1,
      name: "akash",
      email: "data@gmail.com",
    });
  });

  it("should return 400 for invalid user name input", async () => {
    const result = await request(server)
      .post("/v1/users/new")
      .send({ email: "data@gmail.com" });
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual("Name is required and type should be string");
  });

  it("should return 400 for invalid user email input", async () => {
    const result = await request(server)
      .post("/v1/users/new")
      .send({ name: "omkar" });
    expect(result.statusCode).toBe(400);
    expect(result.text).toEqual("Email is required and should be string type");
  });

  it("should add new book", async () => {
    const result = await request(server)
      .post("/v1/books/new")
      .send({ title: "a new year", author: "akash mahadevan" });
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual({
      id: 1,
      title: "a new year",
      author: "akash mahadevan",
    });
  });

  it("should return 400 for invalid book input", async () => {
    const result = await request(server)
      .post("/v1/books/new")
      .send({ author: "akash" });
    expect(result.statusCode).toBe(400);
    expect(result.text).toEqual("Title is required and should be string type");
  });

  it("should add new review", async () => {
    const result = await request(server)
      .post("/v1/reviews/new")
      .send({ content: "post", userId: 1 });
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({
      id: 1,
      content: "post",
      userId: 1,
    });
  });

  it("should return 404 for invalid review content input", async () => {
    const result = await request(server)
      .post("/v1/reviews/new")
      .send({ userId: 1 });
    expect(result.statusCode).toBe(404);
    expect(result.text).toEqual("should have content and in string format");
  });
});
