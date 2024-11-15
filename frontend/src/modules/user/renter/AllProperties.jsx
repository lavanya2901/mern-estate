import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const AllProperty = () => {
   const [allProperties, setAllProperties] = useState([]);

   const getAllProperty = async () => {
      try {
         const response = await axios.get(`http://localhost:8000/api/user/getallbookings`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });

         if (response.data.success) {
            setAllProperties(response.data.data);
         } else {
            message.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllProperty();
   }, []);

   return (
     <div>
       <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
           <TableHead>
             <TableRow>
               <TableCell>
                 <b>Booking ID</b>
               </TableCell>
               <TableCell><b>Property ID</b></TableCell>
               <TableCell align="center"><b>Tenent Name</b></TableCell>
               <TableCell align="center"><b>Phone</b></TableCell>
               <TableCell align="center"><b>Booking Status</b></TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {allProperties.map((booking) => (
               <TableRow
                 key={booking._id}
                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
               >
                 <TableCell component="th" scope="row">
                   {booking._id}
                 </TableCell>
                 <TableCell component="th" scope="row">
                   {booking.propertyId}
                 </TableCell>
                 <TableCell align="center">{booking.userName}</TableCell>
                 <TableCell align="center">{booking.phone}</TableCell>
                 <TableCell align="center">{booking.bookingStatus}</TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
     </div>
   );
};

export default AllProperty;

