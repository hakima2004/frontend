import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


function Navgt() {

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


  const [isOpen, setIsOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const {users} = useParams();
  const navigate = useNavigate();
  const usersss = localStorage.getItem('users');

  const logout = () =>
  {
    localStorage.removeItem('users')
    navigate('/react');
  }

  return (
    <>
      <Navbar color="light" light expand="md" className="navbar justify-content-center" style={{ fontSize: "20px"}}>
        
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mx-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/act">Users</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/list">Gestion</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/ponts">Pont_Pascule</NavLink>
            </NavItem>
            <NavDropdown title="More" id="offcanvasNavbarDropdown">
                <NavDropdown.Item href="/prb">Rapport des alerts</NavDropdown.Item>
                <NavDropdown.Item href="/c">Statistique</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
              </NavDropdown>
              <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={emplacement}
                onChange={(e) => setEmplacement(e.target.value)}
              />
              <Button variant="outline-success" onClick={handleSearch}>
                Search
              </Button>
            </Form>
          </Nav>
        </Collapse>
      </Navbar>


      <Container>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Search Results</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {peseeRecords.length > 0 ? (
              <ul>
                {peseeRecords.map((record) => (
                  <li key={record.id}>
                    {record.date_heure}: {record.poids_net}: {record.etat}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No search results found.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      {showSidebar && (
        <div className="sidebar">
          <div className="profile">
            <AccountCircleIcon />
            <span className="profile-name">{usersss}</span>
            <br />
            <br />
            <FontAwesomeIcon icon={faPowerOff} className="fa-sm" size='sm' onClick={logout} />
          </div>
          <Nav vertical>
            <NavLink href="/">Option 1</NavLink>
            <NavLink href="/">Option 2</NavLink>
            <NavLink href="/">Option 3</NavLink>
          </Nav>
        </div>
      )}

      <IconButton className={`sidebar-toggle ${showSidebar ? 'active' : ''}`} onClick={toggleShowSidebar}>
        <MenuIcon />  
      </IconButton>

   

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
        }

        .navbar-toggler {
            position: absolute;
            left: 20px;
            transition: left 0.3s ease-in-out;
          }
  
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            width: 250px;
            height: 100vh;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease-in-out;
            transform: translateX(${showSidebar ? '0' : '-100%'});
            z-index: 9999;
          }
  
          .profile {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
          }
  
          .profile svg {
            font-size: 48px;
            margin-right: 10px;
            color: #333;
          }
  
          .profile-name {
            font-size: 16px;
            font-weight: bold;
            color: #333;
          }
  
          .sidebar-nav {
            margin-top: 20px;
          }
  
          .sidebar-nav .nav-link {
            color: #333;
            font-size: 16px;
            padding: 10px 0;
          }
  
          .sidebar-nav .nav-link:hover {
            color: #007bff;
          }
  
          .sidebar-toggle {
            position: fixed;
            top: 20px;
            left: 280px;
            background-color: #fff;
            border: none;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: opacity 0.3s ease-in-out;
            z-index: 9999;
          }
  
          .sidebar-toggle.active {
            opacity: 0;
          }
  

        .dashboard {
          padding: 20px;
          margin-top: 80px; /* Adjust this value to leave space for the navbar */
          background-color: #f8f9fa;
        }

        .dashboard-card {
          padding: 20px;
          text-align: center;
          background-color: #fff;
          height: 200px;
        }
      `}</style>
    </>
  );
}

export default Navgt;
