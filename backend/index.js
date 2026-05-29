import express from "express";
import pg from "pg";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la conexión utilizando la URI de Supabase
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos de Supabase:", err);
    return;
  }
  console.log(
    "Conectado con éxito a la base de datos Mutant Busters en Supabase",
  );
});

app.get("/api/personajes", (req, res) => {
  const bando = req.query.bando;
  let sql = "SELECT * FROM personajes";
  let params = [];

  if (bando) {
    sql += " WHERE id_faccion = $1";
    params.push(bando);
  }

  pool.query(sql, params, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results.rows);
  });
});

app.get("/api/personajes/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM personajes WHERE id = $1";

  pool.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result.rows[0]);
  });
});

app.post("/api/registro", (req, res) => {
  const { username, email, password, rol } = req.body;
  const checkSql = "SELECT * FROM usuarios WHERE email = $1";
  pool.query(checkSql, [email], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.rows.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    const rolFinal = rol ? String(rol).trim().toLowerCase() : "usuario";
    const sql =
      "INSERT INTO usuarios (username, email, password, rol) VALUES ($1, $2, $3, $4)";
    pool.query(sql, [username, email, password, rolFinal], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({
        success: true,
        message: "Usuario registrado con éxito.",
      });
    });
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const sql =
    "SELECT id, username, email, rol FROM usuarios WHERE email = $1 AND password = $2";

  pool.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.rows.length > 0) {
      const fila = results.rows[0];
      res.json({
        success: true,
        usuario: {
          id: fila.id,
          username: fila.username,
          email: fila.email,
          rol: String(fila.rol).trim().toLowerCase(), // Forzamos minúsculas limpias sin espacios
        },
      });
    } else {
      res.json({
        success: false,
        message: "Combinación de correo y contraseña incorrecta.",
      });
    }
  });
});

app.get("/api/resenas/:tipo/:id", (req, res) => {
  const { tipo, id } = req.params;
  const sql = `
    SELECT v.*, u.username 
    FROM valoraciones v 
    JOIN usuarios u ON v.id_usuario = u.id 
    WHERE v.tipo_referencia = $1 AND v.id_referencia = $2
    ORDER BY v.fecha DESC`;

  pool.query(sql, [tipo, id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results.rows);
  });
});

app.post("/api/resenas", (req, res) => {
  const { id_usuario, puntuacion, comentario, id_referencia, tipo_referencia } =
    req.body;
  const sql =
    "INSERT INTO valoraciones (id_usuario, puntuacion, comentario, id_referencia, tipo_referencia) VALUES ($1, $2, $3, $4, $5) RETURNING id";

  pool.query(
    sql,
    [id_usuario, puntuacion, comentario, id_referencia, tipo_referencia],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Reseña guardada", id: result.rows[0].id });
    },
  );
});

app.delete("/api/resenas/:id", (req, res) => {
  const { id } = req.params;
  const { solicitanteRol, solicitanteId } = req.query;
  const sqlGet = "SELECT id_usuario FROM valoraciones WHERE id = $1";

  pool.query(sqlGet, [id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Reseña no encontrada." });
    }

    const idUsuarioResena = results.rows[0].id_usuario;

    if (
      solicitanteRol !== "admin" &&
      String(solicitanteId) !== String(idUsuarioResena)
    ) {
      return res.status(403).json({
        success: false,
        message: "No tienes permiso para eliminar esta reseña.",
      });
    }

    const sqlDelete = "DELETE FROM valoraciones WHERE id = $1";

    pool.query(sqlDelete, [id], (err, result) => {
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

  pool.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({
      success: true,
      usuarios: results.rows,
    });
  });
});

app.get("/api/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT id, username, email, rol FROM usuarios WHERE id = $1";

  pool.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    const fila = result.rows[0];
    res.json({
      success: true,
      usuario: {
        id: fila.id,
        username: fila.username,
        email: fila.email,
        rol: String(fila.rol).trim().toLowerCase(),
      },
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
      "UPDATE usuarios SET username = $1, email = $2, password = $3, rol = $4 WHERE id = $5";

    pool.query(
      sql,
      [username, email, password, rol || "usuario", id],
      (err) => {
        if (err) return res.status(500).json(err);
        res.json({
          success: true,
          message: "Usuario actualizado con éxito.",
        });
      },
    );
  } else {
    const sql =
      "UPDATE usuarios SET username = $1, email = $2, rol = $3 WHERE id = $4";

    pool.query(sql, [username, email, rol || "usuario", id], (err) => {
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
  const sqlResenas = "DELETE FROM valoraciones WHERE id_usuario = $1";

  pool.query(sqlResenas, [id], (err) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error al eliminar las reseñas del usuario" });

    const sqlUsuario = "DELETE FROM usuarios WHERE id = $1";
    pool.query(sqlUsuario, [id], (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.rowCount === 0) {
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
  pool.query("SELECT * FROM episodios ORDER BY id ASC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results.rows);
  });
});

app.get("/api/sets", (req, res) => {
  pool.query("SELECT * FROM sets ORDER BY id ASC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results.rows);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Servidor de la Resistencia activo en el puerto ${PORT}`),
);
