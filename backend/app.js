const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aa1924aa",
  database: "test",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello this is the backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`description`,`cover`) VALUES (?)";
  const values = [req.body.title, req.body.description, req.body.cover];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created.");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted.");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title` = ?, `description` = ?, `cover` = ? WHERE id = ?";
  const values = [req.body.title, req.body.description, req.body.cover];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated.");
  });
});

app.listen(5000, () => {
  console.log("API running on port: 5000");
});
