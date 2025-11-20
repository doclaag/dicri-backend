import { Router } from 'express';
import {
  getEstados,
  getEstado,
  createEstado,
  updateEstado,
  deleteEstado
} from '../controllers/estados.controller.js';

const router = Router();

/**
 * @swagger
 * /estados:
 *   get:
 *     summary: Obtener todos los estados de expediente
 *     tags: [Estados]
 *     description: Retorna una lista de todos los estados disponibles para expedientes
 *     responses:
 *       200:
 *         description: Lista de estados obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estado'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/estados', getEstados);

/**
 * @swagger
 * /estados/{id}:
 *   get:
 *     summary: Obtener un estado por ID
 *     tags: [Estados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estado
 *     responses:
 *       200:
 *         description: Estado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estado'
 *       404:
 *         description: Estado no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 */
router.get('/estados/:id', getEstado);

/**
 * @swagger
 * /estados:
 *   post:
 *     summary: Crear un nuevo estado
 *     tags: [Estados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - StateName
 *             properties:
 *               StateName:
 *                 type: string
 *                 example: "En Proceso"
 *               Description:
 *                 type: string
 *                 example: "Expediente en proceso de análisis"
 *     responses:
 *       201:
 *         description: Estado creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Estado creado exitosamente"
 *                 IdEstado:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 */
router.post('/estados', createEstado);

/**
 * @swagger
 * /estados/{id}:
 *   put:
 *     summary: Actualizar un estado
 *     tags: [Estados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               StateName:
 *                 type: string
 *                 example: "Archivado"
 *               Description:
 *                 type: string
 *                 example: "Expediente archivado por resolución"
 *               IsActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Estado actualizado exitosamente"
 *       500:
 *         description: Error del servidor
 */
router.put('/estados/:id', updateEstado);

/**
 * @swagger
 * /estados/{id}:
 *   delete:
 *     summary: Eliminar (desactivar) un estado
 *     tags: [Estados]
 *     description: Realiza una eliminación lógica del estado (IsActive = 0)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estado
 *     responses:
 *       200:
 *         description: Estado eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Estado eliminado exitosamente"
 *       500:
 *         description: Error del servidor
 */
router.delete('/estados/:id', deleteEstado);

export default router;