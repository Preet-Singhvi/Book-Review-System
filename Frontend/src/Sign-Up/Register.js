import {Avatar,Button,Grid,Link,Paper,TextField,Typography,} from "@mui/material";
import React from "react";
import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./Register.css";
import { useNavigate } from "react-router";
import { SignUp } from "../services/services.auth";
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();

  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeForm = (label, e) => {
    // console.log(e.target.value);
    switch (label) {
      case "name":
        setFormRegister({ ...formRegister, name: e.target.value });
        break;
      case "email":
        setFormRegister({ ...formRegister, email: e.target.value });
        break;
      case "password":
        setFormRegister({ ...formRegister, password: e.target.value });
    }
  };


  const register = async () => {
    try {
      let response = await SignUp(formRegister);
      if (response && response.status_code === 200) {
        toast.success("Registration successful");
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Data");
    }
  };
  

  return (
    <Grid>
      <Paper elevation={10} className="register">
        <Grid align="center">
          <Avatar className="lock">
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign Up</h2>
        </Grid>
        <TextField
          className="field"
          variant="standard"
          label="Name"
          placeholder="Name"
          type="name"
          onChange={(e) => {
            onChangeForm("name", e);
          }}
          autoComplete="new-name"
          fullWidth
          required
        />
        <TextField
          className="field"
          variant="standard"
          label="Email"
          placeholder="Email"
          type="email"
          autoComplete="new-email"
          onChange={(e) => {
            onChangeForm("email", e);
          }}
          fullWidth
          required
        />
        <TextField
          className="field"
          variant="standard"
          label="Password"
          placeholder="Password"
          type="password"
          onChange={(e) => {
            onChangeForm("password", e);
          }}
          autoComplete="new-password"
          fullWidth
          required
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className="enter"
          onClick={register}
          fullWidth
        >
          Register
        </Button>
        <Typography className="link">
          Already have an account? <Link href="/">Sign-In</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Register;
