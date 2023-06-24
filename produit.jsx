import React, { useState, useEffect } from 'react';
import { Grid, Paper, Avatar, TextField, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free';
import Modal from 'react-bootstrap/Modal';
import ResponsiveDrawer from './navbar';
import avatarImage from '../pontt.png';
import Button from 'react-bootstrap/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
const RegistP = () => {
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

  const [date, setD] = useState("");
  const [type, setT] = useState("");
  const [quantite, setQ] = useState("");
  const [unite, setU] = useState("");
  const [branche, setB] = useState("");
  const [validationError, setValidationError] = useState({});


  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().substring(0, 16); // Format: yyyy-mm-ddThh:mm
    setD(formattedDate);
  }, []);

  const regist = async (e) => {
    e.preventDefault();

    const cond = {
        date: date,
        type: type,
        quantite: quantite,
        unite: unite,
        branche: branche,
      
      };
      await axios.get(`http://localhost:8000/api/registP`, { params: cond })
      .then(response => {
        if (response.data && response.data.message) {
          Swal.fire({
            icon: "success",
            text: response.data.message
          })
          navigate("/produits");
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

    const [produits, setproduits] = useState([]);

    useEffect(()=>{
        fetchProduits();
    }, []);

    const fetchProduits = async () => {
        await axios.get(`http://localhost:8000/api/prds`).then(({data})=>{
            setproduits(data);
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

      await axios.delete(`http://localhost:8000/api/produitD/${id}`).then(({data})=>{
          Swal.fire({
              icon:"success",
              text:data.message
          });
          fetchProduits();
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
       <AddCircleIcon size="2x" />
     </Button>
       <Modal show={showModal} onHide={() => setShowModal(false)} style={{ position: 'fixed', marginTop: '12%'}}>
         <Modal.Header closeButton>
           <Modal.Title>Ajouter produit</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Grid>
      <Paper  align='center'>
        <Grid align='center'>
          <h3 style={{ color: "green" }}>{errors}</h3>
        </Grid>
        <TextField  name='date' type='datetime-local' value={date}  onChange={(event) => setD(event.target.value)} />
     <br /> <TextField label='Type' name='type'  onChange={(event) => setT(event.target.value)} />
      <br />  <TextField label='Quantite' name='quantite' onChange={(event) => setQ(event.target.value)} />
      <br />  <TextField label='Unite' name='unite'   onChange={(event) => setU(event.target.value)} />
      <br />  <TextField label='Branche' name='branche'   onChange={(event) => setB(event.target.value)} />
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
                        <th> Date </th>
                        <th> Type </th>
                        <th> Quantité </th>
                        <th> Unité </th>
                        <th> Branche </th>
                        <th> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        produits.length > 0 && (
                            produits.map((row, key)=>(
                                <tr key={key}>
                                    <td>{row.date}</td>
                                    <td>{row.type}</td>
                                    <td>{row.quantite}</td>
                                    <td>{row.unite}</td>
                                    <td>{row.branche}</td>

                                   

 <td>
                          
                                {/* <Link to={`/edit/${row.id}`}> <Button>   update </Button></Link> */}
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

export default RegistP;
