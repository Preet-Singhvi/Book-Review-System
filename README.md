# Book-Review-System
Book Management System
The Book Management System is a Flask-based web application that provides functionalities for managing books and user authentication. It allows users to register, sign in, add books, list all books, get book details by ID, and update book information.

------------------------------------ SERVER ------------------------------------------------------
Features
	User Registration and Authentication: Users can register with their name, email, and password. They can then sign in using their 
  registered credentials.
	Book Management: Users can add new books to the system, list all available books, get details of a specific book by its ID, and update 
  book information.	

	1. Installation:
		    Clone the repository to your local machine:
			      git clone https://github.com/your_username/book-management-system.git
	2. Install dependencies:
		    pip install -r requirements.txt
	3. Set up MongoDB:
		    Install MongoDB on your system if not already installed.
		    Start MongoDB service.
	4. Run the application:
		    python app.py

  The application should now be running locally. Access it by visiting http://localhost:5000 in your web browser.

API Documentation
	The API endpoints are documented using Swagger. After running the application locally, you can access the Swagger UI at 
  http://localhost:5000/apidocs.

	Usage:
	1. User Registration: Register a new user by sending a POST request to /signup endpoint with the user's name, email, and password in 
     the request body.
	2. User Sign-in: Sign in as a registered user by sending a POST request to /signin endpoint with the user's email and password in the 
     request body.
	3. Book Management:
		    Add a new book by sending a POST request to /books/ endpoint with book details in the request body.
		    List all books by sending a GET request to /books/all/ endpoint.
		    Get details of a specific book by its ID by sending a GET request to /books/<book_id>/ endpoint.
		    Update book information by sending a PUT request to /books/<book_id>/ endpoint with updated book details in the request body.
