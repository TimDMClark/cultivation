import React, { useState, useEffect } from "react";
import { getAllCults } from "../../APIManagers/CultManager";
import { Cult } from "../Cult";

const CultList = () => {
  const [cults, setCults] = useState([]);

  const getCults = () => {
    getAllCults().then(allCults => setCults(allCults)); 
  };

  useEffect(() => {
    getCults();
  }, []); 



  return (  
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {cults.map((cult) => (
            <Cult key={cult.id} cult={cult} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CultList;