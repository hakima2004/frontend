import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Form, Button, Table, Collapse } from 'react-bootstrap';
import Appp from '../AppRoute';
import moment from 'moment';
import { CardBody, CardTitle, CardText } from 'reactstrap';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import FolderSharedIcon from '@mui/icons-material/FolderShared';

function Clock() {
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm:ss'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format('HH:mm:ss'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock">
      <h2>{currentTime}</h2>
    </div>
  );
}

function Camions() {
  const [camions, setCamions] = useState([]);
  const [pesees, setPesees] = useState([]);
  const [statut, setStatut] = useState('');
  const [searchState, setSearchState] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);

  const [visibleA, setVisibleA] = useState(false);
  const [visibleB, setVisibleB] = useState(false);
  const [visibleC, setVisibleC] = useState(false);
  const [visibleD, setVisibleD] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const comparaisonResponse = await axios.get('http://localhost:8000/api/comparaison');
      setCamions(comparaisonResponse.data);

      const peseeResponse = await axios.get('http://localhost:8000/api/peseeS');
      setPesees(peseeResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/ponts/search/${statut}`);
      setSearchState(response.data);
      setShowNoResults(response.data.length === 0);
    } catch (error) {
      console.error(error);
    }
  };
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetchUserCount();
  }, []);

  const fetchUserCount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/nbrUser');
      setUserCount(response.data.count);
    } catch (error) {
      console.log('Error fetching user count:', error);
    }
  };
  const [conducteurCount, setConducteurCount] = useState(0);

  useEffect(() => {
    fetchConducteurCount();
  }, []);

  const fetchConducteurCount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/count');
      const count = response.data.count;
      setConducteurCount(count);
    } catch (error) {
      console.log('Error fetching conducteur count:', error);
    }
  };

  


  const [condCount, setCondCount] = useState(0);

  useEffect(() => {
    fetchCondCount();
  }, []);

  const fetchCondCount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/countUs');
      const count = response.data.count;
      setCondCount(count);
    } catch (error) {
      console.log('Error fetching conducteur count:', error);
    }
  };

  return (
    <div>
      <Appp />

      <br /> <br />
      <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={12} sm={6} md={4} className="mb-4">
          <Card className="text-center p-4">
            <CardTitle tag="h5" className="mb-4">
              Nombre des Utilisateurs
            </CardTitle>
            <CardBody>
              <PeopleIcon style={{ fontSize: "4rem" }} />
              <CardText className="mt-4">{userCount}</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-4">
          <Card className="text-center p-4">
            <CardTitle tag="h5" className="mb-4">
              Nombre des Véhicules
            </CardTitle>
            <CardBody>
              <DirectionsRailwayIcon style={{ fontSize: "4rem" }} />
              <CardText className="mt-4">{condCount}</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-4">
          <Card className="text-center p-4">
            <CardTitle tag="h5" className="mb-4">
              Nombre des conducteurs
            </CardTitle>
            <CardBody>
              <FolderSharedIcon style={{ fontSize: "4rem" }} />
              <CardText className="mt-4">{conducteurCount}</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
       <br /> 
      <Container>
        <Row>
          <Col xs={12} sm={6} md={4} className="mb-4">
            <Button variant="outline-success" color="light" shape="rounded-pill" size="lg" onClick={() => setVisibleA(!visibleA)} className="w-100 mb-3">
              Quantite Sortante pour Chaque Vehicule
            </Button>
            <Collapse in={visibleA}>
              <Card border="secondary" style={{ width: '100%' }}>
                <Card.Header>Somme des poids net sortie</Card.Header>
                <Card.Body>
                  {camions.map((camion) => (
                    <div key={camion.num_camion}>
                      <Card.Title>{camion.num_camion}</Card.Title>
                      <Card.Text>{camion.sum_poids_net}</Card.Text>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Collapse>
          </Col>
          <Col xs={12} sm={6} md={3} className="mb-4">
            <Button variant="outline-success" color="light" shape="rounded-pill" size="lg" onClick={() => setVisibleB(!visibleB)} className="w-100 mb-3">
              Nbr des peses par semaine
            </Button>
            <Collapse in={visibleB}>
              <Card border="secondary" style={{ width: '100%' }}>
                <Card.Header>Nombre des pesées par semaine</Card.Header>
                <Card.Body>
                  {pesees.map((pesee) => (
                    <div key={pesee.week_num}>
                      <Card.Title>semaine {pesee.week_num}</Card.Title>
                      <Card.Text>{pesee.count} pesées</Card.Text>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Collapse>
          </Col>
          <Col xs={12} sm={6} md={5} className="mb-4">
            <Button variant="outline-success" color="light" shape="rounded-pill" size="lg" onClick={() => setVisibleC(!visibleC)} className="w-100 mb-3">
              Emplacement des P-bascules par rapport à ses l'etats
            </Button>
            <Collapse in={visibleC}>
              <Card border="secondary" style={{ width: '100%' }}>
                <Card.Header>Chercher par état</Card.Header>
                <Card.Body>
                  <Form className="d-flex" style={{ width: '90%' }} >
                      <Form.Control
                        type="text"
                        value={statut}
                        onChange={(e) => setStatut(e.target.value)}
                        placeholder="Status"
                        size="lg"
                        className="me-4"
                      />
                    <Button variant="info" onClick={handleSearch} >
                      Chercher
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Collapse>
            {searchState.length > 0 && (
              <Card border="success" className="mt-3">
                <Card.Header>Résultats de la recherche</Card.Header>
                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Emplacement</th>
                        {/* ... Add other columns ... */}
                      </tr>
                    </thead>
                    <tbody>
                      {searchState.map((row, index) => (
                        <tr key={index}>
                          <td>{row.emplacement}</td>
                          {/* ... Add other cells ... */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            )}
            {showNoResults && (
              <Card border="danger" className="mt-3">
                <Card.Body>
                  <p className="text-center">aucun Resultat.</p>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Camions;





// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Card, Container, Row, Col } from 'react-bootstrap';
// import Appp from '../AppRoute';
// import moment from 'moment';

// function Clock() {
//   const [currentTime, setCurrentTime] = useState(moment().format('HH:mm:ss'));

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(moment().format('HH:mm:ss'));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="clock">
//       <h2>{currentTime}</h2>
//     </div>
//   );
// }

// function Camions() {
//   const [camions, setCamions] = useState([]);
//   const [pesees, setPesees] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const comparaisonResponse = await axios.get('http://localhost:8000/api/comparaison');
//       setCamions(comparaisonResponse.data);

//       const peseeResponse = await axios.get('http://localhost:8000/api/peseeS');
//       setPesees(peseeResponse.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="dashboard">
//       <Appp />
//       <Container>
//         <Row className="justify-content-center">
//           <Col md={4} className="mb-4">
//             <Card className="camion-card" border="secondary">
//               <Card.Header className="card-header">Total Net Weight</Card.Header>
//               <Card.Body>
//                 <Card.Title>{camions.length}</Card.Title>
//                 <Card.Text>{camions.length > 1 ? 'Camions' : 'Camion'}</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md={4} className="mb-4">
//             <Card className="pesee-card" border="secondary">
//               <Card.Header className="card-header">Number of Weighings</Card.Header>
//               <Card.Body>
//                 <Card.Title>{pesees.length}</Card.Title>
//                 <Card.Text>{pesees.length > 1 ? 'Weighings' : 'Weighing'}</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md={4} className="mb-4">
//             <Card className="clock-card" border="secondary">
//               <Card.Header className="card-header">Current Time</Card.Header>
//               <Card.Body>
//                 <Clock />
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// export default Camions;
