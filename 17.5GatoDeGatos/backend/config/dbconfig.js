import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "kasanajisa1.",
  database: "gato_de_gatos"
});

// Verificación de conexión
pool.getConnection((err, conn) => {
  if (err) {
    console.error("Error al conectar a MySQL:", err);
    return;
  }
  console.log("Conexión exitosa a MySQL");
  conn.release();
});

export default pool.promise();  
