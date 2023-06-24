import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Appp from '../AppRoute';
import ocpp from '../ocpp.jpg';

function VehiculesPoids() {
  const [vehicules, setVehicules] = useState([]);

  useEffect(() => {
    fetchVehicules();
  }, []);

  const fetchVehicules = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/test');
      const data = await response.json();
      setVehicules(data);
    } catch (error) {
      console.log('Error fetching vehicules:', error);
    }
  };

  const generatePdfReport = () => {
    const doc = new jsPDF();

    // Add OCP logo
    const logoImg = new Image();
    logoImg.src = ocpp;
    doc.addImage(logoImg, 'JPG', 10, 10, 20, 20);

    // Add report title
    doc.setFontSize(20);
    doc.text('Rapport des alerts', 70, 30);

    // Get table data
    const tableData = vehicules.map(vehicule => [
      vehicule.num_camion,
      vehicule.poids_entree,
      vehicule.poids_sortie,
    ]);

    // Calculate table width and center position
    const tableWidth = 160;
    const pageWidth = doc.internal.pageSize.getWidth();
    const startX = (pageWidth - tableWidth) / 2;

    // Add table to the PDF
    doc.autoTable({
      startY: 40,
      head: [['IMM Véhicule', 'Poids d\'entrée', 'Poids de sortie']],
      body: tableData,
      startX: startX,
      styles: { halign: 'center' },
    });

    // Save the PDF
    doc.save('rapport.pdf');
  };

  return (
    <div>
      <Appp />

<br /> <br />

<div row= "mb-3" >
       <div className="col-10">
                <div className="card card-body" style={{marginLeft: '20%'}}>    
                  <h2 style={{ textAlign: 'center', margin: '20px 0', color: 'blue', fontSize: '24px', fontWeight: 'bold' }}>
  Rapport des alerts
</h2>
                    <div className="table-responsive" > 
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>IMM Véhicule</th>
            <th>Poids d'entrée</th>
            <th>Poids de sortie</th>
          </tr>
        </thead>
        <tbody>
          {vehicules.map(vehicule => (
            <tr key={vehicule.camion}>
              <td>{vehicule.num_camion}</td>
              <td>{vehicule.poids_entree}</td>
              <td>{vehicule.poids_sortie}</td>
            </tr>
          ))}
        </tbody>
      </Table>
</div></div></div></div>
<br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={generatePdfReport} variant="info">
          Générer un rapport PDF
        </Button>
      </div>
    </div>
  );
}

export default VehiculesPoids;
