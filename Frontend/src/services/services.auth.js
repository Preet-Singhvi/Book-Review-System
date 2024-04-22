import axios from "axios"

export const SignUp = async(formRegister) => {
    let response = await axios.post(
        "http://localhost:5000/signup",formRegister
    )
    return response.data
}

export const SignIn = async(loginForm) => {
    let response = await axios.post(
        "http://localhost:5000/signin",loginForm
    )
    return response.data
}