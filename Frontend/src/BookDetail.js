import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import {
  Button,
  Modal,
  TextField,
  Typography,
  Box,
  Divider,
  Paper,
} from "@mui/material";
import HomeHeader from "./Home/HomeHeader";
import { GetBookById, UpdateBookById } from "./services/services.books";

const StarRating = ({ rating, setRating, disabled }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
      {stars.map((star) => (
        <span
          key={star}
          style={{
            color: star <= rating ? "#ffc107" : "#e4e5e9",
            fontSize: "36px",
            cursor: "pointer",
          }}
          onClick={() => {
            if (!disabled) {
              setRating(star);
            }
          }}
        >
          {star <= rating ? <StarIcon /> : <StarBorderIcon />}
        </span>
      ))}
    </div>
  );
}

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(0);
  const [bookRating, setBookRating] = useState(0)
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetBookById(id);
        if (response && response.status_code === 200) {
          setBook(response.data);
          setComments(response.data.comments);
          setLoading(false);
        }
        else {
          setLoading(false);
          toast.error("Problem Occurred while fetching book details.Please try after some time.");
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error("Problem Occurred while fetching book details.Please try after some time.");
      }
    };

    fetchData();
  }, [id]);

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("auth_token");
      const UserDetail = jwt_decode(token);
      let name = UserDetail.name
      let response = await UpdateBookById(id, {
        name: UserDetail.name,
        rating: bookRating,
        comment: comment,
      });
      if (response && response.status_code === 200) {
        setBookRating(0)
        setComment("")
        setShowModal(false);
        const com = [
          ...comments,
          { [UserDetail.name]: { comment: comment, rating: bookRating } },
        ];
        setComments(com);
        toast.success("Rating submitted successfully.");
      } else {
        setError("Error submitting rating. Please try again later.");
        toast.error("Error submitting rating. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while submitting rating.");
      toast.error("An error occurred while submitting rating.");
    }
  };

  const handleCancelBtn = (type) => {
    setShowModal(false)
    setBookRating(0)
    setComment('')
  }

  const handleLogout = () => {
    Cookies.remove("auth_token");
    toast.error("Loging Out")
    navigate("/");
  };

  return (
    <>
      <HomeHeader Logout={handleLogout} />
      <Box maxWidth="800px" margin="0 auto" height="510px">
        {loading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          book && (
            <Paper
  sx={{
    padding: "10px",
    display: "flex",
    alignItems: "center",
    marginBlock: "20px",
  }}
>
  <img
    src={book.image}
    alt={book.title}
    style={{
      width: "50%",
      height: "490px",
      objectFit: "cover",
      marginRight: "20px",
    }}
  />
  <div style={{ width: "50%", height: "490px" ,display:'flex' , flexDirection:'column',justifyContent:'space-between'}}>
    <div>
    <Typography variant="h6" gutterBottom>
      <strong>Title:</strong> {book.title}
    </Typography>
    <Typography variant="h6" gutterBottom>
      <strong>Author:</strong> {book.author}
    </Typography>
    <Typography variant="h6" gutterBottom>
      <strong>Genre:</strong> {book.genre}
    </Typography>
    <Typography variant="h6" gutterBottom maxHeight="200px" overflow="auto">
      <strong>Description:</strong> {book.description}
    </Typography>
    <Typography variant="h6"><strong>Comments:</strong></Typography>
    <Divider />
    </div>
    <Box my={2}>
      <Box maxHeight="200px" overflow="auto">
        {comments.map((commentObj, index) => {
          const commenterName = Object.keys(commentObj)[0];
          const { comment, rating } = commentObj[commenterName];
          return (
            <Box key={index} mt={2}>
              <Typography variant="body1">
                <strong>{commenterName}:</strong> {comment}
              </Typography>
              <StarRating rating={rating} disabled={true} />
            </Box>
          );
        })}
      </Box>
    </Box>
    
    <div><Button
      variant="contained"
      color="primary"
      onClick={() => setShowModal(true)}
      style={{ marginBottom: "20px" }}
    >
      Rate this book
    </Button>
    </div>
  </div>
</Paper>

          )
        )}
      </Box>
      <Modal open={showModal} onClose={() => {
        setBookRating(0)
        setComment("")
        setShowModal(false)
      }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            background: "#fff",
            padding: "20px",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" textAlign={"center"}>
            Rate this book
          </Typography>
          <StarRating
            rating={bookRating}
            setRating={setBookRating}
            disabled={false}
          />
          <TextField
            id="comment"
            label="Add a comment"
            multiline
            rows={4}
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleRatingSubmit}
              style={{ marginRight: "10px" }}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ backgroundColor: "#f0f0f0", color: "#000" }}
              onClick={() => handleCancelBtn('Cancel')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default BookDetails;
