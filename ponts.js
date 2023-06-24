import React, { useEffect, useState, useRef  } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import PeseeForm from './create';
import Appp from '../AppRoute';
import Modal from 'react-bootstrap/Modal';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import NewBorne from './NewBorne';
import { Navbar,NavDropdown, Form, Container, Nav } from 'react-bootstrap';
import ocp from'../pontt.png';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { MDBIcon } from 'mdbreact';
import ResponsiveDrawer from './navbar';
import AddCircleIcon from '@mui/icons-material/AddCircle';



export default function Showw() {

    const [ponts, setPonts] = useState([]);
    const pdfRef = useRef(null);


    const [showModal, setShowModal] = useState(false);
    const [showModl, setShowModl] = useState(false);


    useEffect(()=>{
        fetchPonts();
    }, []);

    const fetchPonts = async () => {
        await axios.get(`http://localhost:8000/api/pontB`).then(({data})=>{
            setPonts(data);
        });
    };

    const deletePont = async (id) => {
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

        await axios.delete(`http://localhost:8000/api/pontss/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            });
            fetchPonts();
        }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            });
        });
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
  
    const handleProfileClick = () => {
      setShowProfileMenu(!showProfileMenu);
    };


    const [showSidebar, setShowSidebar] = useState(false);

  
    const handleSidebarToggle = () => {
      setShowSidebar(!showSidebar);
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
            <div row= "mb-6" style={{marginLeft: "15%"}} > 
            <div className="col-12">
                <div className="card card-body">
                    <div className="table-responsive">
                  <>
   <Button onClick={() => setShowModal(true)} variant="secondry">
      <AddCircleIcon />
    </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)} style={{ position: 'fixed', marginTop: '8%'}}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter Pont-Bascule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewBorne />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
      <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>Designation</th>
                                    <th>Capacite</th>
                                    <th>longeur</th>
                                    <th>Largeur</th>
                                    <th>Hauteur</th>
                                    <th>Type</th>
                                    <th>Emplacement</th>
                                    <th>date installation</th>
                                    <th>societe de fabrication</th>
                                    <th>Statut</th>
                                    <th>Terminal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ponts.length > 0 && (
                                        ponts.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.designation}</td>
                                                <td>{row.capacite}</td>
                                                <td>{row.longeur}</td>
                                                <td>{row.largeur}</td>
                                                <td>{row.hauteur}</td>
                                                <td>{row.type}</td>
                                                <td>{row.emplacement}</td>
                                                <td>{row.dateIn}</td>
                                                <td>{row.fabricant}</td>
                                                <td>{row.statut}</td>
                                                <td>{row.ip_adr}</td>
                                                <td>

                                               
      
      
 
          <Link to={`/editt/${row.id}`} >  <FaEdit className="edit-icon" size={20} color="#2E8B57" /> </Link>
      
   

                                      
                                            {/* <Link to={`/edit/${row.id}`}> <Button>   update </Button></Link> */}
                                                     <FaTrash size={20} color="#ff0000" variant="danger" onClick={()=>deletePont(row.id)}/>
                                                    
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
