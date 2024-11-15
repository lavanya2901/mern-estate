import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav, Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import p1 from '../../images/p1.jpg'
import p2 from '../../images/p2.jpg'
import p3 from '../../images/p3.jpg'
import p4 from '../../images/p4.jpg'
import AllPropertiesCards from '../user/AllPropertiesCards';

const Home = () => {
   const [index, setIndex] = useState(0);

   const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
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

       <div className="home-body">
         <Carousel activeIndex={index} onSelect={handleSelect}>
           <Carousel.Item>
             <img src={p1} alt="First slide" />
           </Carousel.Item>
           <Carousel.Item>
             <img src={p2} alt="Second slide" />
           </Carousel.Item>
           <Carousel.Item>
             <img src={p3} alt="Third slide" />
           </Carousel.Item>
           <Carousel.Item>
             <img src={p4} alt="Fourth slide" />
           </Carousel.Item>
         </Carousel>
       </div>

       <div className='text-center' style={{marginTop:"25px"}}>
         <h1>Filter The Property, Based on Your Choice</h1>
       </div>

         <Container>
           <AllPropertiesCards />
         </Container>
     </>
   );
}

export default Home
