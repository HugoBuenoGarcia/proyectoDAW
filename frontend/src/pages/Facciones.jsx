import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { API_URL } from "../api";

const Facciones = () => {
  const [searchParams] = useSearchParams();
  const bandoId = searchParams.get("bando");
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    if (bandoId) {
      fetch(`${API_URL}/api/personajes?bando=${bandoId}`)
        .then((res) => res.json())
        .then((data) => setPersonajes(data))
        .catch((err) => console.error("Error:", err));
    }
  }, [bandoId]);

  if (!bandoId) {
    return (
      <div className="container">
        <section className="intro-saga">
          <h1>MUTANT BUSTERS</h1>
          <p>
            Tras un cataclismo de gases tóxicos conocido como "El Gran Pedo", la
            Tierra se ha dividido en dos mitades. Los humanos han quedado
            confinados en la nalga izquierda mientras que los mutantes no cesan
            sus ataques desde la nalga derecha. ¿Acabarán los mutantes con la
            humanidad de una vez por todas? ¿O todavía hay esperanzas puestas en
            alguien con la capacidad para salvar el mundo?
          </p>
        </section>

        <div className="facciones-selector">
          <div className="faccion-info-card">
            <h2>LA RÉSISTANCE</h2>
            <p>
              Liderados por Sheriff, este grupo de humanos utiliza su ingenio y
              tecnología para hacer frente a los mutantes.
            </p>
            <Link to="/facciones?bando=1" className="btn-hero">
              VER MIEMBROS
            </Link>
          </div>

          <div className="faccion-info-card card-mutante">
            <h2>LOS MUTANTES</h2>
            <p>
              Criaturas surgidas de los gases que dominan las zonas más
              peligrosas. Suelen ser brutos, asquerosos y despiadados.
            </p>
            <Link to="/facciones?bando=2" className="btn-hero btn-mutante">
              VER MIEMBROS
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const titulo = bandoId === "1" ? "LA RÉSISTANCE" : "MUTANTES";

  return (
    <div className="container">
      <h1
        className={`titulo-seccion-faccion ${bandoId === "2" ? "mutante" : ""}`}
      >
        {titulo}
      </h1>
      <div className="personajes-grid">
        {personajes.length > 0 ? (
          personajes.map((p) => (
            <div key={p.id} className="personaje-card">
              <Link to={`/personajes/${p.id}`} className="card-link">
                <img src={p.url_archivo} alt={p.nombre} />
                <h3 className="card-title">{p.nombre}</h3>
              </Link>
            </div>
          ))
        ) : (
          <p>Cargando archivos clasificados...</p>
        )}
      </div>
    </div>
  );
};

export default Facciones;
