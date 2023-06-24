import React, { useState, useEffect } from 'react';
import { Grid, Paper, Avatar, TextField, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';
import {FaEdit } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free';
import Modal from 'react-bootstrap/Modal';
import ResponsiveDrawer from './navbar';
import avatarImage from '../pontt.png';
import Button from 'react-bootstrap/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
const RegistC = () => {
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

  const [nom, setName] = useState("");
  const [prenom, setN] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adr, setAdr] = useState("");
  const [num_permis, setNumP] = useState("");
  const [type_permis, setTypeP] = useState("");
  const [validationError, setValidationError] = useState({});

  const regist = async (e) => {
    e.preventDefault();

    const cond = {
        nom: nom,
        prenom: prenom,
        email: email,
        phone: phone,
        adr : adr,
        num_permis : num_permis,
        type_permis : type_permis
      };
      await axios.get(`http://localhost:8000/api/regist`, { params: cond })
      .then(response => {
        if (response.data && response.data.message) {
          Swal.fire({
            icon: "success",
            text: response.data.message
          })
          navigate("/");
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

    const [conducteurs, setConducteurs] = useState([]);

    useEffect(()=>{
        fetchConducteurs();
    }, []);

    const fetchConducteurs = async () => {
        await axios.get(`http://localhost:8000/api/conducteurs`).then(({data})=>{
            setConducteurs(data);
        });
    };

    const deleteCon = async (id) => {
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

      await axios.delete(`http://localhost:8000/api/conD/${id}`).then(({data})=>{
          Swal.fire({
              icon:"success",
              text:data.message
          });
          fetchConducteurs();
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
<div row= "mb-6" style={{ align: "center", marginLeft: "20%"}} > 
<div className="col-10">
    <div className="card card-body">

        <div className="table-responsive">   <>
    <Button onClick={() => setShowModal(true)} variant="secondry">
       <PersonAddIcon size="2x" />
     </Button>
       <Modal show={showModal} onHide={() => setShowModal(false)} style={{ position: 'fixed', marginTop: '12%'}}>
         <Modal.Header closeButton>
           <Modal.Title>Ajouter conducteur</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Grid>
      <Paper  align='center'>
        <Grid align='center'>
          <h3 style={{ color: "green" }}>{errors}</h3>
        </Grid>
        <TextField label='Nom' name='nom'  onChange={(event) => setName(event.target.value)} />
      <br />  <TextField label='Prenom' name='prenom' onChange={(event) => setN(event.target.value)} />
      <br />  <TextField label='Email' name='email'   onChange={(event) => setEmail(event.target.value)} />
      <br />  <TextField label='Phone' name='phone'   onChange={(event) => setPhone(event.target.value)} />
      <br />  <TextField label='Adresse' name='adr'   onChange={(event) => setAdr(event.target.value)} />
      <br />  <TextField label='Num permis' name='num_permis'   onChange={(event) => setNumP(event.target.value)} />
      <br />  <TextField label='Type permis' name='type_permis' onChange={(event) => setTypeP(event.target.value)} />
      <br />
 <Button type='submit' onClick={regist} variant="contained" >Enregistrer</Button>

      </Paper>
    </Grid>
          </Modal.Body>
         <Modal.Footer>
           <Button onClick={() => setShowModal(false)}>Fermer</Button>
         </Modal.Footer>
       </Modal>
     </>
            <table className="table table-bordered mb-0 text-center">
                <thead>
                    <tr>
                        <th> Nom </th>
                        <th> Prenom </th>
                        <th> Email </th>
                        <th> Num Telephone </th>
                        <th> l adresse </th>
                        <th> num permis </th>
                        <th> Type permis </th>
                        <th colSpan={2}> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        conducteurs.length > 0 && (
                            conducteurs.map((row, key)=>(
                                <tr key={key}>
                                    <td>{row.nom}</td>
                                    <td>{row.prenom}</td>
                                    <td>{row.email}</td>
                                    <td>{row.phone}</td>
                                    <td>{row.adr}</td>
                                    <td>{row.num_permis}</td>
                                    <td>{row.type_permis}</td>

                                   

 <td>
                          
                                 <Link to={`/editC/${row.id}`}>  <FaEdit className="edit-icon" size={20} color="#2E8B57" /></Link> 
                                         <FaTrash size={20} color="#ff0000" variant="danger" onClick={()=>deleteCon(row.id)}/>
                                        
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

export default RegistC;
