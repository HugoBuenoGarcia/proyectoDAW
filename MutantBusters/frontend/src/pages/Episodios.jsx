import React, { useEffect, useState } from "react";
import { API_URL } from "../api";

const Episodios = () => {
  const [episodios, setEpisodios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/episodios`)
      .then((res) => res.json())
      .then((data) => {
        setEpisodios(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al recuperar el archivo de episodios:", err);
        setCargando(false);
      });
  }, []);

  return (
    <main className="episodios-page">
      <header className="page-header">
        <h1>Archivo de episodios</h1>
        <p>
          A continuación se muestran los episodios de la serie de televisión
          Mutant Busters. Haz clic sobre el título de un episodio para verlo.
        </p>
      </header>

      <div className="container">
        {cargando ? (
          <div className="loader">
            Sincronizando con el satélite de La Résistance...
          </div>
        ) : (
          <section className="lista-episodios">
            {episodios.length > 0 ? (
              episodios.map((ep) => (
                <article key={ep.id} className="episodio-card">
                  <div className="ep-contenido">
                    <a
                      href={ep.url_video || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-titulo-episodio"
                    >
                      <h2>{ep.titulo}</h2>
                    </a>
                    <p>{ep.sipnosis}</p>
                  </div>
                </article>
              ))
            ) : (
              <p className="no-data">
                No se han encontrado registros en la base de datos.
              </p>
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default Episodios;
