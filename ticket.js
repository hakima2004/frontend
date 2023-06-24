import React from 'react';
import Barcode from 'react-barcode';
import { Modal, Button } from 'react-bootstrap';
import { PDFExport } from '@progress/kendo-react-pdf';

const TicketModal = ({ show, onHide, row, pdfRef }) => {
  return (
    
      <Modal show={show} onHide={onHide} style={{ position: 'fixed', marginTop: '10%' , fontSize: "80%"}}>
       
        <Modal.Header closeButton>
          <Modal.Title>Ticket de pesé</Modal.Title>
        </Modal.Header>
      <PDFExport ref={pdfRef}>    <Modal.Body>
                 <h5> Un pesage</h5>
         <div style={{marginLeft: "5%"}}>
            <p>Date/Heure: {row.date_heure}</p>
            <p>Poids brut: {row.poids_brut}</p>
            <p>Poids net: {row.poids_net}</p>
            <p>Tare: {row.tare}</p>
            <p>Unite de mesure: {row.unite_mesure}</p>
            <p>Emplacement: {row.emplacement}</p>
            <p>Etat: {row.etat}</p>
            <p>Produit: {row.produit}</p>
            <p>Camion: {row.camion}</p>
            <p>Terminal: {row.ip_adr}</p>
           
          </div>
           <Barcode value={row.date_heure} style={{marginLeft: "0%"}}/>
        </Modal.Body></PDFExport>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Fermer
          </Button>
          <Button variant="primary"  onClick={() => pdfRef.current.save()}>
            Télécharger PDF
          </Button>
        </Modal.Footer>
      </Modal>
    
  );
};

export default TicketModal;
