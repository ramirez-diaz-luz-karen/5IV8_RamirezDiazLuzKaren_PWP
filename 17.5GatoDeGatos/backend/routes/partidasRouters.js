import { Router } from "express";
import { registrarPartida, estadisticas } from "../controllers/partidasController";

const router = Router();

router.post('/registrar-partida', registrarPartida);
router.get('/estadisticas', estadisticas);

export default router;

