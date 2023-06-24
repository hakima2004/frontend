import { useState, useEffect } from 'react';
import axios from 'axios';

function useTraite() {
  const [camions, setCamions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/test').then(response => {
      setCamions(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Véhicules avec quantités d'entrée et de sortie égales</h1>
      <table>
        <thead>
          <tr>
            <th>Marque</th>
            <th>Modèle</th>
            <th>Année</th>
          </tr>
        </thead>
        <tbody>
          {camions.map(camion => (
            <tr key={camion.id}>
              <td>{camion.num_camion}</td>
              <td>{camion.poids}</td>
              <td>{camion.conducteur}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default useTraite;
