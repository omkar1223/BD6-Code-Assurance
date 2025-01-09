let express = require("express");
let app = express();
app.use(express.json());
app.use(express.static("static"));

let users = [];
let books = [];

function validateUser(user) {
  if (!user.name || typeof user.name !== "string") {
    return "Name is required and type should be string";
  }
  if (!user.email || typeof user.email !== "string") {
    return "Email is required and should be string type";
  }
}

function validateBook(book) {
  if (!book.title || typeof book.title !== "string") {
    return "Title is required and should be string type";
  }
  if (!book.author || typeof book.author !== "string") {
    return "Author is required and should be string type";
  }
}

app.post("/v1/api/users/new", async (req, res) => {
  let error = validateUser(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  let newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(200).json(newUser);
});

app.post("/v1/api/books/new", async (req, res) => {
  let error = validateBook(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  let newBook = { id: books.length + 1, ...req.body };
  users.push(newBook);
  res.status(200).json(newBook);
});

module.exports = { app };
