from pymongo import MongoClient

url = "mongodb://localhost:27017"

client = MongoClient(url)
db = client.assignment
user_collection = db["users"]
book_collection = db["books"]
