import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "mutantbusters_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
    return;
  }
  console.log("Conectado con éxito a la base de datos Mutant Busters");
});

app.get("/api/personajes", (req, res) => {
  const bando = req.query.bando;
  let sql = "SELECT * FROM personajes";
  let params = [];

  if (bando) {
    sql += " WHERE id_faccion = ?";
    params.push(bando);
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.get("/api/personajes/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM personajes WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

app.post("/api/registro", (req, res) => {
  const { username, email, password } = req.body;
  const sql =
    "INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)";

  db.query(sql, [username, email, password], (err, result) => {
    if (err)
      return res.status(500).json({ error: "Error al registrar usuario" });
    res.json({ message: "Usuario registrado con éxito", id: result.insertId });
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const sql =
    "SELECT id, username, rol FROM usuarios WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length > 0) {
      res.json({ success: true, usuario: result[0] });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Credenciales incorrectas" });
    }
  });
});

app.get("/api/resenas/:tipo/:id", (req, res) => {
  const { tipo, id } = req.params;
  const sql = `
    SELECT v.*, u.username 
    FROM valoraciones v 
    JOIN usuarios u ON v.id_usuario = u.id 
    WHERE v.tipo_referencia = ? AND v.id_referencia = ?
    ORDER BY v.fecha DESC`;

  db.query(sql, [tipo, id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/api/resenas", (req, res) => {
  const { id_usuario, puntuacion, comentario, id_referencia, tipo_referencia } =
    req.body;
  const sql =
    "INSERT INTO valoraciones (id_usuario, puntuacion, comentario, id_referencia, tipo_referencia) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [id_usuario, puntuacion, comentario, id_referencia, tipo_referencia],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Reseña guardada", id: result.insertId });
    },
  );
});

app.delete("/api/resenas/:id", (req, res) => {
  const { id } = req.params;
  const { solicitanteRol, solicitanteId } = req.query;
  const sqlGet = "SELECT id_usuario FROM valoraciones WHERE id = ?";

  db.query(sqlGet, [id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Reseña no encontrada." });
    }

    const idUsuarioResena = results[0].id_usuario;

    if (
      solicitanteRol !== "admin" &&
      String(solicitanteId) !== String(idUsuarioResena)
    ) {
      return res.status(403).json({
        success: false,
        message: "No tienes permiso para eliminar esta reseña.",
      });
    }

    const sqlDelete = "DELETE FROM valoraciones WHERE id = ?";

    db.query(sqlDelete, [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({
        success: true,
        message: "Reseña eliminada correctamente.",
      });
    });
  });
});

app.get("/api/usuarios", (req, res) => {
  const { solicitanteRol } = req.query;

  if (solicitanteRol !== "admin") {
    return res.status(403).json({
      success: false,
      message: "No tienes permiso para ver la lista de usuarios.",
    });
  }

  const sql = "SELECT id, username, email, rol FROM usuarios";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({
      success: true,
      usuarios: results,
    });
  });
});

app.get("/api/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT id, username, email, rol FROM usuarios WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    res.json({
      success: true,
      usuario: result[0],
    });
  });
});

app.put("/api/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { username, email, password, rol, solicitanteId, solicitanteRol } =
    req.body;

  if (solicitanteRol !== "admin" && String(solicitanteId) !== String(id)) {
    return res.status(403).json({
      success: false,
      message: "No tienes permiso para modificar este usuario.",
    });
  }

  if (password && password.trim() !== "") {
    const sql =
      "UPDATE usuarios SET username = ?, email = ?, password = ?, rol = ? WHERE id = ?";

    db.query(sql, [username, email, password, rol || "usuario", id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({
        success: true,
        message: "Usuario actualizado con éxito.",
      });
    });
  } else {
    const sql =
      "UPDATE usuarios SET username = ?, email = ?, rol = ? WHERE id = ?";

    db.query(sql, [username, email, rol || "usuario", id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({
        success: true,
        message: "Usuario actualizado con éxito.",
      });
    });
  }
});

app.delete("/api/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const sqlResenas = "DELETE FROM valoraciones WHERE id_usuario = ?";

  db.query(sqlResenas, [id], (err) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error al eliminar las reseñas del usuario" });

    const sqlUsuario = "DELETE FROM usuarios WHERE id = ?";
    db.query(sqlUsuario, [id], (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "El sujeto no existe en el archivo." });
      }
      res.json({
        message: "Cuenta e historial eliminados con éxito.",
      });
    });
  });
});

app.get("/api/episodios", (req, res) => {
  db.query("SELECT * FROM episodios", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.get("/api/sets", (req, res) => {
  db.query("SELECT * FROM sets", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Servidor de la Resistencia activo en http://localhost:${PORT}`),
);
