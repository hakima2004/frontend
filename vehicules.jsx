import React, { useState, useEffect } from 'react';
import { Grid, Paper, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import ResponsiveDrawer from './navbar';
import { FaTrash } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free';
import Modal from 'react-bootstrap/Modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const Regist = () => {
  const paperStyle = {
    padding: 20,
    height: '70vh',
    width: 500,
    margin: '80px auto',
  };
  const btnStyle = { margin: '8px 0', width: '160px' };
  const [errors, setErrors] = useState('');
  const [num_camion, setNum] = useState('');
  const [marque, setMa] = useState('');
  const [modele, setM] = useState('');
  const [annee, setA] = useState('');
  const [longueur, setL] = useState('');
  const [poids, setP] = useState(0);
  const [nbr_wagon, setNw] = useState('');
  const [conducteur, setConducteur] = useState('');
  const [conducteurs, setConducteurs] = useState([]);

  const regist = async (e) => {
    e.preventDefault();

    const cond = {
      num_camion: num_camion,
      marque: marque,
      modele: modele,
      annee: annee,
      longueur: longueur,
      poids: poids,
      nbr_wagon: nbr_wagon,
      conducteur: conducteur,
    };

    try {
      const response = await axios.get('http://localhost:8000/api/registC', { params: cond });
      if (response.data && response.data.message) {
        Swal.fire({
          icon: 'success',
          text: response.data.message,
        });
        // Reset the form values
        setNum('');
        setMa('');
        setM('');
        setA('');
        setL('');
        setP('');
        setNw('');
        setConducteur('');
      } else {
        console.log('Unexpected response:', response);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        Swal.fire({
          text: error.response.data.message,
          icon: 'error',
        });
      } else {
        console.log('Unexpected error:', error);
      }
    }
  };


  useEffect(() => {
    axios
      .get('http://localhost:8000/api/conducteurss')
      .then((response) => setConducteurs(response.data))
      .catch((error) => console.error(error));
  }, []);


  const [vehicules, setVehicules] = useState([]);

  useEffect(()=>{
      fetchVehicules();
  }, []);

  const fetchVehicules = async () => {
      await axios.get(`http://localhost:8000/api/veh`).then(({data})=>{
          setVehicules(data);
      });
  };

  const deleteCon = async (id) => {
    const isConfirm = await Swal.fire({
        title: 'vous avez sur?',
        text: "vous ne pouvez pas le récupérer!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'oui, supprimer!'
    }).then((result) => {
        return result.isConfirmed;
    });

    if(!isConfirm){
        return;
    }

    await axios.delete(`http://localhost:8000/api/vehD/${id}`).then(({data})=>{
        Swal.fire({
            icon:"success",
            text:data.message
        });
        fetchVehicules();
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

<br />  <br /> <br /> <br /> <br />
<div row= "mb-6" style={{ align: "center", marginLeft: "25%"}} > 
<div className="col-10">
    <div className="card card-body">

        <div className="table-responsive">   

    <Button onClick={() => setShowModal(true)} variant="secondry">
       <AddCircleIcon size="2x" />
     </Button>
       <Modal show={showModal} onHide={() => setShowModal(false)} style={{ position: 'fixed', marginTop: '12%'}}>
         <Modal.Header closeButton>
           <Modal.Title>Ajouter Vehicule</Modal.Title>
         </Modal.Header>
         <Modal.Body>
  
      <Paper align="center">
        <Grid align="center">
          <h3 style={{ color: 'green' }}>{errors}</h3>
        </Grid>
        <TextField label="num vehicule" name="num_camion" value={num_camion} onChange={(event) => setNum(event.target.value)} />
        <br />
        <TextField label="marque" name="marque" value={marque} onChange={(event) => setMa(event.target.value)} />
        <br />
        <TextField label="modele" name="modele" value={modele} onChange={(event) => setM(event.target.value)} />
        <br />
        <TextField label="Annee" name="annee" value={annee} onChange={(event) => setA(event.target.value)} />
        <br />
        <TextField label="longueur" name="longueur" value={longueur} onChange={(event) => setL(event.target.value)} />
        <br />
        <TextField label="poids" name="poids" value={poids} onChange={(event) => setP(event.target.value)} />
        <br />
        <TextField label="Nbr wagon" name="num_wagon" value={nbr_wagon} onChange={(event) => setNw(event.target.value)} />
        <br />
        <FormControl style={{ width: '100%' }}>
          <InputLabel htmlFor="conducteur">Conducteur:</InputLabel>
          <Select
            id="conducteur"
            name="conducteur"
            value={conducteur}
            onChange={(event) => setConducteur(event.target.value)}
          >
            {conducteurs.map((conducteur) => (
              <MenuItem key={conducteur.id} value={conducteur.id}>
                {conducteur.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <Button type="submit" onClick={regist} color="primary" variant="contained" style={btnStyle}>
          Enregistrer
        </Button>
      </Paper>
    
          </Modal.Body>
         <Modal.Footer>
           <Button onClick={() => setShowModal(false)}>Close</Button>
         </Modal.Footer>
       </Modal>
     
            <table className="table table-bordered mb-0 text-center">
                <thead>
                    <tr>
                        <th> Num Vehicule </th>
                        <th> Marque </th>
                        <th> Modele </th>
                        <th> Annee </th>
                        <th> Longueur </th>
                        <th> Poids </th>
                        <th> Nbr wagon </th>
                        <th>Conducteur</th>
                        <th colSpan={2}> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vehicules.length > 0 && (
                          vehicules.map((row, key)=>(
                                <tr key={key}>
                                    <td>{row.num_camion}</td>
                                    <td>{row.marque}</td>
                                    <td>{row.modele}</td>
                                    <td>{row.annee}</td>
                                    <td>{row.longueur}</td>
                                    <td>{row.poids}</td>
                                    <td>{row.nbr_wagon}</td>
                                    <td>{row.conducteur_name}</td> 
                                   

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

export default Regist;
