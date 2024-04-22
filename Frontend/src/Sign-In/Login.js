import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import './Login.css';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { SignIn } from '../services/services.auth';
import { toast } from 'react-toastify';

const Sign = () => {

const navigate = useNavigate();

    const [loginForm, setLoginform] = useState({
        email: "",
        password: "",
    });
    
    const onChangeForm = (label, e) => {
      switch (label) {
        case "email":
          setLoginform({ ...loginForm, email: e.target.value });
          break;
        case "password":
          setLoginform({ ...loginForm, password: e.target.value });
          break;
      }
    };

    const login = async () => {
      try {
        let response = await SignIn(loginForm);
        if (response && response.status_code === 200) {
          Cookies.set("auth_token", response.data);
          toast.success("Sign-in successful");
          navigate("/books");
        } else {
          toast.error("Sign-in failed");
        }
      } catch (error) {
        console.log(error);
        toast.error("Invalid Credentials");
      }
    };
    

    return (
        <Grid>
            <Paper elevation={10} className='sign'>
                <Grid align='center' >
                    <Avatar className='lock'><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField 
                    className='field' 
                    variant="standard" 
                    label='Email' 
                    placeholder='Email' 
                    type='email'
                    onChange={(e) => {onChangeForm("email", e);}}
                    fullWidth
                    autoComplete="new-email"
                    required/>
                <TextField 
                    className='field' 
                    variant="standard" 
                    label='Password' 
                    placeholder='Password' 
                    type='password'
                    onChange={(e) => {onChangeForm("password", e);}} 
                    fullWidth 
                    autoComplete="new-password"
                    required/>
                <Button type='submit' 
                    color='primary' 
                    variant='contained' 
                    className='enter'
                    onClick={login}
                    fullWidth>
                        Sign In
                </Button>
                <Typography className='link'>
                    Don't have an account? <Link href='/register' >Sign Up</Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default Sign;
