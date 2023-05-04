import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const URL = "http://localhost:5000/books";

  const [book, setBook] = useState({
    title: "",
    decription: "",
    cover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();

    axios
      .post(URL, book)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <form className="form">
      <h1>Add New Book</h1>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="description"
        onChange={handleChange}
        name="description"
      />
      <input
        type="text"
        placeholder="cover"
        onChange={handleChange}
        name="cover"
      />
      <button className="formbtn" onClick={handleClick}>Add</button>
    </form>
  );
};

export default Add;
