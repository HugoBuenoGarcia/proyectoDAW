import React, { useState } from "react";
import { API_URL } from "../api";
const Footer = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comentario, setComentario] = useState("");
  const [enviado, setEnviado] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert(
        "¡La Résistance necesita al menos una estrella para registrar tu informe!",
      );
      return;
    }

    const datosValoracion = {
      puntuacion: rating,
      comentario: comentario,
      pagina_url: window.location.pathname,
    };

    try {
      const respuesta = await fetch(`${API_URL}/api/valoraciones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosValoracion),
      });

      if (respuesta.ok) {
        setEnviado(true);
      } else {
        alert("Error al enviar el reporte al cuartel general.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo contactar con el servidor.");
    }
  };

  return (
    <footer className="footer-container">
      <div className="footer-info">
        <p>
          &copy; 2026 Hugo Bueno García - Archivos Clasificados de Mutant
          Busters.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
