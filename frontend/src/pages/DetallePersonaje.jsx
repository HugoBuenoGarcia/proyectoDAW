import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { datosExtra } from "../data/dataPersonajes";
import { API_URL } from "../api";

const DetallePersonaje = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [personaje, setPersonaje] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [resenas, setResenas] = useState([]);
  const [nuevaResena, setNuevaResena] = useState("");
  const [puntuacion, setPuntuacion] = useState(5);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    fetch(`${API_URL}/api/personajes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPersonaje(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al acceder al archivo:", err);
        setCargando(false);
      });

    fetch(`${API_URL}/api/resenas/personaje/${id}`)
      .then((res) => res.json())
      .then((data) => setResenas(data))
      .catch((err) => console.error("Error cargando reseñas:", err));
  }, [id]);

  const enviarResena = (e) => {
    e.preventDefault();
    if (!nuevaResena.trim()) return;
    if (!usuario) {
      alert("Debes iniciar sesión para reportar una valoración.");
      return;
    }

    const data = {
      id_usuario: usuario.id,
      puntuacion: puntuacion,
      comentario: nuevaResena,
      id_referencia: id,
      tipo_referencia: "personaje",
    };

    fetch(`${API_URL}/api/resenas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok)
          throw new Error("Error en la respuesta del servidor central");
        return res.json();
      })
      .then(() => {
        setResenas([
          { ...data, username: usuario.username, fecha: new Date() },
          ...resenas,
        ]);
        setNuevaResena("");
        setPuntuacion(5);
      })
      .catch((err) => {
        console.error("Error al enviar reseña:", err);
        alert("Error al registrar la valoración en el búnker.");
      });
  };

  const eliminarResena = (idResena) => {
    if (
      !window.confirm(
        "¿Seguro que deseas borrar este informe del registro público?",
      )
    )
      return;

    fetch(
      `${API_URL}/api/resenas/${idResena}?solicitanteRol=${usuario?.rol}&solicitanteId=${usuario?.id}`,
      {
        method: "DELETE",
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar la reseña");
        return res.json();
      })
      .then(() => {
        setResenas(resenas.filter((r) => r.id !== idResena));
      })
      .catch((err) => {
        console.error(err);
        alert("No se pudo eliminar la valoración.");
      });
  };

  if (cargando)
    return (
      <div className="loading">Accediendo a archivos de La Résistance...</div>
    );
  if (!personaje)
    return <div className="error">Sujeto no encontrado en el archivo.</div>;

  const esResistance = personaje.id_faccion === 1;
  const renderEstrellas = (num) => "★".repeat(num) + "☆".repeat(5 - num);

  return (
    <div
      className={`detalle-page ${esResistance ? "tema-human" : "tema-mutant"}`}
    >
      <div className="container">
        <button onClick={() => navigate(-1)} className="btn-back">
          « VOLVER AL CUARTEL
        </button>

        <div className="ficha-completa">
          <div className="ficha-superior">
            <div className="ficha-imagen">
              <img
                src={personaje.url_archivo || "/imagenes/placeholder.jpg"}
                alt={personaje.nombre}
              />
            </div>

            <div className="ficha-info-basica">
              <h1 className="nombre-detalle">{personaje.nombre}</h1>
              <div className="separador"></div>
              <p className="descripcion-breve">{personaje.descripcion}</p>
            </div>
          </div>

          <div className="seccion-adicional">
            <h3>Información adicional</h3>
            <ul className="lista-puntos">
              {datosExtra[id] ? (
                datosExtra[id].map((detalle, index) => (
                  <li key={index}>{detalle}</li>
                ))
              ) : (
                <li>
                  No hay detalles adicionales en este expediente clasificado.
                </li>
              )}
            </ul>
          </div>

          <hr className="separador-seccion" />

          {/* SECCIÓN DE RESEÑAS */}
          <div className="seccion-resenas">
            <h3>Reseñas de la comunidad</h3>
            {usuario ? (
              <form className="form-resena" onSubmit={enviarResena}>
                <div className="selector-estrellas">
                  <label>Tu valoración: </label>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`estrella-btn ${num <= puntuacion ? "activa" : ""}`}
                      onClick={() => setPuntuacion(num)}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <textarea
                  placeholder="Escribe tu opinión sobre este sujeto..."
                  value={nuevaResena}
                  onChange={(e) => setNuevaResena(e.target.value)}
                />
                <button type="submit" className="btn-hero">
                  Enviar Reseña
                </button>
              </form>
            ) : (
              <p className="nota-login">
                Inicia sesión para dejar tu reseña en el archivo.
              </p>
            )}

            <div className="lista-resenas">
              {resenas.length > 0 ? (
                resenas.map((r, idx) => (
                  <div key={r.id} className="resena-card">
                    <div className="resena-header">
                      <strong>{r.username.toUpperCase()}</strong>
                      <span className="estrellas-display">
                        {renderEstrellas(r.puntuacion)}
                      </span>
                    </div>
                    <p>{r.comentario}</p>
                    <div className="resena-footer-admin">
                      <small>{new Date(r.fecha).toLocaleDateString()}</small>
                      {usuario &&
                        (usuario.rol === "admin" ||
                          usuario.id === r.id_usuario) && (
                          <button
                            onClick={() => eliminarResena(r.id)}
                            className="btn-delete-resena"
                          >
                            {usuario.id === r.id_usuario
                              ? "ELIMINAR RESEÑA"
                              : "ELIMINAR RESEÑA DE USUARIO"}
                          </button>
                        )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-resenas">
                  No hay reseñas sobre este sujeto todavía.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallePersonaje;
