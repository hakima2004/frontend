import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { Modal, Button, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function PeseeForm () {

  const [dateHeure, setDateHeure] = useState('');
  const [poidsBrut, setPoidsBrut] = useState(0);
  const [tare, setTare] = useState(0);
  const [poidsNet, setPoidsNet] = useState(0);
  const [uniteMesure, setUniteMesure] = useState('');
  const [emplacement, setEmplacement] = useState('');
  const [etat, setEtat] = useState('');
  const [operateur, setOperateur] = useState('');
  const [camion, setCamion] = useState('');
  const [produit, setProduit] = useState('');
  const [borne, setBorne] = useState('');
  const [operateurs, setOperateurs] = useState([]);
  const [bornes, setBornes] = useState([]);
  const [produits, setProduits] = useState([]);
  const [camions, setCamions] = useState([]);





 

  const navigate = useNavigate();

  
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().substring(0, 16); // Format: yyyy-mm-ddThh:mm
    setDateHeure(formattedDate);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const pesee = {
      date_heure: dateHeure,
      poids_brut: poidsBrut,
      poids_net: poidsNet,
      tare: tare,
      unite_mesure: uniteMesure,
      emplacement: emplacement,
      etat: etat,
      operateur: operateur,
      camion: camion,
      produit: produit,
      borne: borne
    };
    await axios.get(`http://localhost:8000/api/pesees`, {params: pesee})
    .then(response => {
      if (response.data && response.data.message) {
        Swal.fire({
          icon: "success",
          text: response.data.message
        })
        navigate("/list");
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
  
  return (
    <>
    <div >
     
  
      
    <form className="container mt-3 mb-3" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="dateHeure">Date et heure:</label>
        <input id="dateHeure" type="datetime-local" className="form-control" value={dateHeure} onChange={(e) => setDateHeure(e.target.value)} required />
      </div>
      <Row className="mb-12">
     
      <div className="col col-sm-6">
        <label htmlFor="poidsBrut">Poids brut:</label>
        <input id="poidsBrut" type="number" className="form-control" value={poidsBrut} onChange={(e) => setPoidsBrut(e.target.value)} required />
      </div>
      <div className="col col-sm-6">
        <label htmlFor="tare">Tare:</label>
        <input id="tare" type="number" className="form-control" value={tare} onChange={(e) => setTare(e.target.value)} required />
      </div>
      </Row>
      <Row className="mb-12">
      <div className="col col-sm-6">
        <label htmlFor="poidsNet">Poids net:</label>
        <input id="poidsNet" type="number" className="form-control" value={poidsNet} onChange={(e) => setPoidsNet(e.target.value)} required />
      </div>
      <div className="col col-sm-6">
        <label htmlFor="uniteMesure">Unité de mesure:</label>
        <input id="uniteMesure" type="text" className="form-control" value={uniteMesure} onChange={(e) => setUniteMesure(e.target.value)} required />
      </div>
</Row>

      <div className="form-group">
        <label htmlFor="emplacement">Emplacement:</label>
<select
  id="emplacement"
  name="emplacement"
  value={emplacement}
  onChange={(e) => setEmplacement(e.target.value)}
  className="form-select" aria-label="Default select example"
>
    <option key={emplacement} value="ocp">ocp
    </option>
    <option key={emplacement} value="youssoufia">youssoufia
    </option>
    <option key={emplacement} value="port">port
    </option>

</select>
</div>
<div className="form-group">
        <label htmlFor="etat">Etat:</label>
<select
  id="etat"
  name="etat"
  value={etat}
  onChange={(e) => setEtat(e.target.value)}
  className="form-select" aria-label="Default select example"
>
    <option key={etat} value="entree">entree
    </option>
    <option key={etat} value="sortie">sortie
    </option>

</select>

      </div>

      <div className="form-group">
        <label htmlFor="operateur">Opérateur:</label>
<select
  id="operateur"
  name="operateur"
  value={operateur}
  onChange={(e) => setOperateur(e.target.value)}
  className="form-select" aria-label="Default select example"
>
  {operateurs.map((operateur) => (
    <option key={operateur.id} value={operateur.id}>
      {operateur.name}
    </option>
  ))}
</select>

      </div>
   

      <div className="form-group">
        <label htmlFor="camion">Vehicule:</label>
      <select
        id="camion"
        name="camion"
        value={camion}
        onChange={(e) => setCamion(e.target.value)}
        className="form-select" aria-label="Default select example"
      >
  {camions.map((camion) => (
    <option key={camion.id} value={camion.id}>
      {camion.num_camion}
    </option>
  ))}
     </select>
</div>

      <div className="form-group">
        <label htmlFor="produit">Produit:</label>
      <select
        id="produit"
        name="produit"
        value={produit}
        onChange={(e) => setProduit(e.target.value)}
        className="form-select" aria-label="Default select example"
      >
  {produits.map((produit) => (
    <option key={produit.id} value={produit.id}>
      {produit.type}
    </option>
  ))}
     </select>
</div>
<div className="form-group">
        <label htmlFor="borne">Terminal:</label>
      <select
        id="borne"
        name="borne"
        value={borne}
        onChange={(e) => setBorne(e.target.value)}
        className="form-select" aria-label="Default select example"
      >
  {bornes.map((borne) => (
    <option key={borne.id} value={borne.id}>
      {borne.emplacement_phy}
    </option>
  ))}
     </select>
</div>
      {/* <button type="submit" className="btn btn-primary">Ajouter</button> */}
      
    </form>

       <div style={{ paddingLeft: "70%"}}>
          <Button variant="primary" onClick={handleSubmit}>
            Enregistrer
          </Button>
        </div>
      </div>
    </>
  );
};
