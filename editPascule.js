import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Appp from '../AppRoute'; 
import { Modal, Button, Row } from 'react-bootstrap';
import Swal from 'sweetalert2'; 

function PontEdit() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [ponts, setPonts] = useState({});

 

  useEffect(() => {
  // console.log(id);
    axios.get(`http://localhost:8000/api/pontsss/${id}`)
      .then(response => {
          setPonts(response.data.ponts);
      });

  }, [id])
  

  const handleChange = event => {
    event.persist();
    setPonts({ ...ponts, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = {
        designation: ponts.designation,
        capacite: ponts.capacite,
        longeur: ponts.longeur,
        largeur: ponts.largeur,
        hauteur: ponts.hauteur,
        type: ponts.type,
        emplacement: ponts.emplacement,
        dateIn: ponts.dateIn,
        fabricant: ponts.fabricant,
        statut: ponts.statut,
        borne: ponts.borne
    }

    axios.put(`http://localhost:8000/api/pontss/${id}`, data)
      .then(response => {
        Swal.fire({
          icon:"success",
          text:data.message
        })
        navigate("/ponts"); 
      })
      .catch(error => console.log(error));
  };
//++++++++++++++++++++++++++++++++++++++++++++++++



const [show, setShow] = useState(true);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);





// +++++++++++  option for update +++++++++++


const [bornes, setBornes] = useState([]);

useEffect(() => {
  axios
    .get('http://localhost:8000/api/bornes')
    .then((response) => setBornes(response.data))
    .catch((error) => console.error(error));
}, []);


// ++++++++++++++++++++++++++++++++++++++++++++++

  return (


    <>
    {/* <Button variant="primary" onClick={handleShow}>
      Show Modal
    </Button> */}

    <Modal show={show} onHide={handleShow} >
      <Modal.Header closeButton>
        <Modal.Title>modifier Pont_Bascule</Modal.Title>
      </Modal.Header>
      <Modal.Body>


      <Form className="container mt-3 mb-3" onSubmit={handleSubmit} >
 
<Row className="mb-12">
      <Form.Group  className="col col-sm-4">
            <Form.Label>Designation</Form.Label>
            <Form.Control type="text" name="designation" value={ponts.designation} onChange={handleChange} className="form-control" />
        </Form.Group>
        <Form.Group  className="col col-sm-4">
            <Form.Label>Capacite</Form.Label>
            <Form.Control type="number" step="any" name="capacite" value={ponts.capacite}   onChange={handleChange} className="form-control" />
        </Form.Group>
        <Form.Group  className="col col-sm-4">
            <Form.Label>Fabricant</Form.Label>
            <Form.Control type="text" name="fabricant" value={ponts.fabricant}   onChange={handleChange} className="form-control" />
        </Form.Group>
</Row>
  
    <Row className="mb-12 ">
        <Form.Group className=" col col-sm-6" >
            <Form.Label>largeur</Form.Label>
            <Form.Control className="form-control" type="number" step="any" name="largeur" value={ponts.largeur}  onChange={handleChange} />
        </Form.Group>
        <Form.Group className="col col-sm-6" >
            <Form.Label>Longeur</Form.Label>
            <Form.Control className="form-control" name="longeur" value={ponts.longeur}  type="number" step="any"  onChange={handleChange} />
        </Form.Group>
    </Row>
    <Row className="mb-12">
        <Form.Group  className="col col-sm-6">
            <Form.Label>Hauteur</Form.Label>
            <Form.Control className="form-control" type="number" value={ponts.hauteur}  step="any" name="hauteur"  onChange={handleChange} />
        </Form.Group>
        <Form.Group  className="col col-sm-6">
            <Form.Label>Type</Form.Label>
            <Form.Select defaultValue="Choose..." className="form-control" name="type" value={ponts.type}  onChange={handleChange}>
                <option value="Choose...">Choose...</option>
                <option value="routier">routier</option>
                <option value="ferroviare">ferroviare</option>
                <option value="portable">portable</option>
                <option value="integre">integre</option>
            </Form.Select>
        </Form.Group>
        <Form.Group controlId="formGridpin" className="sm-8">
            <Form.Label>Date d'installation </Form.Label>
            <Form.Control className="form-control" type="datetime-local" name="dateIn" value={ponts.dateIn} onChange={handleChange} />
        </Form.Group>
    </Row>
    <Row className="mb-12">
        <Form.Group  className="sm-8">
            <Form.Label>Statut</Form.Label>
            <Form.Select defaultValue="Choose..." className="form-control" name="statut" value={ponts.statut}  onChange={handleChange}>
                <option value="Choose...">Choose...</option>
                <option value="operationnel">operationnel</option>
                <option value="en maintenance">en maintenance</option>
                <option value="hors service">hors service</option>
            </Form.Select>
        </Form.Group>
        <Form.Group  className="sm-8">
            <Form.Label>Emplacement</Form.Label>
            <Form.Control as="textarea" rows="{3}" className="form-control" name="emplacement" value={ponts.emplacement}  onChange={handleChange} />
        </Form.Group>
    </Row>
         <div className="form-group">
        <label htmlFor="borne">Terminal:</label>
<select
  id="borne"
  name="borne"
  value={ponts.borne}
  onChange={handleChange}
  className="form-select" aria-label="Default select example"
>

    {bornes.map((borne) => (
    <option key={borne.id} value={borne.id}>
      {borne.emplacement_phy}
    </option>
  ))}

</select>
</div> 


     {/* <button type="submit"onClick={handleSubmit}  className="btn btn-primary">Modifier</button>  */}
    
</Form>
    </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default PontEdit;