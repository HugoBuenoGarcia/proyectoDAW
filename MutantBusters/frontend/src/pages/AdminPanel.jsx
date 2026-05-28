import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../AdminPanel.css";
import { API_URL } from "../api";

const AdminPanel = () => {
  const navigate = useNavigate();
  const usuarioActual = JSON.parse(localStorage.getItem("usuario"));
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rol: "usuario",
  });

  useEffect(() => {
    if (usuarioActual?.rol !== "admin") {
      alert("No tienes acceso al panel de administración.");
      navigate("/");
      return;
    }

    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/usuarios?solicitanteRol=${usuarioActual?.rol}`,
      );
      const data = await response.json();
      if (data.success) {
        setUsuarios(data.usuarios);
        setMensaje("");
      } else {
        setMensaje(data.message || "Error al cargar usuarios");
      }
    } catch (error) {
      setMensaje("Error de conexión con el servidor");
    } finally {
      setCargando(false);
    }
  };

  const handleEditar = (usuario) => {
    setUsuarioEditando(usuario.id);
    setFormData({
      username: usuario.username,
      email: usuario.email,
      password: "",
      rol: usuario.rol,
    });
  };

  const handleCancelar = () => {
    setUsuarioEditando(null);
    setFormData({
      username: "",
      email: "",
      password: "",
      rol: "usuario",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuardar = async () => {
    try {
      const datosActualizados = { ...formData };
      if (!datosActualizados.password) {
        delete datosActualizados.password;
      }
      datosActualizados.solicitanteId = usuarioActual?.id;
      datosActualizados.solicitanteRol = usuarioActual?.rol;

      const response = await fetch(
        `${API_URL}/api/usuarios/${usuarioEditando}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosActualizados),
        },
      );

      const data = await response.json();
      if (data.success) {
        setMensaje("Usuario actualizado correctamente");
        setUsuarioEditando(null);
        cargarUsuarios();
      } else {
        setMensaje(data.message || "Error al actualizar usuario");
      }
    } catch (error) {
      setMensaje("Error de conexión");
    }
  };

  const handleEliminar = async (id) => {
    if (
      !window.confirm(
        "¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer.",
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/usuarios/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      setMensaje(data.message || "Usuario eliminado correctamente");
      cargarUsuarios();
    } catch (error) {
      setMensaje("Error al eliminar usuario");
    }
  };

  if (cargando) {
    return (
      <div className="admin-container">
        <p>Cargando panel de administración...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h1>Panel de Administración</h1>
      {mensaje && (
        <p
          className={`admin-msg ${mensaje.includes("Error") ? "error" : "success"}`}
        >
          {mensaje}
        </p>
      )}

      <div className="usuarios-tabla">
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.username}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol}</td>
                <td className="acciones">
                  <button
                    className="btn-editar"
                    onClick={() => handleEditar(usuario)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminar(usuario.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {usuarioEditando && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <h2>Editar Usuario</h2>
            <div className="form-grupo">
              <label>Nombre de usuario</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-grupo">
              <label>Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-grupo">
              <label>
                Nueva contraseña (dejar en blanco para mantener la actual)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nueva contraseña"
              />
            </div>

            <div className="form-grupo">
              <label>Rol</label>
              <select name="rol" value={formData.rol} onChange={handleChange}>
                <option value="usuario">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div className="modal-acciones">
              <button className="btn-guardar" onClick={handleGuardar}>
                Guardar
              </button>
              <button className="btn-cancelar" onClick={handleCancelar}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
