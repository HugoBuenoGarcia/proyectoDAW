import React, { useEffect, useState } from "react";
import { detallesExtraSets } from "../data/dataSets";
import { API_URL } from "../api";

const Sets = () => {
  const [sets, setSets] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/sets`)
      .then((res) => res.json())
      .then((data) => {
        setSets(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error cargando sets:", err);
        setCargando(false);
      });
  }, []);

  return (
    <main className="episodios-page">
      <header className="page-header">
        <h1>Archivos de sets</h1>
        <p>
          A continuación se presentan los distintos sets de juguete de Mutant
          Busters que salieron a la venta en su día.
        </p>
      </header>

      <div className="container">
        {cargando ? (
          <div className="loader">Sincronizando inventario...</div>
        ) : (
          <section className="lista-episodios">
            {sets.map((set) => (
              <article key={set.id} className="episodio-card set-card">
                <div className="set-img-container">
                  <img
                    src={set.url_imagen || "/imagenes/placeholder-set.jpg"}
                    alt={set.nombre}
                    className="set-mini-img"
                  />
                </div>

                <div className="ep-contenido">
                  <h2>{set.nombre}</h2>
                  <p>{set.descripcion}</p>
                  {detallesExtraSets[set.id] && (
                    <ul className="set-detalles-extra">
                      {detallesExtraSets[set.id].map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default Sets;
