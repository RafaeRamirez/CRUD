import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import Joi from "joi";

// Iniciar la conexión a la base de datos
async function conectarDB() {
  try {
    const pool = await mysql.createPool({
      host: "localhost",
      user: "root",
      password: "123456",
      port: 3307,
      database: "mi_base_de_datos",
    });
    console.log("✅ Conexión exitosa a la base de datos");
    return pool;
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error.message);
    throw new Error("Error al conectar a la base de datos");
  }
}

const app = express();
app.use(cors());
app.use(express.json());

let pool;

// Validación de producto usando Joi
const productoSchema = Joi.object({
  descripcion: Joi.string().min(3).required(),
  precio: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
});

// Ruta de inicio
app.get("/", (req, res) => {
  res.send("Ruta INICIO");
});

// Obtener todos los productos
app.get("/api/productos", async (req, res) => {
  if (!pool) {
    return res.status(500).json({ error: "No se puede conectar a la base de datos" });
  }

  try {
    const [productos] = await pool.execute("SELECT * FROM productos");
    if (productos.length === 0) {
      return res.status(404).json({ error: "No hay productos disponibles" });
    }
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Obtener un producto por ID
app.get("/api/productos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [producto] = await pool.execute("SELECT * FROM productos WHERE id = ?", [id]);
    if (producto.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(producto[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

// Crear un producto
app.post("/api/productos", async (req, res) => {
  const { descripcion, precio, stock } = req.body;

  // Validación con Joi
  const { error } = productoSchema.validate({ descripcion, precio, stock });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO productos (descripcion, precio, stock) VALUES (?, ?, ?)",
      [descripcion, precio, stock]
    );
    res.status(201).json({
      id: result.insertId,
      descripcion,
      precio,
      stock,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear producto" });
  }
});

// Eliminar un producto
app.delete("/api/productos/:id", async (req, res) => {
  const { id } = req.params;

  // Validación del ID
  if (isNaN(id) || parseInt(id) <= 0) {
    return res.status(400).json({ error: "ID debe ser un número válido" });
  }

  try {
    const [result] = await pool.execute("DELETE FROM productos WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ mensaje: "Producto eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

// Iniciar el servidor
async function iniciarServidor() {
  try {
    pool = await conectarDB(); // Esperar a que la conexión se complete antes de iniciar el servidor
    app.listen(3000, () => {
      console.log("🚀 Servidor corriendo en http://localhost:3000");
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error.message);
    process.exit(1);
  }
}

// Manejar la terminación del proceso de manera limpia
process.on("SIGINT", () => {
  console.log("\nRecibiendo señal de terminación, cerrando el servidor...");
  if (pool) {
    pool.end().then(() => {
      console.log("✅ Conexión a la base de datos cerrada.");
      process.exit(0);
    }).catch(error => {
      console.error("❌ Error al cerrar la conexión a la base de datos", error);
      process.exit(1);
    });
  }
});

// Iniciar el servidor
iniciarServidor();
