import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { API_URL } from "../api";

const Login = () => {
  const [esRegistro, setEsRegistro] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rol: "usuario",
  });
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = esRegistro ? "registro" : "login";
    try {
      const response = await fetch(`${API_URL}/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success || data.message === "Usuario registrado con éxito") {
        if (!esRegistro) {
          localStorage.setItem("usuario", JSON.stringify(data.usuario));
          navigate("/");
          window.location.reload();
        } else {
          setMensaje("Registro completado. ¡Ahora inicia sesión!");
          setEsRegistro(false);
        }
      } else {
        setMensaje(data.message || "Error en la operación");
      }
    } catch (error) {
      setMensaje("Error de conexión.");
    }
  };

  return (
    <div className="login-page tema-human">
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h2>{esRegistro ? "NUEVO RECLUTA" : "ACCESO AL SISTEMA"}</h2>
            <div className="separador"></div>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {esRegistro && (
              <>
                <div className="input-group">
                  <label>NOMBRE DE USUARIO</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Ej: Sheriff_01"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>ROL</label>
                  <select
                    name="rol"
                    onChange={handleChange}
                    className="select-rol"
                    value={formData.rol}
                  >
                    <option value="usuario">Usuario</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </>
            )}

            <div className="input-group">
              <label>CORREO ELECTRÓNICO</label>
              <input
                type="email"
                name="email"
                placeholder="recluta@ejemplo.com"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>CONTRASEÑA</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                onChange={handleChange}
                required
              />
            </div>

            {mensaje && <p className="login-msg">{mensaje}</p>}

            <button type="submit" className="btn-hero">
              {esRegistro ? "CONFIRMAR REGISTRO" : "INICIAR SESIÓN"}
            </button>
          </form>

          <div className="login-footer">
            <p onClick={() => setEsRegistro(!esRegistro)}>
              {esRegistro
                ? "¿Ya eres parte de La Résistance? Inicia Sesión"
                : "¿Eres un nuevo recluta? Regístrate aquí"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
