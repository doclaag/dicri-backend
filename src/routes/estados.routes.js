import { Router } from 'express';
import {
  getEstados,
  getEstado,
  createEstado,
  updateEstado,
  deleteEstado
} from '../controllers/estados.controller.js';

const router = Router();

router.get('/estados', getEstados);
router.get('/estados/:id', getEstado);
router.post('/estados', createEstado);
router.put('/estados/:id', updateEstado);
router.delete('/estados/:id', deleteEstado);

export default router;