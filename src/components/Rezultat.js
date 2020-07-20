import React from 'react';
import proizvodi from './VrstaDropdown';


const Rezultat = ({ proizvodi }) => {
    return (
      <div>
          <h1>Proizvodi u ponudi</h1>
          {proizvodi.map((proizvod) => (
              <a href={`/proizvod/${id}`}> {proizvodi.naziv}</a>
              <h1>Cijena: {proizvodi.cijena}</h1>}
          ))
      </div>
    );
  };

export default Rezultat;