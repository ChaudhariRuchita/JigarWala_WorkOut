// import React, { useState, useEffect } from 'react';
// import { Container, Table } from 'react-bootstrap';
// import axios from 'axios';

// export default function AdminDashboard() {
//   const [alldata, setAllData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/getusers");
//         console.log(response);
//         if (response.status === 200) {
//           setAllData(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDelete = (userId) => {
//     alert(`Are you sure you want to delete user with ID: ${userId}?`);
//     // Add logic for handling delete based on user ID or other unique identifier
//   };

//   return (
//     <Container>
//       {alldata.length !== 0 ? (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {alldata.map((data) => (
//               <tr key={data._id}>
//                 <td>{data.name}</td>
//                 <td>{data.email}</td>
//                 <td>
//                   <button onClick={() => handleDelete(data._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <h3>You have no data at the backend yet</h3>
//       )}
//     </Container>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { Container, Table } from 'react-bootstrap';
// import axios from 'axios'; // Make sure to import axios

// export default function AdminDashboard() {
//   const [alldata, setAllData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/getusers");
//         console.log(response);
//         if (response.status === 200) {
//           setAllData(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);




   

//   const handleDelete = () => {
//     alert("Are you sure you want to delete?");
//     // Add logic for handling delete
//   };

//   return (
//     <Container>
//       {alldata.length !== 0 ? (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Avishkar</td>
//               <td>Avishkar@gmail</td>
//               <td>
//                 <button onClick={handleDelete}>Delete</button>
//               </td>
//             </tr>
//             {alldata.map((data, index) => (
//               <tr key={index}>
//                 <td>Username: {data.name}</td>
//                 <td>Email: {data.email}</td>
//                 <td>
//                   <button onClick={() => handleDelete(index)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <h3>You have no data at the backend yet</h3>
//       )}
//     </Container>
//   );
// }
