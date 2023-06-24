// import logo from './logo.svg';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import { BrowserRouter} from 'react-router-dom';
// import { Route} from 'react-router-dom';
// import PeseeForm from './component/create';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
//import EditPesee from './component/edit';
//import Show from './component/show';
import PeseeEdit from './component/edit';
// import Login from './component/login';
// import Register from './component/signin';
import UserList from './component/index';
import PeseeForm from './component/create';
import Show from './component/show';
import LogoutButton from './component/NewBorne';
import Camions from './component/comparaison';
//import EditPesee from './component/edit';
import ClassicFormPage from './first';
import VehiculesPoids from './component/prb';
// import Loginn from './component/loggin';
import useTraite from './component/traitement';
// import Ap from './component/login';
import Signin from './component/papa';
import Appp from './AppRoute';

import RegistP from './component/produit';

import { Navigate } from "react-router-dom";

// import Registration from './pages/auth/Registration';

import { useSelector } from "react-redux";
import { useState } from 'react';

import Showw from './component/ponts';
import PontEdit from './component/editPascule';
import ColorSchemesExample from './first';
import Registration from './component/addUser';
import Edit from './component/editUser';
// import { AppProvider } from "./contexts/AppContext";
// import AuthContainer from "./comp/AuthContainer";
import NewBorne from './component/NewBorne';

import Signup from './component/signup';
import Login from './component/loggin';

import Table from './component/index';

import Navg from './component/navbar';

import Navgt from './component/navA';
import RegistT from './component/conducteurs';
import RegistC from './component/terminal';
import Regist from './component/vehicules';
import EditC from './component/update';

// function App() {

//   const { token } = useSelector(state => state.auth);

//   return (
    
//     <>
    

//     {/* <>
//       {[false].map((expand) => (
//         <Navbar key={expand} bg="light" expand={expand} className="mb-3">
//           <Container fluid>
//             <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
//             <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
//             <Navbar.Offcanvas
//               id={`offcanvasNavbar-expand-${expand}`}
//               aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
//               placement="end"
//             >
//               <Offcanvas.Header closeButton>
//                 <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
//                   Offcanvas
//                 </Offcanvas.Title>
//               </Offcanvas.Header>
//               <Offcanvas.Body>
//                 <Nav className="justify-content-end flex-grow-1 pe-3">
//                   <Nav.Link href="/">Home</Nav.Link>
//                   <Nav.Link href="/login">Login</Nav.Link>
//                   <Nav.Link href="/list">Gestion</Nav.Link>
//                   <Nav.Link href="/logout">Gestion</Nav.Link>
//                   <NavDropdown
//                     title="Dropdown"
//                     id={`offcanvasNavbarDropdown-expand-${expand}`}
//                   >
//                     <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//                     <NavDropdown.Item href="#action4">
//                       Another action
//                     </NavDropdown.Item>
//                     <NavDropdown.Divider />
//                     <NavDropdown.Item href="#action5">
//                       Something else here
//                     </NavDropdown.Item>
//                   </NavDropdown>
//                 </Nav>
//                 <Form className="d-flex">
//                   <Form.Control
//                     type="search"
//                     placeholder="Search"
//                     className="me-2"
//                     aria-label="Search"
//                   />
//                   <Button variant="outline-success">Search</Button>
//                 </Form>
//               </Offcanvas.Body>
//             </Navbar.Offcanvas>
//           </Container>
//         </Navbar>
//       ))}
//     </> */}
// <BrowserRouter>

//     <Routes>
//       <Route path='/edit/:id' element={<PeseeEdit/>} /> 
//       {/* <Route path="/pesee/:id" exact component={EditPesee} /> */}

//       <Route path='/signup' element={<Register/>} />
//       {/*  <Route path='/login' element={<Ap/>} />  
//        <Route path='/index' element={<UserList/>} /> */}
//       <Route path='/list' element={<Show/>} /> 
//       <Route path='/logout' element={<LogoutButton/>} /> 
//       <Route path='/c' element={<Camions/>} />
//       <Route path='/first' element={<ClassicFormPage/>} />
//       <Route path='/prb' element={<VehiculesPoids/>} />
//       <Route path='/traitement' element={<useTraite/>} />
//       {/* <Route path='/logg' element={<Loogin/>} /> */}
//       <Route path='/papa' element={<Signin/>} />
      

//       <Route path="/" element={<Layout />}>
//             <Route index element={<Home />} />
//             <Route path="contact" element={<Contact />} />
//             <Route path="login" element={!token ? <LoginReg /> : <Navigate to="/dashboard" />} />
//             <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} />
//             <Route path="api/user/reset/:token" element={<ResetPassword />} />
//           </Route>
//           <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
//           <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />


//     </Routes>

//     </BrowserRouter>

//     </>
//   );
// }

// export default App;




function App() {
 //const { token } = useSelector(state => state.auth)

 const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
    <BrowserRouter>
    <Routes>
       <Route path='/edit/:id' element={<PeseeEdit/>} /> 
       <Route path='/editC/:id' element={<EditC />} /> 
       {/* <Route path='/signup' element={<Register/>} />
        <Route path='/logn' element={<Ap/>} />   */}
       <Route path='/nav' element={<Navg />} /> 
       <Route path='/nava' element={<Navgt/>} /> 

       <Route path='/list' element={<Show/>} /> 
       <Route path='/logout' element={<LogoutButton/>} /> 
       <Route path='/c' element={<Camions/>} />
       <Route path='/' element={<ClassicFormPage/>} />
       <Route path='/prb' element={<VehiculesPoids/>} />
       <Route path='/traitement' element={<useTraite/>} />
       {/* <Route path='/logg' element={<Loogin/>} /> */}
       <Route path='/papa' element={<Signin/>} />
       <Route path='/ponts' element={<Showw />} />
       <Route path='/editt/:id' element={<PontEdit />} />
       <Route path='/newborne' element={<NewBorne />} />

       <Route path='/editUser/:id' element={<Edit />} />

       <Route path='/register' element={<Signup />} />
       <Route path='/login' element={<Login />} />

       <Route path='/terminals' element={<RegistT />} />
       <Route path='/conducteurs' element={<RegistC />} />
       <Route path='/vehicules' element={<Regist />} />
       <Route path='/produits' element={<RegistP />} />
       <Route path='/act' element={<UserList />} />
       <Route path='/addUser' element={<Registration />} />

{/* 
             <Route path="login" element={!token ? <UserLogin /> : <Navigate to="/dashboard" />} />
             <Route path="ssignup" element={!token ? <Registration /> : <Navigate to="/" />} />
             <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} />
             <Route path="api/user/reset/:token" element={<ResetPassword />} />

           <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} /> */}
         <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
     {/*   <Route path="/react">
          {isLoggedIn ? <Redirect to="/c" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        </Route>
        <Route path="/c">
          {isLoggedIn ? <Camions /> : <Redirect to="/react" />}
        </Route>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/c" /> : <Redirect to="/react" />}
        </Route> */}



     </Routes>

     </BrowserRouter>

    </>
  );
}

export default App;
