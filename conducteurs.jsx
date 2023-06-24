import React, { useState, useEffect } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import { MDBCollapse, MDBBtn } from 'mdb-react-ui-kit';
import { FaTrash } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free';
import Modal from 'react-bootstrap/Modal';
import ResponsiveDrawer from './navbar';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import avatarImage from '../pontt.png';

const RegistT = () => {
  const paperStyle = {
    padding: 20,
    height: '70vh',
    width: 500,
    margin: "80px auto",
  //  position: 'relative', // Add relative position
  };
  const avatarStyle = {
    backgroundColor: '#3370bd',
    // position: 'absolute', // Add absolute position
    // bottom: '10px', // Adjust the bottom position
    // left: '10px', // Adjust the left position
    // width: '140px',
    // height: '20vh',
  };
  const avatarStyl = { backgroundColor: '#3370bd' };
  const btnStyle = { margin: '8px 0', width: '160px'};
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const [ip_adr, setIP] = useState("");
  const [emplacement_phy, setEm] = useState("");
  const [statut, setStatut] = useState("");
  const [date_installation, setDate] = useState("");
  const [date_derniere_cnnx, setDate_cnx] = useState("");
  const [logeciel_version, setLv] = useState("");
  const [type, setType] = useState("");
  const [validationError, setValidationError] = useState({});

  const regist = async (e) => {
    e.preventDefault();

    const cond = {
        ip_adr: ip_adr,
        emplacement_phy: emplacement_phy,
        statut: statut,
        date_installation: date_installation,
        date_derniere_cnnx : date_derniere_cnnx,
        logeciel_version : logeciel_version,
        type : type
      };
      await axios.get(`http://localhost:8000/api/registB`, { params: cond })
      .then(response => {
        if (response.data && response.data.message) {
          Swal.fire({
            icon: "success",
            text: response.data.message
          })
          navigate("/terminals");
        } else {
          console.log("Unexpected response:", response)
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          Swal.fire({
            text: error.response.data.message,
            icon: "error"
          })
        } else {
          console.log("Unexpected error:", error)
        }
      })
    
  
    };
  
    const [terminals, setTerminals] = useState([]);

    useEffect(()=>{
        fetchTerminals();
    }, []);

    const fetchTerminals = async () => {
        await axios.get(`http://localhost:8000/api/terminal`).then(({data})=>{
            setTerminals(data);
        });
    };

    const deleteTer = async (id) => {
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

        await axios.delete(`http://localhost:8000/api/terD/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            });
            fetchTerminals();
        }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            });
        });
    };

    const [showModal, setShowModal] = useState(false);

  return (
  <>
 <ResponsiveDrawer />
<br />  <br /> <br /> <br />


  

<div row= "mb-3" style={{ align: "center", marginLeft: "20%"}} > 
<div className="col-10">
    <div className="card card-body">
        <div className="table-responsive">
        <>
   <Button onClick={() => setShowModal(true)} variant="secondry">
      <AddCircleIcon size="2x" />
    </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} style={{ position: 'fixed', marginTop: '12%'}}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter Terminal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Grid>
      <Paper  align='center'>
        <Grid align='center'>
          <h3 style={{ color: "green" }}>{errors}</h3>
        </Grid>
        <TextField label='adresse ip' name='ip_adr'  onChange={(event) => setIP(event.target.value)} />
      <br />  <TextField label='Emplacement' name='emplacement_phy' onChange={(event) => setEm(event.target.value)} />
      <br />  <TextField label='Statut' name='statut'   onChange={(event) => setStatut(event.target.value)} />
      <br />  <TextField label='date d installation' name='date_installation'   onChange={(event) => setDate(event.target.value)} />
      <br />  <TextField label='date_derniere_cnnx' name='date_derniere_cnnx'   onChange={(event) => setDate_cnx(event.target.value)} />
      <br />  <TextField label='logiciel_version' name='logeciel_version'   onChange={(event) => setLv(event.target.value)} />
      <br />  <TextField label='Type' name='type' onChange={(event) => setType(event.target.value)} />
      <br />
 <Button type='submit' onClick={regist} color='primary' variant="contained" style={btnStyle}>Enregistrer</Button>

      </Paper>
    </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>   
     <table className="table table-bordered mb-0 text-center">
                <thead>
                    <tr>
                        <th> adresse ip </th>
                        <th> emplacement </th>
                        <th> statut </th>
                        <th> date d installation </th>
                        <th> date derniere connexion </th>
                        <th> version </th>
                       
                        <th colSpan={2}> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        terminals.length > 0 && (
                            terminals.map((row, key)=>(
                                <tr key={key}>
                                    <td>{row.ip_adr}</td>
                                    <td>{row.emplacement_phy}</td>
                                    <td>{row.statut}</td>
                                    <td>{row.date_installation}</td>
                                    <td>{row.date_derniere_cnnx}</td>
                                    <td>{row.logeciel_version}</td>
                                   
                                    

                                   

 <td>
                          
                                {/* <Link to={`/edit/${row.id}`}> <Button>   update </Button></Link> */}
                                         <FaTrash size={20} color="#ff0000" variant="danger" onClick={()=>deleteTer(row.id)}/>
                                        
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

</>

  );

};

export default RegistT;
