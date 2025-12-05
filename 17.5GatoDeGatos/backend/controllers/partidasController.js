import Partida from "../models/partidaModel";

//se creara el POST para registrar la partida
export const registrarPartida = async (req, res) =>{
    try {
    const { resultado, jugador1_simbolo, jugador2_simbolo } = req.body;
    if (!resultado || !jugador1_simbolo || !jugador2_simbolo) {
      return res.status(400).json({ error: 'Faltan campos requeridos: resultado, jugador1_simbolo, jugador2_simbolo' });
    }

    const permitido = ['X', 'O', 'EMPATE'];
    if (!permitido.includes(resultado)) {
      return res.status(400).json({ error: 'Valor de resultado no válido. Debe ser X, O o EMPATE' });
    }

    const nueva = await Partida.crear({ resultado, jugador1_simbolo, jugador2_simbolo });
    res.json({ ok: true, partida: nueva });
  } catch (err) {
    console.error('Error en registrarPartida:', err);
    res.status(500).json({ error: 'Error al guardar la partida' });
  }
};

//GET para las estadisticas
export const estadisticas = async (req, res) => {
  try {
    const stats = await Partida.obtenerEstadisticas();

    //se enviara la fecha 
    res.json({
      total: stats.total,
      X: stats.X,
      O: stats.O,
      EMPATE: stats.EMPATE,
      ultima: stats.ultima ? new Date(stats.ultima).toLocaleString('es-MX') : null
    });
  } catch (err) {
    console.error('Error en estadisticas:', err);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
};