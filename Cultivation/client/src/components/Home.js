import React, { useState, useEffect } from 'react';
import { getAllCults } from '../APIManagers/CultManager';
import './Home.css';  // A CSS file you may want to create to style the Home component
import { Link } from 'react-router-dom';

export default function Home() {
    const [cults, setCults] = useState([]);

    useEffect(() => {
        getAllCults().then((data) => setCults(data));
    }, []);

    return (
        <div className="home-container">
            <h1>Featured Cult List</h1>
            <div className="cult-list">
                {cults.slice(0, 5).map((cult) => ( 
                    <div key={cult.id} className="cult-item">
                        <Link to={`/cults/${cult.id}`}>{cult.name}</Link>
                    </div>
                ))}
            </div>
    
            <footer className="footer">
                <p>© 2023 Cult of Cults</p>
            </footer>
        </div>
    );
}
