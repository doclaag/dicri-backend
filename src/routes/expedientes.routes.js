import { Router } from 'express';
import {
  getExpedientes,
  getExpediente,
  createExpediente,
  updateExpediente,
  deleteExpediente,
  enviarRevision,
  aprobarExpediente,
  rechazarExpediente
} from '../controllers/expedientes.controller.js';

const router = Router();

router.get('/expedientes', getExpedientes);
router.get('/expedientes/:id', getExpediente);
router.post('/expedientes', createExpediente);
router.put('/expedientes/:id', updateExpediente);
router.delete('/expedientes/:id', deleteExpediente);

router.post('/expedientes/:id/enviar-revision', enviarRevision);
router.post('/expedientes/:id/aprobar', aprobarExpediente);
router.post('/expedientes/:id/rechazar', rechazarExpediente);

export default router;