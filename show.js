import React, { useEffect, useState, useRef  } from 'react';
import { Link ,useParams, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import PeseeForm from './create';
import TicketModal from './ticket';
import { PDFExport } from '@progress/kendo-react-pdf';
import Appp from '../AppRoute';
import Modal from 'react-bootstrap/Modal';
import { FaEdit } from 'react-icons/fa';
import { Grid, Paper } from '@material-ui/core';
import { MDBIcon } from 'mdbreact';
import { NavLink} from 'reactstrap';
import Sidebar from './Sidebar';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';


import { FaTrash } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

import ResponsiveDrawer from './navbar';


import { Navbar, Nav, NavDropdown, Form, Container, Offcanvas } from 'react-bootstrap';
import ocp from'../pontt.png';

export default function Show() {

    const [pesees, setPesees] = useState([]);
 


    const [showModal, setShowModal] = useState(false);
    const [showModl, setShowModl] = useState(false);


    useEffect(()=>{
        fetchPesees();
    }, []);

    const fetchPesees = async () => {
        await axios.get(`http://localhost:8000/api/pesage`).then(({data})=>{
            setPesees(data);
        });
    };

    const deletePesee = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            return result.isConfirmed;
        });

        if(!isConfirm){
            return;
        }

        await axios.delete(`http://localhost:8000/api/peseess/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            });
            fetchPesees();
        }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            });
        });
    };


    const fetchOperator = async (id) => {
      const response = await axios.get(`http://localhost:8000/api/operators/${id}`);
      return response.data.nom; // Specify the property you want to retrieve (e.g., name)
    };
    
    
    const fetchVehicle = async (vehicleId) => {
      const response = await axios.get(`http://localhost:8000/api/vehicles/${vehicleId}`);
      return response.data; // Assumption: the API returns the vehicle's information
    };
    
    const fetchProduct = async (productId) => {
      const response = await axios.get(`http://localhost:8000/api/products/${productId}`);
      return response.data; // Assumption: the API returns the product's information
    };
    const fetchBorne = async (borneId) => {
      const response = await axios.get(`http://localhost:8000/api/products/${borneId}`);
      return response.data; // Assumption: the API returns the product's information
    };
    
    const {users} = useParams();
    const navigate = useNavigate();
    const usersss = sessionStorage.getItem('users');

    const logout = () =>
    {
      sessionStorage.removeItem('users')
      navigate('/login');
    }


    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
  
    const handleProfileClick = () => {
      setShowProfileMenu(!showProfileMenu);
    };
  
    const handleSidebarToggle = () => {
      setShowSidebar(!showSidebar);
    };

    const handleCloseProfileMenu = () => {
      setShowProfileMenu(false);
    };


  
    const [selectedPesee, setSelectedPesee] = useState(null);
    const pdfRef = useRef(null); // Initialize the ref with null
  
    // ... existing code ...
  
   
  
    const openTicketModal = (pesee) => {
      setSelectedPesee(pesee);
      setShowModl(true);
    };
  
    const closeTicketModal = (downloadPdf = false) => {
      setShowModl(false);
      if (downloadPdf && pdfRef.current) {
        pdfRef.current.save();
      }
    };
  
  
  
   


  return (
    <div class="wrapper">
   <ResponsiveDrawer />
<br /> <br /> <br /> <br /> 
      <div className="container">    
          <div className="row mb-3">
            <div className="col-12" >

{/* <PeseeForm/>    */}


  
  </div> 
  </div>
  <div row= "mb-6" style={{ marginLeft: "20%"}}> 
            <div className="col-12">
                <div className="card card-body">
                    <div className="table-responsive">
                     <>
   {/* <div className=''> <Grid> <div>  {usersss} </div>

<div style={{ float:"right", marginRight:"50px"}}>
       <Button type='submit' onClick={logout} color='primary' justifyContent="flex-end" variant="contained">logout</Button>
</div>
   </Grid>
   </div> */}
   <Button onClick={() => setShowModal(true)} variant="secondry">
      <AddCircleIcon />
    </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} style={{ position: 'fixed', marginTop: '8%'}}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un pesé</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PeseeForm />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    </>   
     <table className="table table-bordered mb-0 text-center">
                        {selectedPesee && (
        <TicketModal show={showModl} onHide={closeTicketModal} row={selectedPesee} pdfRef={pdfRef} />
      )}
                            <thead>
                                <tr>
                                    <th>date heure</th>
                                    <th>poids brut</th>
                                    <th>poids net</th>
                                    <th>tare</th>
                                    <th>unite mesure</th>
                                    <th>Emplacement</th>
                                    <th>Etat</th>
                                    <th>operateur</th>
                                    <th>Vehicule</th>
                                    <th>produit</th>
                                    <th>Terminal</th>
                                    <th colSpan={3}> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    pesees.length > 0 && (
                                        pesees.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.date_heure}</td>
                                                <td>{row.poids_brut}</td>
                                                <td>{row.poids_net}</td>
                                                <td>{row.tare}</td>
                                                <td>{row.unite_mesure}</td>
                                                <td>{row.emplacement}</td>
                                                <td>{row.etat}</td>
                                                <td>{row.name}</td>
                                                <td>{row.num_camion}</td>
                                                <td>{row.type}</td>
                                                <td>{row.ip_adr}</td>
                                                <td>

                                               
      
      
 
          <Link to={`/edit/${row.id}`} >  <FaEdit className="edit-icon" size={20} color="#2E8B57" /> </Link>
      
   
</td> <td>
                                      
                                            {/* <Link to={`/edit/${row.id}`}> <Button>   update </Button></Link> */}
                                                     <FaTrash size={20} color="#ff0000" variant="danger" onClick={()=>deletePesee(row.id)}/>
                                                    
                                                </td>
                                                <td>
                                                <BrowserUpdatedIcon onClick={() => openTicketModal(row)} />
                                                
          
</td>

                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
   
                        </table>
                    </div>
                </div>
            </div>
          </div>
      </div>
      </div>
    );
}
