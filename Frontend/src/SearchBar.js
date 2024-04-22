import React, { useEffect, useState, useRef } from "react";
import { Modal, Typography, TextField, Button, InputAdornment } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { AddBook, GetAllBooks } from "./services/services.books";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const SearchBar = ({ allBooks, books, setBooks, setAllBooks }) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("title");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [genre, setGenre] = useState(null);
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
          <AddIcon /> {/* Plus icon */}
          Add Book
        </Button>
      </div>

      {/* <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            padding: "20px",
            borderRadius: "5px",
            height: "70%",
            overflowY: "auto",
            maxWidth: "400px",
          }}
        >
          <div  >
            <Typography variant="h5" id="modal-modal-title" >Add a Book</Typography>
          </div>
          <div id="modal-modal-description" >
            <div
              style={{
                marginTop: "20px",
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
                backgroundColor: image ? "#f0f0f0" : "transparent",
              }}
              onDrop={handleDrop}
              onDragOver={(event) => event.preventDefault()}
              className={!image ? "drop-area-required" : ""}
            >
              <p>Drag and drop a JPEG image here</p>
              <p> OR </p>

              <input
                type="file"
                accept="image/jpeg"
                onChange={handleFileUpload}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={handleUploadButtonClick}
              >
                Upload Image
              </Button>
              {image && (
                <img
                  src={image}
                  alt="Book Cover"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    margin: "10px auto",
                  }}
                />
              )}
              {fileName && <p>File: {fileName}</p>}
            </div>
            <TextField
              id="title"
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ marginTop: "20px" }}
              required
            />
            <TextField
              id="author"
              label="Author"
              fullWidth
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              style={{ marginTop: "20px" }}
              required
            />
            <TextField
              id="description"
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ marginTop: "20px" }}
              required
            />
          </div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "flex-end",
            }}
            className="modal-footer"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                try {
                  let response = await AddBook({
                    image: image,
                    title: title,
                    author: author,
                    description: description,
                  });

                  if (response && response.status_code === 200) {
                    response = await GetAllBooks();
                    if (response && response.status_code === 200) {
                      setAllBooks(response.data);
                      toast.success("Book added successfully.");
                    }
                  }
                  setShowModal(false);
                } catch (error) {
                  console.error(error);
                  setShowModal(false);
                  toast.error("Failed to add book. Please try again later.");
                }
              }}
              style={{ marginRight: "10px" }}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal> */}


      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            padding: "20px",
            borderRadius: "5px",
            maxWidth: "400px",
          }}
        >
          <div>
            <Typography variant="h5" id="modal-modal-title" style={{ marginBottom: "20px" }}>Add a Book</Typography>
          </div>
          <div
            id="modal-modal-description"
            style={{
              maxHeight: "calc(100vh - 200px)",
              overflowY: "auto",
            }}
          >
            <label>Title <span style={{ color: "red" }}>*</span></label>
            <TextField
              id="title"
              placeholder="Enter Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputProps={{ style: { height: "30px" } }}
              style={{ marginTop: "5px" ,marginBottom:"10px" }}
              required
            />
            <label style={{ marginTop: "10px" }}>Author <span style={{ color: "red" }}>*</span></label>
            <TextField
              id="author"
              placeholder="Enter Author"
              fullWidth
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              InputProps={{ style: { height: "30px" } }}
              style={{ marginTop: "5px" ,marginBottom:"10px" }}
              required
            />
            <label style={{ marginTop: "10px" }}>Genre <span style={{ color: "red" }}>*</span></label>
            <TextField
              id="genre"
              placeholder="Enter Genre"
              fullWidth
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              InputProps={{ style: { height: "30px" } }}
              style={{ marginTop: "5px" ,marginBottom:"10px" }}
              required
            />

            <label>Description <span style={{ color: "red" }}>*</span></label>
            <TextField
              id="description"
              placeholder="Description"
              multiline
              rows={3}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ marginTop: "5px" }}
              required
            />
            <div
              style={{
                marginTop: "20px",
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
                backgroundColor: image ? "#f0f0f0" : "transparent",
              }}
              onDrop={handleDrop}
              onDragOver={(event) => event.preventDefault()}
              className={!image ? "drop-area-required" : ""}
            >
              <p>Drag and drop a JPEG image here</p>
              <p> OR </p>

              <input
                type="file"
                accept="image/jpeg/png"
                onChange={handleFileUpload}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={handleUploadButtonClick}
              >
                Upload Image
              </Button>
              {image && (
                <img
                  src={image}
                  alt="Book Cover"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    margin: "10px auto",
                  }}
                />
              )}
              {fileName && (
                <div style={{ marginTop: "10px" }}>
                  <p style={{ wordWrap: "break-word" }}>File: {fileName}</p>
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "flex-end",
            }}
            className="modal-footer"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                try {
                  if (title == '') {
                    var msg = "Title is required."
                  } else if (author == '') {
                    var msg = "Author is required."
                  } else if (description == '') {
                    var msg = "Description is required."
                  } else if (image == null) {
                    var msg = "Image is required."
                  } else {

                    let response = await AddBook({
                      image: image,
                      title: title,
                      author: author,
                      genre: genre,
                      description: description,
                    });
                    if (response && response.status_code === 200) {
                      response = await GetAllBooks();
                      if (response && response.status_code === 200) {
                        setAllBooks(response.data);
                        toast.success("Book added successfully.");
                      }
                    }
                  
                  setShowModal(false);
                }
                } catch (error) {
                  console.log(description == '');
                 
                 
                  var msg = "Something went wrong. Try after some time."
                  
                  // setShowModal(false);
                  
                }
                toast.error(msg);
              }}
              style={{ marginRight: "10px" }}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ backgroundColor: "#f0f0f0", color: "#000" }}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SearchBar;
