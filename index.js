let express = require("express");
let app = express();
app.use(express.json());
app.use(express.static("static"));

let users = [];
let books = [];
let reviews = [];

function validateUser(user) {
  if (!user.name || typeof user.name !== "string") {
    return "Name is required and type should be string";
  }
  if (!user.email || typeof user.email !== "string") {
    return "Email is required and should be string type";
  }
  return null;
}

function validateBook(book) {
  if (!book.title || typeof book.title !== "string") {
    return "Title is required and should be string type";
  }
  if (!book.author || typeof book.author !== "string") {
    return "Author is required and should be string type";
  }
  return null;
}

app.post("/v1/users/new", async (req, res) => {
  let error = validateUser(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  let newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(200).json(newUser);
});

app.post("/v1/books/new", async (req, res) => {
  let error = validateBook(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  let newBook = { id: books.length + 1, ...req.body };
  users.push(newBook);
  res.status(200).json(newBook);
});

function validateReview(review) {
  if (!review.content || typeof review.content !== "string") {
    return "should have content and in string format";
  }
  if (!review.userId || typeof review.userId !== "number") {
    return "should have userid and in integer format";
  }
  return null;
}

app.post("/v1/reviews/new", (req, res) => {
  let error = validateReview(req.body);
  if (error) {
    return res.status(404).send(error);
  }
  let result = { id: reviews.length + 1, ...req.body };
  reviews.push(result);
  return res.status(200).json(result);
});

app.get("/reviews", (req, res) => {
  res.status(200).json(reviews);
});

app.get("/users", async (req, res) => {
  let result = await users;
  res.status(200).json(result);
});

module.exports = { app, validateUser, validateBook, validateReview };
