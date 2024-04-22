import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from "react";
import Cookies from "js-cookie";
import jwt_decode from 'jwt-decode';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import "./HomePage.css";
import HomeHeader from './HomeHeader';
import SearchBar from '../SearchBar';
import { toast } from 'react-toastify';
import { GetAllBooks } from '../services/services.books';

const Home = () => {
  const [books,setBooks] = useState([])
  const [allBooks,setAllBooks] = useState([])
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("auth_token");
    toast.error("Problem Occurred,Please Login Again.")
    navigate("/");
  };

  useEffect(() => {
    let decodedtoken = Cookies.get('auth_token') || "";
    if(decodedtoken){
      const tokenData = jwt_decode(decodedtoken) || null;
      const expiryTime = tokenData.exp * 1000;
      const currentTime = Date.now();
      const remainingTime = expiryTime - currentTime;
      if(remainingTime < 0){
          handleLogout()
      }
    }
    else{
      handleLogout()
    }
  },[])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllBooks();
        if (response && response.status_code === 200) {
          setBooks(response.data);
          setAllBooks(response.data);
        }
      } catch (error) {
        toast.error("Problem occurred while fetching books.");
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  
  
  useEffect(() => {
  },[books,allBooks])
  
  return (
    <>
      <HomeHeader Logout={handleLogout}/>
      <SearchBar allBooks={allBooks} books={books} setBooks={setBooks} setAllBooks={setAllBooks}/>
      <div className="book-list" style={{marginBottom:"20px"}}>
        {books.map((book, index) => (
          <Link to={`/books/${book.id}`} key={index}>
            <Card className="book" sx={{ display: "flex"}} >
              <CardMedia
                component="img"
                alt={book.title}
                image={book.image}
                sx={{
                  width: "50%"
                  // objectFit: "cover"
                }}
              />
              <CardContent
                sx={{
                  width: "50%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  paddingLeft: "8px",
                  textAlign:"center"
                }}
              >
                <Typography
                  variant="h6"
                  component="h6"
                  noWrap
                  title={book.title}
                >
                  Book Title : {book.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  noWrap
                  title={book.author}
                >
                  Book By : {book.author}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
