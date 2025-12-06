// models/partidaModel.js
import db from "../config/dbconfig.js";

const Partida = {
  async crear({ resultado, jugador1_simbolo, jugador2_simbolo }) {
    const [result] = await db.query(
      "INSERT INTO partidas (resultado, jugador1_simbolo, jugador2_simbolo, creado_en) VALUES (?, ?, ?, NOW())",
      [resultado, jugador1_simbolo, jugador2_simbolo]
    );
    return { id: result.insertId, resultado, jugador1_simbolo, jugador2_simbolo };
  },

  async obtenerEstadisticas() {
    const [rowsTotales] = await db.query(
      `SELECT 
          COUNT(*) AS total,
          SUM(resultado = 'X') AS X,
          SUM(resultado = 'O') AS O,
          SUM(resultado = 'EMPATE') AS EMPATE
       FROM partidas`
    );

    const [rowsUlt] = await db.query(
      "SELECT creado_en FROM partidas ORDER BY creado_en DESC LIMIT 1"
    );

    const totales = rowsTotales && rowsTotales[0] ? rowsTotales[0] : { total:0, X:0, O:0, EMPATE:0 };
    const ultima = rowsUlt && rowsUlt[0] ? rowsUlt[0].creado_en : null;

    return {
      total: Number(totales.total || 0),
      X: Number(totales.X || 0),
      O: Number(totales.O || 0),
      EMPATE: Number(totales.EMPATE || 0),
      ultima: ultima || null
    };
  }
};

export default Partida;
