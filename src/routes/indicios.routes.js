import { Router } from 'express';
import {
  getIndicios,
  getIndicio,
  getIndiciosByExpediente,
  createIndicio,
  updateIndicio,
  deleteIndicio
} from '../controllers/indicios.controller.js';

const router = Router();

router.get('/indicios', getIndicios);
router.get('/indicios/:id', getIndicio);
router.get('/expedientes/:idExpediente/indicios', getIndiciosByExpediente);
router.post('/indicios', createIndicio);
router.put('/indicios/:id', updateIndicio);
router.delete('/indicios/:id', deleteIndicio);

export default router;