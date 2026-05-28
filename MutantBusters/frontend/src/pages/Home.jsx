import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>¡TE DAMOS LA BIENVENIDA A LA RÉSISTANCE HQ RéBUSTED!</h1>
          <p>
            Explora los archivos de La Résistance y descubre todos los secretos
            de un mundo post-apocalíptico devastado.
          </p>
          <div className="hero-buttons">
            <Link to="/facciones" className="btn-hero">
              FACCIONES
            </Link>
            <Link to="/episodios" className="btn-hero btn-secondary">
              EPISODIOS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
