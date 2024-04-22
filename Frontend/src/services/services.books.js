import axios from "axios"

export const GetAllBooks = async() => {
    let response = await axios.get(
        "http://127.0.0.1:5000/books/all/"
    )
    return response.data
}

export const UpdateBookById = async(id,BookForm) => {
    let response = await axios.put(
        `http://localhost:5000/books/${id}/`,BookForm
    )
    return response.data
}

export const GetBookById = async(id) => {
    let response = await axios.get(
        `http://localhost:5000/books/${id}/`
    )
    return response.data
}

export const AddBook = async(BookForm) => {
    let response = await axios.post(
        `http://localhost:5000/books/`,BookForm
    )
    return response.data
}