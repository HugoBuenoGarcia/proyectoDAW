import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetallePersonaje = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [personaje, setPersonaje] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/personajes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPersonaje(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al acceder al archivo:", err);
        setCargando(false);
      });
  }, [id]);

  if (cargando)
    return (
      <div className="loading">Accediendo a la base de datos central...</div>
    );
  if (!personaje)
    return (
      <div className="error">
        Error: Sujeto no encontrado en el archivo histórico.
      </div>
    );

  const esResistencia = personaje.id_faccion === 1;

  return (
    <div
      className={`detalle-page ${esResistencia ? "tema-human" : "tema-mutant"}`}
    >
      <div className="container">
        <button onClick={() => navigate(-1)} className="btn-back">
          « VOLVER AL CUARTEL
        </button>

        <div className="ficha-personaje">
          <div className="ficha-header">
            <h1>{personaje.nombre}</h1>
            <span className="badge">
              {esResistencia ? "UNIDAD DE LA RÉSISTANCE" : "AMENAZA MUTANTE"}
            </span>
          </div>

          <div className="ficha-body">
            <div className="ficha-img">
              <img
                src={
                  personaje.url_archivo ||
                  "/imagenes/placeholder_expediente.jpg"
                }
                alt={personaje.nombre}
              />
            </div>

            <div className="ficha-info">
              <h3>EXPEDIENTE TÉCNICO</h3>
              <p className="descripcion">{personaje.descripcion}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallePersonaje;
