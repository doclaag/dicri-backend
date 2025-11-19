import { Router } from 'express';
import {
  getRoles,
  getRol,
  createRol,
  updateRol,
  deleteRol
} from '../controllers/roles.controller.js';

const router = Router();

router.get('/roles', getRoles);
router.get('/roles/:id', getRol);
router.post('/roles', createRol);
router.put('/roles/:id', updateRol);
router.delete('/roles/:id', deleteRol);

export default router;