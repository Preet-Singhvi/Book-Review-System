from pydantic import BaseModel
from typing import Optional

class UserSchema(BaseModel):
    name: str
    email: str
    password: str

class UserSignIn(BaseModel):
    email: str
    password: str
    
class Book(BaseModel):
    isbn: str
    title: str
    author: str
    published_year: int
    quantity: int 