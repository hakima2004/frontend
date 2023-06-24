

// function LogoutButton() {
//   const [loggedOut, setLoggedOut] = React.useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     axios.delete('http://localhost:8000/api/profile')
//       .then(response => {
//         console.log(response.data.message);
//         setLoggedOut(true);
//       })
//       .catch(error => {
//         console.log(error.response.data);
//       });
//   }

//   if (loggedOut) {
//     navigate("/login");
//   }

//   return (
//     <button onClick={handleLogout}>Logout</button>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Form, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NewBorne() {
  const [dateIn, setDateIn] = useState('');
  const [emplacement, setEmplacement] = useState('');
  const [designation, setDesignation] = useState('');
  const [capacite, setCapacite] = useState('');
  const [longeur, setLongeur] = useState('');
  const [largeur, setLargeur] = useState('');
  const [hauteur, setHauteur] = useState('');
  const [type, setType] = useState('');
  const [fabricant, setFabricant] = useState('');
  const [statut, setStatut] = useState('');
  const [borne, setBorne] = useState('');
  const [bornes, setBornes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().substring(0, 16); // Format: yyyy-mm-ddThh:mm
    setDateIn(formattedDate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pont = {
      dateIn: dateIn,
      designation: designation,
      capacite: capacite,
      longeur: longeur,
      largeur: largeur,
      hauteur: hauteur,
      type: type,
      fabricant: fabricant,
      emplacement: emplacement,
      statut: statut,
      borne: borne
    };
    await axios
      .get('http://localhost:8000/api/ponts', { params: pont })
      .then((response) => {
        if (response.data && response.data.message) {
          Swal.fire({
            icon: 'success',
            text: response.data.message
          });
          navigate('/list');
        } else {
          console.log('Unexpected response:', response);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          Swal.fire({
            text: error.response.data.message,
            icon: 'error'
          });
        } else {
          console.log('Unexpected error:', error);
        }
      });
  };

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/bornes')
      .then((response) => setBornes(response.data))
      .catch((error) => console.error(error));
  }, []);

  

  return(
    <form className="container mt-3 mb-3" onSubmit={handleSubmit}>
    <Row className="mb-12">
    <Form.Group controlId="formGridCity" className="col col-sm-4">
        <Form.Label htmlFor="borne">Terminal:</Form.Label>
      <Form.Select
        id="borne"
        name="borne"
        value={borne}
        onChange={(e) => setBorne(e.target.value)}
        className="form-control" 
      >
  {bornes.map((borne) => (
    <option key={borne.id} value={borne.id}>
      {borne.emplacement_phy}
    </option>
  ))}
     </Form.Select>
</Form.Group>
        <Form.Group controlId="formBasicEmail" className="col col-sm-4">
            <Form.Label>Designation</Form.Label>
            <Form.Control type="text" name="designation"  onChange={(e) => setDesignation(e.target.value)} className="form-control" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail" className="col col-sm-4">
            <Form.Label>Capacite</Form.Label>
            <Form.Control type="number" step="any" name="capacite"  onChange={(e) => setCapacite(e.target.value)} className="form-control" />
        </Form.Group>
        </Row>
        <Row className="mb-12">
        <Form.Group controlId="formBasicEmail" className="col col-sm-6">
            <Form.Label>Fabricant</Form.Label>
            <Form.Control type="text" name="fabricant"  onChange={(e) => setFabricant(e.target.value)} className="form-control" />
        </Form.Group>
    
 
    
        <Form.Group className=" col col-sm-6" controlId="formGridAddress1">
            <Form.Label>largeur</Form.Label>
            <Form.Control className="form-control" type="number" step="any" name="largeur"  onChange={(e) => setLargeur(e.target.value)} />
        </Form.Group>
 </Row>
 <Row className="mb-12">
        <Form.Group className="col col-sm-6" controlId="formGridAddress2">
            <Form.Label>Longeur</Form.Label>
            <Form.Control className="form-control" name="longeur" type="number" step="any"  onChange={(e) => setLongeur(e.target.value)} />
        </Form.Group>
    
    
  
        <Form.Group controlId="formGridCity" className="col col-sm-6">
            <Form.Label>Hauteur</Form.Label>
            <Form.Control className="form-control" type="number" step="any" name="hauteur"  onChange={(e) => setHauteur(e.target.value)} />
        </Form.Group>
</Row>
<Row className="mb-12">
        <Form.Group controlId="formGridState" className="col col-sm-6">
            <Form.Label>Type</Form.Label>
            <Form.Select defaultValue="Choose..." className="form-control" name="type"  onChange={(e) => setType(e.target.value)}>
                <option value="Choose...">Choose...</option>
                <option value="routier">routier</option>
                <option value="ferroviare">ferroviare</option>
                <option value="portable">portable</option>
                <option value="integre">integre</option>
            </Form.Select>
        </Form.Group>
        <Form.Group controlId="formGridpin" className="col col-sm-6">
            <Form.Label>Date d'installation </Form.Label>
            <Form.Control className="form-control" type="datetime-local" name="dateIn" value={dateIn}  onChange={(e) => setDateIn(e.target.value)} />
        </Form.Group>
    </Row>
    <Row className="mb-12">
        <Form.Group controlId="formGridCheckbox" className="col col-sm-6">
            <Form.Label>Statut</Form.Label>
            <Form.Select defaultValue="Choose..." className="form-control" name="statut"  onChange={(e) => setStatut(e.target.value)}>
                <option value="Choose...">Choose...</option>
                <option value="operationnel">operationnel</option>
                <option value="en maintenance">en maintenance</option>
                <option value="hors service">hors service</option>
            </Form.Select>
        </Form.Group>
        <Form.Group controlId="formGridlabel" className="col col-sm-6">
            <Form.Label>Emplacement</Form.Label>
            <Form.Control as="textarea" rows="{3}" className="form-control" name="emplacement"  onChange={(e) => setEmplacement(e.target.value)} />
        </Form.Group>
    </Row>
    <br />
    <Row className="mb-12">
        <Form.Group controlId="formGridCheckbox" className="col col-sm-6">
            <button type="submit"  className="me-2 btn btn-success btn-lg btn-block">Enregistrer</button>
         </Form.Group>  
         <Form.Group controlId="formGridCheckbox" className="col col-sm-6">
           <button type="reset"  className="me-2 btn btn-danger btn-lg btn-block">Annuler</button>
       </Form.Group>
    </Row>
</form>

  )
}

