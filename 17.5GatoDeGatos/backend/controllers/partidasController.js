import Partida from "../models/partidaModel.js";

export const registrarPartida = async (req, res) => {
  try {
    console.log("[API] POST /api/registrar-partida - body:", req.body);

    const { resultado, jugador1_simbolo, jugador2_simbolo } = req.body;
    if (!resultado || !jugador1_simbolo || !jugador2_simbolo) {
      console.warn("[API] Datos incompletos en registrarPartida:", req.body);
      return res.status(400).json({ error: 'Faltan campos requeridos: resultado, jugador1_simbolo, jugador2_simbolo' });
    }

    const permitido = ['X', 'O', 'EMPATE'];
    if (!permitido.includes(resultado)) {
      console.warn("[API] Resultado no permitido:", resultado);
      return res.status(400).json({ error: 'Valor de resultado no válido. Debe ser X, O o EMPATE' });
    }

    const nueva = await Partida.crear({ resultado, jugador1_simbolo, jugador2_simbolo });
    console.log("[API] Partida creada con id:", nueva.id);

    // responder con 201 Created
    res.status(201).json({ ok: true, partida: nueva });
  } catch (err) {
    console.error('Error en registrarPartida:', err);
    res.status(500).json({ error: 'Error al guardar la partida' });
  }
};

export const estadisticas = async (req, res) => {
  try {
    console.log("[API] GET /api/estadisticas");
    const stats = await Partida.obtenerEstadisticas();

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
