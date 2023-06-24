import React, { useState, useEffect } from 'react';
import { Grid, Paper, TextField, Button } from '@material-ui/core';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResponsiveDrawer from './navbar';

const EditC = () => {
  const paperStyle = {
    padding: 20,
    height: '70vh',
    width: 500,
    margin: '80px auto',
  };

  const { id } = useParams();
  const navigate = useNavigate();

  const [ponts, setPonts] = useState({});

 

  useEffect(() => {
  // console.log(id);
    axios.get(`http://localhost:8000/api/condu/${id}`)
      .then(response => {
          setPonts(response.data);
      });

  }, [id])
  

  const handleChange = event => {
    event.persist();
    setPonts({ ...ponts, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = {
        nom: ponts.nom,
        prenom: ponts.prenom,
        email: ponts.email,
        phone: ponts.phone,
        adr: ponts.adr,
        num_permis : ponts.num_permis,
        type_permis: ponts.type_permis
    }

    axios.put(`http://localhost:8000/api/conupdate/${id}`, data)
      .then(response => {
        Swal.fire({
          icon:"success",
          text:data.message
        })
        navigate("/conducteurs"); 
      })
      .catch(error => console.log(error));
  };
  return (
    <>
      <ResponsiveDrawer />
      <br /> <br /> <br /> <br />
      <div style={{ alignItems: 'center', marginLeft: '20%' }}>
        <div className="col-10">
          <div className="card card-body">
            <div className="table-responsive">
              <Grid>
                <Paper align="center" style={paperStyle}>
                  
                  <TextField label="Nom" name="nom" value={ponts.nom || ''} onChange={handleChange} />
                  <br />
                  <TextField label="Prenom" name="prenom" value={ponts.prenom || ''} onChange={handleChange} />
                  <br />
                  <TextField label="Email" name="email" value={ponts.email || ''} onChange={handleChange} />
                  <br />
                  <TextField label="Phone" name="phone" value={ponts.phone || ''} onChange={handleChange} />
                  <br />
                  <TextField label="Adresse" name="adr" value={ponts.adr || ''} onChange={handleChange} />
                  <br />
                  <TextField label="Num permis" name="num_permis" value={ponts.num_permis || ''} onChange={handleChange} />
                  <br />
                  <TextField label="Type permis" name="type_permis" value={ponts.type_permis || ''} onChange={handleChange} />
                  <br />
                  <Button type="submit" onClick={handleSubmit} variant="contained">
                    Enregistrer
                  </Button>
                </Paper>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditC;
