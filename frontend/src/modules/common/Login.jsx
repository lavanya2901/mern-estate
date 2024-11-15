import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { message } from "antd";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";

import "./Login.css"; // Import your custom CSS file

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data?.email || !data?.password) {
      return alert("Please fill all fields");
    } else {
      axios
        .post("http://localhost:8000/api/user/login", data)
        .then((res) => {
          if (res.data.success) {
            message.success(res.data.message);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            const isLoggedIn = JSON.parse(localStorage.getItem("user"));
            if (isLoggedIn.type === "Admin") navigate("/adminhome");
            else if (isLoggedIn.type === "Renter") navigate("/renterhome");
            else if (
              isLoggedIn.type === "Owner" &&
              isLoggedIn.granted !== "ungranted"
            )
              navigate("/ownerhome");
            else
              message.error("Your account is not yet confirmed by the admin");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            message.error(res.data.message);
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 401)
            alert("User doesn't exist");
          navigate("/login");
        });
    }
  };

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: "#1A237E" }}>
        <Container fluid>
          <Navbar.Brand href="/" className="text-white">
            HomyHub
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 "
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Nav>
              <Link to={"/"} className="text-white">
                Home
              </Link>
              <Link to={"/login"} className="text-white">
                Login
              </Link>
              <Link to={"/register"} className="text-white">
                Register
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="login-container">
        <div className="login-left">
          <h1 className="text-white">To Get Updates In HomyHub</h1>
          <p className="text-white">
            Sign In Your Account with registered mail
          </p>
        </div>
        <div className="login-right">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 3,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
            }}
          >
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" marginTop={1}>
              Sign In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={data.email}
                onChange={handleChange}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={data.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <div className="login-links">
                Forgot password?{" "}
                <Link to={"/forgotpassword"} style={{ color: "red" }}>
                  Click here
                </Link>
                <p>
                  Don't have an account?{" "}
                  <Link to={"/register"} style={{ color: "blue" }}>
                    Sign Up
                  </Link>
                </p>
              </div>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Login;
