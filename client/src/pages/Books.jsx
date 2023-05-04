import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const URL = "http://localhost:5000/books";

  useEffect(() => {
    const getAllBooks = () => {
      axios
        .get(URL)
        .then((res) => setBooks(res.data))
        .catch((err) => console.log(err));
    };
    getAllBooks();
  }, []);

  const handleDelete = (id) => {
    const URL = `http://localhost:5000/books/${id}`;
    axios
      .delete(URL)
      .then(window.location.reload())
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>AC Books Store</h1>
      <div className="books">
        {books.map((book, index) => (
          <div key={index} className="book">
            {book.cover && <img src={book.cover} alt="book" />}
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Add new book</Link>
      </button>
    </div>
  );
};

export default Books;
