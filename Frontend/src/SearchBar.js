import React, { useEffect, useState, useRef } from "react";
import { Modal, Typography, TextField, Button, InputAdornment } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { AddBooks, GetAllBooks } from "./services/services.books";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AddBook from "./AddBook";

const SearchBar = ({ allBooks, books, setBooks, setAllBooks }) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("title");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [genre, setGenre] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === "image/jpeg") {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/jpeg") {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    // console.log(filter, allBooks);
    const filtered = allBooks.filter((book) =>
      // console.log(book[filter]),
      book[filter].toLowerCase().includes(query.toLowerCase())
    );
    setBooks(filtered);
  }, [query, filter, allBooks]);

  const handleAddBtn = () => {
    setShowModal(true)
    resetInput()
  }

  const resetInput = () => {
    setTitle('')
    setAuthor('')
    setGenre('')
    setDescription('')
    setImage(null)
    setFileName('')
  }

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "30px",
        padding: "8px 4px",
        marginBottom: "10px",
        marginTop: "10px",
      }}
    >
      <div style={{ display: "flex", height: "100%" }}>
        <select
          value={filter}
          onChange={handleFilterChange}
          style={{ height: "100%", marginRight: "5px", width: "100px" }}
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="description">Genre</option>
        </select>
        <TextField
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for books..."
          InputProps={{
            style: {
              height: "30px",
            },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddBtn()}
          style={{
            border: "none",
            cursor: "pointer",
            outline: "none",
            display: "flex",
            alignItems: "center",
            borderRadius: "20px",
          }}
        >
          <AddIcon />
          Add Book
        </Button>
      </div>
      <AddBook 
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          description={description}
          setDescription={setDescription}
          showModal={showModal}
          setShowModal={setShowModal}
          image={image}
          setImage={setImage}
          genre={genre}
          setGenre={setGenre}
          fileName={fileName}
          handleUploadButtonClick={handleUploadButtonClick}
          handleDrop={handleDrop}
          handleFileUpload={handleFileUpload}
          fileInputRef={fileInputRef}
          setAllBooks={setAllBooks}
      />
    </div>
  );
};

export default SearchBar;
