import React from "react";
import {
  Modal,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { toast } from "react-toastify";
import { AddBooks, GetAllBooks } from "./services/services.books";

const AddBook = ({
  showModal,
  setShowModal,
  title,
  setTitle,
  author,
  setAuthor,
  genre,
  setGenre,
  description,
  setDescription,
  image,
  handleDrop,
  handleFileUpload,
  fileInputRef,
  handleUploadButtonClick,
  fileName,
  setAllBooks,
}) => {
  return (
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
            <Typography
              variant="h5"
              id="modal-modal-title"
              style={{ marginBottom: "20px" }}
            >
              Add a Book
            </Typography>
          </div>
          <div
            id="modal-modal-description"
            style={{
              maxHeight: "calc(100vh - 200px)",
              overflowY: "auto",
            }}
          >
            <label>
              Title <span style={{ color: "red" }}>*</span>
            </label>
            <TextField
              id="title"
              placeholder="Enter Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputProps={{ style: { height: "30px" } }}
              style={{ marginTop: "5px", marginBottom: "10px" }}
              required
            />
            <label style={{ marginTop: "10px" }}>
              Author <span style={{ color: "red" }}>*</span>
            </label>
            <TextField
              id="author"
              placeholder="Enter Author"
              fullWidth
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              InputProps={{ style: { height: "30px" } }}
              style={{ marginTop: "5px", marginBottom: "10px" }}
              required
            />
            <label style={{ marginTop: "10px" }}>
              Genre <span style={{ color: "red" }}>*</span>
            </label>
            <TextField
              id="genre"
              placeholder="Enter Genre"
              fullWidth
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              InputProps={{ style: { height: "30px" } }}
              style={{ marginTop: "5px", marginBottom: "10px" }}
              required
            />

            <label>
              Description <span style={{ color: "red" }}>*</span>
            </label>
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
                    // maxHeight: "300px",
                    margin: "10px auto",
                    objectFit:'cover'
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
                  if (title == "") {
                    var msg = "Title is required.";
                  } else if (author == "") {
                    var msg = "Author is required.";
                  } else if (description == "") {
                    var msg = "Description is required.";
                  } else if (image == null) {
                    var msg = "Image is required.";
                  } else if (genre == null) {
                    var msg = "Genre is required.";
                  } 
                  else {
                    let response = await AddBooks({
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
                  console.log(description == "");

                  var msg = "Something went wrong. Try after some time.";

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
  );
};

export default AddBook;
