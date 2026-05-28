import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../api";

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const usuarioActual = JSON.parse(localStorage.getItem("usuario"));
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rol: "",
  });

  const [mensaje, setMensaje] = useState("");
  useEffect(() => {
    if (
      usuarioActual?.rol !== "admin" &&
      usuarioActual?.id?.toString() !== id
    ) {
      alert("No tienes permisos para editar este usuario.");
      navigate("/");
      return;
    }

    cargarUsuario();
  }, [id]);

  const cargarUsuario = async () => {
    try {
      const response = await fetch(`${API_URL}/api/usuarios/${id}`);
      const data = await response.json();
      if (data.success) {
        setFormData({
          username: data.usuario.username || "",
          email: data.usuario.email || "",
          password: "",
          rol: data.usuario.rol || "usuario",
        });
      } else {
        setMensaje(data.message || "Error al cargar usuario");
      }
    } catch (error) {
      setMensaje("Error de conexión");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datosActualizados = {
        ...formData,
        solicitanteId: usuarioActual?.id,
        solicitanteRol: usuarioActual?.rol,
      };
      if (!datosActualizados.password) {
        delete datosActualizados.password;
      }

      const response = await fetch(`${API_URL}/api/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosActualizados),
      });

      const data = await response.json();
      if (data.success) {
        setMensaje("Usuario actualizado correctamente");
        if (usuarioActual.id?.toString() === id) {
          localStorage.setItem(
            "usuario",
            JSON.stringify({
              ...usuarioActual,
              username: formData.username,
              email: formData.email,
              rol: formData.rol,
            }),
          );
        }
      } else {
        setMensaje(data.message || "Error al actualizar usuario");
      }
    } catch (error) {
      setMensaje("Error de conexión");
    }
  };

  const eliminarCuenta = async () => {
    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar tu cuenta? Esta acción es irreversible.",
    );

    if (!confirmar) return;

    try {
      const response = await fetch(`${API_URL}/api/usuarios/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        localStorage.removeItem("usuario");
        navigate("/");
        window.location.reload();
      } else {
        alert(data.message || "Error al eliminar la cuenta");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="editar-usuario-container">
      <h1>Editar Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div className="editar-form">
          <label>Nombre de usuario</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="editar-form">
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="editar-form">
          <label>Nueva contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Dejar en blanco para mantener la actual"
          />
        </div>

        {usuarioActual?.rol === "admin" && (
          <div className="editar-form">
            <label>Rol</label>
            <select name="rol" value={formData.rol} onChange={handleChange}>
              <option value="usuario">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
        )}
        {mensaje && <p className="editar-msg">{mensaje}</p>}
        <button type="submit" className="btn-guardar">
          Guardar cambios
        </button>
        {usuarioActual?.id?.toString() === id && (
          <button
            type="button"
            onClick={eliminarCuenta}
            className="btn-delete-account-form"
          >
            Borrar Cuenta
          </button>
        )}
      </form>
    </div>
  );
};

export default EditarUsuario;
