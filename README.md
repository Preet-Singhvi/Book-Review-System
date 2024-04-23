# Book-Review-System - Backend
Book Management System
 - The Book Management System is a Flask-based web application that provides functionalities for managing books and user authentication. 
 - It allows users to register, sign in, add books, list all books, get book details by ID, and update book information.

Features
 - User Registration and Authentication: Users can register with their name, email, and password. They can then sign in using their 
   registered credentials.
 - Book Management: Users can add new books to the system, list all available books, get details of a specific book by its ID, and update 
   book information.	

	1. Installation:
		    Clone the repository to your local machine:
		    	git clone https://github.com/Preet-Singhvi/Book-Review-System/
	2. Install dependencies:
		    pip install -r requirements.txt
	3. Set up MongoDB:
		    Install MongoDB on your system if not already installed.
		    Start MongoDB service.
	4. Run the application:
		    python app.py

 - The application should now be running locally. Access it by visiting http://localhost:5000 in your web browser.

API Documentation
 - The API endpoints are documented using Swagger. After running the application locally, you can access the Swagger UI at 
   http://localhost:5000/apidocs.

	Usage:
	1. User Registration: Register a new user by sending a POST request to /signup endpoint with the user's name, email, and password 
           in the request body.
	2. User Sign-in: Sign in as a registered user by sending a POST request to /signin endpoint with the user's email and password in 
           the request body.
	3. Book Management:
           1.Add a new book by sending a POST request to /books/ endpoint with book details in the request body.
           2. List all books by sending a GET request to /books/all/ endpoint.
	   3. Get details of a specific book by its ID by sending a GET request to /books/<book_id>/ endpoint.
           4. Update book information by sending a PUT request to /books/<book_id>/ endpoint with updated book details in the request body.


# Book Review System - Frontend

 - This is the frontend repository for the Book Review System project. It's built using React.js and Material-UI.

Features
 - User Authentication: Users can sign in or register for a new account.
 - Book Search: Users can search for books based on title, author, or genre.
 - Book Details: Users can view details of individual books, including title, author, genre, description, and comments/ratings.
 - Add Book: Users can add new books to the system, including uploading an image for the book cover.
 - Rating and Comments: Users can rate books and leave comments.

Technologies Used
 - React.js: Frontend library for building user interfaces.
 - Material-UI: React components for faster and easier web development.
 - axios: Promise-based HTTP client for making API requests.
 - react-toastify: React component for toast notifications.
 - react-router-dom: Routing library for React applications.
 - jwt-decode: Library for decoding JWT tokens.
 - js-cookie: Library for handling browser cookies.

Installation
1. Installation:
   	Clone the repository to your local machine:
		git clone https://github.com/Preet-Singhvi/Book-Review-System/
2. Navigate to the project directory:
   	cd frontend
3. Install dependencies:
	npm install
4. Start the development server:
	npm start
 - Access the application at http://localhost:3000 in your browser.
