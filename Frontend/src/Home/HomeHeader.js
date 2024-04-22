import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import jwt_decode from 'jwt-decode'
import { Button } from "@mui/material";

import './HomeHeader.css'
const HomeHeader = ({ Logout }) => {
    const [userDetail, setUserDetail] = useState({})

    useEffect(() => {
        const token = Cookies.get('auth_token')
        if (token) {
            const UserDetail = jwt_decode(token)
            setUserDetail(UserDetail)
        }
        else {
            Logout()
        }
    }, [])
    return (
        <div className='header'>
            <div className="logo-container">
                <LocalLibraryIcon className="logo" />
            </div>
            <div className="title-container">
                <h3 className="title">Book Review System</h3>
            </div>
            <div className='header-profile'>
                <h4 className="username">{userDetail.name}</h4>
                <Button className="logout-btn" style={{backgroundColor:"whitesmoke",borderRadius:"20px"}} onClick={Logout}>Logout</Button>
            </div>
        </div>
    )
}

export default HomeHeader
