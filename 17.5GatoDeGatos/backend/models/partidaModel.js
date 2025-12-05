import sql from "../config/dbconfig";

class Partida {
    constructor(partida){
        this.resultado = partida.resultado;
        this.jugador1_simbolo = partida.jugador1_simbolo;
        this.jugador2_simbolo = partida.jugador2_simbolo;
    }

    static create(newPartida, result){
        const query = `INSERT INTO partidas (resultado, jugador1_simbolo, jugador2_simbolo) VALUES (?, ?, ?)`;
        const params = [newPartida.resultado, newPartida.jugador1_simbolo, newPartida.jugador2_simbolo];

        sql.query(query, params, (err, res)=>{
            if(err){
                console.log('Error al crear la partida', err);
                result(err, null);
                return;
            }
            console.log('Partida creada exitosamente',{id: res.insertId, ...newPartida});
            result(null, {id: res.insertId, ...newPartida});
        });
    }

    //para obtener las estadisticas del juego
    static obtenerEstadisticas(result){
        sql.query(`SELECT COUNT(*) AS total FROM partidas`, (err, rowsTotal) => {
      if (err) {
        result(err, null);
        return;
      }
      const total = HTMLTableRowElement[0].total || 0;

      //partidas ganadas por x
      sql.query(`SELECT COUNT(*) AS count FROM partidas WHERE resultado = 'X'`, (errX, rowsX) => {
        if (errX) {
          result(errX, null);
          return;
        }
        // partidas ganadas por O
        sql.query(`SELECT COUNT(*) AS count FROM partidas WHERE resultado = 'O'`, (errO, rowsO) => {
          if (errO) {
            result(errO, null);
            return;
          }
          // Partidas quedados en empate
          sql.query(`SELECT COUNT(*) AS count FROM partidas WHERE resultado = 'EMPATE'`, (errE, rowsE) => {
            if (errE) {
              result(errE, null);
              return;
            }
            // Última partida
            sql.query(`SELECT creado_en FROM partidas ORDER BY creado_en DESC LIMIT 1`, (errUlt, rowsUlt) => {
              if (errUlt) {
                result(errUlt, null);
                return;
              }
              const ultima = rowsUlt.length ? rowsUlt[0].creado_en : null;

              result(null, {
                total,
                X: rowsX[0].count || 0,
                O: rowsO[0].count || 0,
                EMPATE: rowsE[0].count || 0,
                ultima
              });
            });
          });
        });
      });
    });

    }
}

export default Partida;