import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import image from "./images.jpg"; 
import ocpp from "./pontt.png";
import { Carousel } from 'react-bootstrap';
import Spinner from './component/spinner';
import { useState } from 'react';

import {
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBContainer
} from 'mdb-react-ui-kit';



function ColorSchemesExample() {
  const [showSpinner, setShowSpinner] = useState(false);
  const performAction = () => {
    setShowSpinner(true);
    // Perform an action (e.g., AJAX request or time-consuming operation)
    // After the action is completed, set showSpinner to false to hide the spinner
  };
  return (
    <header style={{ paddingLeft: 0 }} >
    {/* <div style={{ backgroundImage:`url(${image})`, height:'110vh',
    marginTop:'-70px',
    fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat' }}>
    </div> */}

<div style={{ position: 'relative', overflow: 'hidden', height: '100vh' }}>
     




<Carousel controls indicators>



  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image}
      alt="slide 1"
      style={{ objectFit: 'cover', height: '100%', width: '100%' }}
    />
   <Navbar expand='lg' bg='light' variant='light' style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <Container fluid>
            <Navbar.Toggle aria-controls='navbarExample01' />
            <Navbar.Collapse id='navbarExample01'>
              <Nav className='mb-2 mb-lg-0'>
                <Nav.Link href='/'>Home</Nav.Link>
                <Nav.Link href='/login' >Connecter à votre compte</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    <Carousel.Caption
      className="d-none d-md-block"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Navbar  expand="lg" style={{ fontSize: '30px', color: 'white' }}>
          <Container fluid>
            <Navbar.Collapse id="navbar-nav">
              <Nav className="me-auto" style={{ fontFamily: 'Palatino, serif' }} >
            <div className='d-flex justify-content-center align-items-center h-100'>
              <div className='text-white'>
                <a className='btn btn-light btn-lg' href='/login' role='button' variant="secondry">
                BIENVENUE 
                </a>
              </div>
            </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
</div>

 </header>
  );
}

export default ColorSchemesExample;