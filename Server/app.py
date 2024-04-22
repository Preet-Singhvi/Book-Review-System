from flask import Flask, jsonify, request
from flasgger import Swagger
from flask_cors import CORS
import jwt
from passlib.context import CryptContext
from schema import *
from database.DBConnection import *
import uuid

app = Flask(__name__)
swagger = Swagger(app)
CORS(app)  # Enable CORS for all origins
secret_key = "Fast_API_Assignment"
hash_algorithm = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@app.route('/')
def hello():
    """
    This is the root endpoint.
    """
    return 'Hello, World!'

@app.route('/signup', methods=['POST'])
def signup():
    """
    Register a new user.
    ---
    parameters:
      - in: body
        name: user
        description: User object
        required: true
        schema:
          type: object
          properties:
            name:
              type: string
              description: The name of the user
            email:
              type: string
              description: The email address of the user
            password:
              type: string
              description: The password of the user
    responses:
      200:
        description: User registration result
        schema:
          type: object
          properties:
            result:
              type: string
              description: Result message
            status_code:
              type: int
              description: API Status
    """
    user = request.json
    message=''
    user_info = user_collection.find_one({"email": user['email']})
    if user_info:
        return {"status_code":404 , "message":message},404
    
    hashed_password = pwd_context.hash(user['password'])

    user_doc = {
        "name": user["name"],
        "email": user['email'],
        "password": hashed_password,
    }
    result = user_collection.insert_one(user_doc)
    if result.acknowledged:
        message= "User registered successfully"
        return {"status_code":200 , "message":message},200
    else:
        message="User registration failed"
        return {"status_code":404 , "message":message},404

@app.route("/signin",methods=['POST'])
def signin():
    """
    Login a user.
    ---
    parameters:
      - in: body
        name: user
        description: User object
        required: true
        schema:
          type: object
          properties:
            email:
              type: string
              description: The email address of the user
            password:
              type: string
              description: The password of the user
    responses:
      200:
        description: User registration result
        schema:
          type: object
          properties:
            result:
              type: string
              description: Result message
    """
    user = request.json
    user_info = user_collection.find_one({"email": user['email']})
    if not user_info:
        return {"status_code":404,"message":f"No user found with email - {user['email']}"},404

    hashed_password = user_info.get("password")
    if pwd_context.verify(user['password'], hashed_password):
        access_token = jwt.encode({
            "name":user_info["name"],
            "email":user_info["email"],
        },secret_key,algorithm = hash_algorithm)
        
        return {"status_code":200,"message":"Sign-in successfull","data":access_token},200
    
    return {"status_code":404,"message": "Sign-in failed"},404

@app.route("/books/all/",methods=['GET'])
def list_books():
    """
    This is the get all books endpoint.
    ---
    responses:
      200:
        description: All Books
        schema:
          type: object
          properties:
            message:
              type: string
              description: Result message
            data:
              type: list
              description:  All Books Data  
    """
    books = list(book_collection.find())
    for book in books:
        book["_id"] = str(book["_id"])
        # book['image'] = base64.b64encode(book['image']).decode('utf-8')
    return {"status_code":200,"message":"All books","data":books},200

@app.route('/books/<string:book_id>/', methods=['GET'])
def get_book_by_id(book_id):
    """
    This is the get book by ID endpoint.
    ---
    parameters:
      - name: book_id
        in: path
        type: int
        required: true
        description: The ID of the book to retrieve
    responses:
      200:
        description: Book details
        schema:
          type: object
          properties:
            message:
              type: string
              description: Result message
            data:
              type: object
              description: Book data
    """
    # Find the book by its ID in the collection
    book = book_collection.find_one({"id": book_id})
    if book:
        book["_id"] = str(book["_id"])
        # book['image'] = base64.b64encode(book['image']).decode('utf-8')
        return {"status_code":200,"message": "Book found", "data": book},200
    else:
        return {"status_code":404,"message": "Book not found"},404
    
@app.route('/books/<string:book_id>/', methods=['PUT'])
def update_book_by_id(book_id):
    """
    This is the update book by ID endpoint.
    ---
    summary: Update a book by ID
    parameters:
      - name: book_id
        in: path
        description: The ID of the book to update
        required: true
        schema:
          type: integer
      - name: book_data
        in: body
        description: Book object
        required: true
        schema:
            type: object
            properties:
              name:
                type: string
                description: The name of the book (mandatory)
              comment:
                type: string
                description: Optional comment for the book
              rating:
                type: integer
                description: Optional rating for the book
    responses:
      '200':
        description: Book updated successfully
        content:
          application/json:
            schema:
              type: object
              properties:
                message:
                  type: string
                  description: Result message
      '404':
        description: Book not found
        content:
          application/json:
            schema:
              type: object
              properties:
                message:
                  type: string
                  description: Error message
    """
    # Retrieve JSON data from request body
    data = request.json

    # Check if 'name' field is present in the request body
    if 'name' not in data:
        return {"status_code":404,"message": "Name field is mandatory"},404

    # Retrieve the book from the collection
    book = book_collection.find_one({"id": book_id})
    if not book:
        return {"status_code":404,"message": "Book not found"},404

    # Handle comments update
    existing_comments = book.get('comments', [])
    comment_name = data['name']
    comment_data = {'rating': data.get('rating'), 'comment': data.get('comment')}
    comment_updated = False
    for comment in existing_comments:
        if comment.get('name') == comment_name:
            # Update existing comment
            comment.update(comment_data)
            comment_updated = True
            break

    # If comment with the same name doesn't exist, add new comment
    if not comment_updated:
        existing_comments.append({comment_name: comment_data})

    # Update the book in the collection by its ID
    result = book_collection.update_one(
        {"id": book_id},
        {"$set": book}
    )

    if result.modified_count:
        return {"status_code":200,"message": "Book updated successfully"},200
    else:
        return {"status_code":404,"message": "Book not found"},404

@app.route('/books/', methods=['POST'])
def add_book():
    """
    Add a new book.
    ---
    parameters:
      - in: body
        name: bookdetail
        description: Book Details
        required: true
        schema:
          type: object
          properties:
            image:
              type: string
              description: Image of book
            title:
              type: string
              description: Title Of the book.
            author:
              type: string
              description: Author Of the book.
            genre:
              type: string
              description: Genre Of the book.
            description:
              type: string
              description: Description About book.
    responses:
      200:
        description: Book Saving result.
        schema:
          type: object
          properties:
            result:
              type: string
              description: Result message
    """
    data = request.json

    # Extract data from the request payload
    image_data = data.get('image')  # Assuming image data is sent as base64 string
    title = data.get('title')
    author = data.get('author')
    genre = data.get('genre')
    description = data.get('description')
    if book_collection.find_one({'title': title}):
        return {"status_code":404,"message": "Title already exists"},404

    book_id = str(uuid.uuid4())

    # Insert the data into MongoDB
    book_data = {
        'id': book_id,
        'image': image_data,
        'title': title,
        'author': author,
        'genre' : genre,
        'description': description,
        'comments':[]
    }
    result = book_collection.insert_one(book_data)

    if result.inserted_id:
        return {"status_code":200,"message": "Book added successfully"},200
    else:
        return {"status_code":404,"message": "Failed to add book"},404
              
if __name__ == '__main__':
    app.run(debug=True)
