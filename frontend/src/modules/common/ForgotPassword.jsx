import React, { useState } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const ForgotPassword = () => {
   const navigate = useNavigate()
   const [data, setData] = useState({
      email: '',
      password: '',
      confirmPassword: ''
   })

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (data.email === "" || data.password === "" || data.confirmPassword === "") {
         alert("Please fill all fields")
      } else {
         if (data.password === data.confirmPassword) {
            await axios.post("http://localhost:8000/api/user/forgotpassword", data)
               .then((res) => {
                  if (res.data.success) {
                     alert('Your password has been changed!')
                     navigate('/login')
                  } else {
                     alert(res.data.message)
                  }
               })
               .catch((err) => {
                  if (err.response && err.response.status === 401) {
                     alert("User doesn't exist");
                  }
                  navigate("/register");
               });
         }

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
           <h1 className="text-white">You Have Forget Your Password</h1>
           <p className="text-white">Don't worry, you can update here</p>
         </div>
         <div className="login-right">
           <Box
             sx={{
               display: "flex",
               flexDirection: "column",
                     alignItems: "center",
                     padding: 3,
                     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                     borderRadius: "8px",
               backgroundColor:"#fff"
             }}
           >
             <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
               <LockOutlinedIcon />
             </Avatar>
             <Typography component="h1" variant="h5">
               Forgot Password?
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
                 value={data.password}
                 onChange={handleChange}
                 label="New Password"
                 type="password"
                 id="password"
                 autoComplete="current-password"
               />
               <TextField
                 margin="normal"
                 fullWidth
                 name="confirmPassword"
                 value={data.confirmPassword}
                 onChange={handleChange}
                 label="Confirm Password"
                 type="password"
                 id="confirmPassword"
                 autoComplete="current-password"
               />
               <Box mt={2}>
                 <Button
                   type="submit"
                   variant="contained"
                           sx={{ mt: 3, mb: 2 }}
                           fullWidth
                 >
                   Change Password
                        </Button>
                        <div className='login-links'>
                           Don't Have an account?{" "}
                           <Link to={"/register"} style={{ color: "blue" }}>
                              Sign Up
                           </Link>
                        </div>
               </Box>
             </Box>
           </Box>
         </div>
       </div>
     </>
   );
}

export default ForgotPassword
