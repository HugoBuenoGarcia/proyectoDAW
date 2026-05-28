import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Home from "./pages/Home";
import Facciones from "./pages/Facciones";
import DetallePersonaje from "./pages/DetallePersonaje";
import Episodios from "./pages/Episodios";
import Sets from "./pages/Sets";
import EditarUsuario from "./pages/EditarUsuario";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/facciones" element={<Facciones />} />
        <Route path="/personajes/:id" element={<DetallePersonaje />} />
        <Route path="/episodios" element={<Episodios />} />
        <Route path="/sets" element={<Sets />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
