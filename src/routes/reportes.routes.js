import { Router } from 'express';
import {
  getReporteExpedientes,
  getEstadisticas,
  getReporteTecnicos,
  getReporteCoordinadores
} from '../controllers/reportes.controller.js';

const router = Router();

router.get('/reportes/expedientes', getReporteExpedientes);
router.get('/reportes/estadisticas', getEstadisticas);
router.get('/reportes/tecnicos', getReporteTecnicos);
router.get('/reportes/coordinadores', getReporteCoordinadores);

export default router;