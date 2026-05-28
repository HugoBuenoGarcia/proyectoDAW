import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src="/imagenes/logo.jpg" alt="Mutant Busters Logo" />
          </Link>
        </div>

        <div className="navbar-menu-center">
          <div className="dropdown">
            <NavLink
              to="/facciones"
              className={({ isActive }) => (isActive ? "active" : "dropbtn")}
            >
              FACCIONES
            </NavLink>

            <div className="dropdown-content">
              <Link to="/facciones?bando=1">La Résistance</Link>
              <Link to="/facciones?bando=2">Mutantes</Link>
            </div>
          </div>

          <NavLink
            to="/episodios"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            EPISODIOS
          </NavLink>

          <NavLink
            to="/sets"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            SETS
          </NavLink>
        </div>

        <div className="navbar-auth">
          {usuario ? (
            <div className="user-dropdown">
              <button
                className="user-icon-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                👤
              </button>

              {dropdownOpen && (
                <div className="user-dropdown-menu">
                  <p className="user-dropdown-name">{usuario.username}</p>
                  <hr />

                  {usuario.rol === "admin" && (
                    <>
                      <Link
                        to="/admin"
                        className="dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Panel de Administración
                      </Link>
                    </>
                  )}

                  <Link
                    to={`/editar-usuario/${usuario.id}`}
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Editar Perfil
                  </Link>

                  <button
                    onClick={cerrarSesion}
                    className="dropdown-item logout"
                  >
                    Salir
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-login-nav">
              INICIAR SESIÓN
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
