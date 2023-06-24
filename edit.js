import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Appp from '../AppRoute'; 
import { Modal, Button, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';


function PeseeEdit() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [pesees, setPesees] = useState({});
  const [validationError,setValidationError] = useState({})

  // const [formData, setFormData] = useState({
  //   date_heure: '',
  //   poids_brut: '',
  //   poids_net: '',
  //   tare: '',
  //   unite_mesure: '',
  //   operateur: '',
  //   produit: '',
  //   camion: '',
  //   borne: ''
  // });
 

  useEffect(() => {
  // console.log(id);
    axios.get(`http://localhost:8000/api/peseesss/${id}`)
      .then(response => {
          setPesees(response.data.pesees);
      })
      .catch(({response:{data}})=>{
        Swal.fire({
          text:data.message,
          icon:"error"
        })
      })

  }, [id])
  

  const handleChange = event => {
    event.persist();
    setPesees({ ...pesees, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = {
      date_heure: pesees.date_heure,
      poids_brut: pesees.poids_brut,
      poids_net: pesees.poids_net,
      tare: pesees.tare,
      unite_mesure: pesees.unite_mesure,
      emplacement: pesees.emplacement,
      etat: pesees.etat,
      operateur: pesees.operateur,
      produit: pesees.camion,
      camion: pesees.produit,
      borne: pesees.borne
    }

    axios.put(`http://localhost:8000/api/peseess/${id}`, data)
      .then(response => {
        console.log(response);
        Swal.fire({
          icon:"success",
          text:data.message
        })
        navigate("/list"); 
      })
      .catch(({response})=>{
        if(response.status===422){
          setValidationError(response.data.errors)
        }else{
          Swal.fire({
            text:response.data.message,
            icon:"error"
          })
        }
      })
  };
//++++++++++++++++++++++++++++++++++++++++++++++++



const [show, setShow] = useState(true);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);





// +++++++++++  option for update +++++++++++

const [operateurs, setOperateurs] = useState([]);
const [bornes, setBornes] = useState([]);
const [produits, setProduits] = useState([]);
const [camions, setCamions] = useState([]);

useEffect(() => {
  axios
    .get('http://localhost:8000/api/operateurs')
    .then((response) => setOperateurs(response.data))
    .catch((error) => console.error(error));
}, []);

useEffect(() => {
  axios
    .get('http://localhost:8000/api/bornes')
    .then((response) => setBornes(response.data))
    .catch((error) => console.error(error));
}, []);

useEffect(() => {
  axios
    .get('http://localhost:8000/api/produits')
    .then((response) => setProduits(response.data))
    .catch((error) => console.error(error));
}, []);

useEffect(() => {
  axios
    .get('http://localhost:8000/api/camions')
    .then((response) => setCamions(response.data))
    .catch((error) => console.error(error));
}, []);


// ++++++++++++++++++++++++++++++++++++++++++++++

  return (


    <>
    {/* <Button variant="primary" onClick={handleShow}>
      Show Modal
    </Button> */}

    <Modal show={show} onHide={handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier un pesé</Modal.Title>
      </Modal.Header>
      <Modal.Body>


      <Form className="container mt-3 mb-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-2" >
          <Form.Label htmlFor="date_heure">Date/Heure:</Form.Label>
          <Form.Control type="datetime-local" name="date_heure" value={pesees.date_heure} onChange={handleChange} />
        </Form.Group>
        <Row className="mb-12">
     
      <Form.Group className="col col-sm-6">
          <Form.Label htmlFor="poids_brut">Poids brut:</Form.Label>
          <Form.Control type="text" name="poids_brut" value={pesees.poids_brut} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="col col-sm-6">
          <Form.Label htmlFor="poids_net">Poids net:</Form.Label>
          <Form.Control type="text" name="poids_net" value={pesees.poids_net} onChange={handleChange} />
        </Form.Group>
        </Row>
        <Row className="mb-12">
     
      <Form.Group className="col col-sm-6">
          <Form.Label htmlFor="tare">Tare:</Form.Label>
          <Form.Control type="text" name="tare" value={pesees.tare} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="col col-sm-6">
          <Form.Label htmlFor="unite_mesure">Unité de mesure:</Form.Label>
          <Form.Control type="text" name="unite_mesure" value={pesees.unite_mesure} onChange={handleChange} />
        </Form.Group>
</Row>
        {/* <Form.Group className="mb-2">
          <Form.Label htmlFor="emplacement">Emplacement:</Form.Label>
          <Form.Control type="text" name="emplacement" value={pesees.emplacement} onChange={handleChange} />
        </Form.Group> */}

 <div className="form-group">
        <label htmlFor="emplacement">Emplacement:</label>
<select
  id="emplacement"
  name="emplacement"
  value={pesees.emplacement}
  onChange={handleChange}
  className="form-select" aria-label="Default select example"
>

  
    <option  value={pesees.emplacement}>
      {pesees.emplacement}
    </option>
     <option  value="ocp">
      ocp
    </option>
    <option  value="youssoufia">
      youssoufia
    </option>
    <option  value="port">
      port
    </option>
</select>
</div>   


         {/* <Form.Group className="mb-2">
          <Form.Label htmlFor="etat">Etat:</Form.Label>
          <Form.Control type="text" name="etat" value={pesees.etat} onChange={handleChange} />
        </Form.Group>  */}
<div className="form-group">
        <label htmlFor="etat">Etat:</label>
<select
  id="etat"
  name="etat"
  value={pesees.etat}
  onChange={handleChange}
  className="form-select" aria-label="Default select example"
>

  
    <option  value={pesees.etat}>
      {pesees.etat}
    </option>
     <option  value="entree">
      entree
    </option>
    <option  value="sortie">
      sortie
    </option>


</select>
</div>  
{/* 
        <Form.Select size="lg">
        <option value={"pesees.etat"}>Etat: {pesees.etat}</option>
        <option value="entree" >entree</option>
        <option value="sortie" >sortie</option>
      </Form.Select> */}

        {/* <Form.Group className="mb-2">
          <Form.Label htmlFor="operateur">Opérateur:</Form.Label>
          <Form.Control type="text" name="operateur" value={pesees.operateur} onChange={handleChange} />
        </Form.Group> */}

 <div className="form-group">
        <label htmlFor="operateur">Operateur:</label>
<select
  id="operateur"
  name="operateur"
  value={pesees.operateur}
  onChange={handleChange}
  className="form-select" aria-label="Default select example"
>

    {operateurs.map((operateur) => (
    <option key={operateur.id} value={operateur.id}>
      {operateur.name}
    </option>
  ))}

</select>
</div>  

        
        {/* <Form.Group className="mb-2">
          <Form.Label htmlFor="produit">Produit:</Form.Label>
          <Form.Control type="text" name="produit" value={pesees.produit} onChange={handleChange} />
        </Form.Group> */}

 <div className="form-group">
        <label htmlFor="produit">Produit:</label>
<select
  id="produit"
  name="produit"
  value={pesees.produit}
  onChange={handleChange}
  className="form-select" aria-label="Default select example"
>

    {produits.map((produit) => (
    <option key={produit.id} value={produit.id}>
      {produit.type}
    </option>
  ))}

</select>
</div>  


        {/* <Form.Group className="mb-2">
          <Form.Label htmlFor="camion">Vehicule:</Form.Label>
          <Form.Control type="text" name="camion" value={pesees.camion} onChange={handleChange} />
        </Form.Group> */}

 <div className="form-group">
        <label htmlFor="camion">Vehicule:</label>
<select
  id="camion"
  name="camion"
  value={pesees.camion}
  onChange={handleChange}
  className="form-select" aria-label="Default select example"
>

    {camions.map((camion) => (
    <option key={camion.id} value={camion.id}>
      {camion.num_camion}
    </option>
  ))}

</select>
</div>  





        {/* <Form.Group className="mb-2">
          <Form.Label htmlFor="borne">Borne:</Form.Label>
          <Form.Control type="text" name="borne" value={pesees.borne} onChange={handleChange} />
        </Form.Group> */}

         <div className="form-group">
        <label htmlFor="borne">Terminal:</label>
<select
  id="borne"
  name="borne"
  value={pesees.borne}
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


        {/* <button type="submit" className="btn btn-primary">Modifier</button> */}
    </Form>

    </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default PeseeEdit;