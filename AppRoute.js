import React, { useState , useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import ocp from './ocpp.jpg';
import './App.css';
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { MDBIcon } from 'mdbreact';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';

export default function Appp() {
  const [emplacement, setEmplacement] = useState('');
  const [peseeRecords, setPeseeRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/pesee/search/${emplacement}`);
      setPeseeRecords(response.data);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const {users} = useParams();
  const navigate = useNavigate();
  const usersss = sessionStorage.getItem('users');

  const logout = () =>
  {
    sessionStorage.removeItem('users')
    navigate('/login');
  }

  const [produits, setProduits] = useState([]);




  return (
    <div className="Appp">
      <Navbar bg="light" expand="lg" className="mb-3" style={{ height: "120px", fontFamily: "monospace", fontStyle: "bold" }} >
        <Container fluid>
          <Navbar.Brand>
            <img src={ocp} alt="Logo" className="logo-img" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          
          <Navbar.Collapse id="offcanvasNavbar">
            <Nav className="mr-auto">
              {/* <Nav.Link href="/"> <HomeIcon /> </Nav.Link> */}
              <Nav.Link href="/act"><GroupsIcon style={{ fontSize: "2rem" }} /></Nav.Link>
              {/* <Nav.Link href="/list">Pesage</Nav.Link>
              <Nav.Link href="/ponts">Pont_Bascule</Nav.Link> */}
              {/* <NavDropdown title="Plus" id="offcanvasNavbarDropdown"> */}
                <Nav.Link href="/prb">Rapport des alerts</Nav.Link>
                <Nav.Link href="/c">Statistique</Nav.Link>
                {/* <NavDropdown.Divider /> */}
                {/* <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item> */}
              {/* </NavDropdown> */}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                size="lg"
                value={emplacement}
                onChange={(e) => setEmplacement(e.target.value)}
              />
              <Button variant="outline-success" onClick={handleSearch}>
                Chercher
              </Button>
            </Form>
          </Navbar.Collapse>
          <Nav>
            <Button variant="outline-success"><PersonIcon  size="lg" /> {usersss} </Button>
            <Button className="ml-2 nav-item" onClick={logout} variant="outline-success" style={{marginLeft: "5%"}}> <LogoutIcon  size="lg" /></Button>
          </Nav>
        </Container>
      </Navbar>
      <Container>
  <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>Resultats de recherche</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {peseeRecords.length > 0 ? (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Date/Time</th>
              <th>poids_net</th>
              <th>Status</th>
              <th>Produit</th>
            </tr>
          </thead>
          <tbody>
            {peseeRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.date_heure}</td>
                <td>{record.poids_net}</td>
                <td>{record.etat}</td>
                <td>{record.type}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>n'existe pas.</p>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModal}>
        Fermer
      </Button>
    </Modal.Footer>
  </Modal>
</Container>

    </div>
  );
}



  // import React, { useState } from 'react';
  // import axios from 'axios';
  
  // const PeseeSearch = () => {
  //   const [emplacement, setEmplacement] = useState('');
  //   const [result, setResult] = useState([]);
  
  //   const handleSearch = async () => {
  //     const response = await axios.get(`/pesee/search?emplacement=${emplacement}`);
  //     setResult(response.data);
  //   }
  
  //   return (
  //     <div>
  //       <input type="text" value={emplacement} onChange={(e) => setEmplacement(e.target.value)} />
  //       <button onClick={handleSearch}>Search</button>
  //       <ul>
  //         {result.map(pesee => (
  //           <li key={pesee.id}>{pesee.date} - {pesee.poids}kg</li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // }
  
  // export default PeseeSearch;
  