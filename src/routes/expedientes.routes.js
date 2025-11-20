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

/**
 * @swagger
 * /expedientes:
 *   get:
 *     summary: Obtener todos los expedientes
 *     tags: [Expedientes]
 *     description: Retorna una lista de todos los expedientes registrados en el sistema
 *     responses:
 *       200:
 *         description: Lista de expedientes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expediente'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/expedientes', getExpedientes);

/**
 * @swagger
 * /expedientes/{id}:
 *   get:
 *     summary: Obtener un expediente por ID
 *     tags: [Expedientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del expediente
 *     responses:
 *       200:
 *         description: Expediente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expediente'
 *       404:
 *         description: Expediente no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/expedientes/:id', getExpediente);

/**
 * @swagger
 * /expedientes:
 *   post:
 *     summary: Crear un nuevo expediente
 *     tags: [Expedientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - FileNumber
 *               - Description
 *               - IdTecnicoRegistro
 *               - IdEstado
 *             properties:
 *               FileNumber:
 *                 type: string
 *                 example: "EXP-2024-001"
 *               Description:
 *                 type: string
 *                 example: "Expediente de homicidio en zona 1"
 *               IdTecnicoRegistro:
 *                 type: integer
 *                 example: 1
 *               IdEstado:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Expediente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 IdExpediente:
 *                   type: integer
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/expedientes', createExpediente);

/**
 * @swagger
 * /expedientes/{id}:
 *   put:
 *     summary: Actualizar un expediente
 *     tags: [Expedientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FileNumber:
 *                 type: string
 *               Description:
 *                 type: string
 *               IdEstado:
 *                 type: integer
 *               ObservacionesExpediente:
 *                 type: string
 *               IdCoordinadorRevision:
 *                 type: integer
 *               ReviewDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Expediente actualizado exitosamente
 *       500:
 *         description: Error del servidor
 */
router.put('/expedientes/:id', updateExpediente);

/**
 * @swagger
 * /expedientes/{id}:
 *   delete:
 *     summary: Eliminar un expediente
 *     tags: [Expedientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Expediente eliminado exitosamente
 *       500:
 *         description: Error del servidor
 */
router.delete('/expedientes/:id', deleteExpediente);

/**
 * @swagger
 * /expedientes/{id}/enviar-revision:
 *   post:
 *     summary: Enviar expediente a revisión
 *     tags: [Expedientes]
 *     description: Cambia el estado del expediente a "EnRevision"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Expediente enviado a revisión exitosamente
 *       404:
 *         description: Expediente no encontrado
 *       500:
 *         description: Error del servidor
 */
router.post('/expedientes/:id/enviar-revision', enviarRevision);

/**
 * @swagger
 * /expedientes/{id}/aprobar:
 *   post:
 *     summary: Aprobar un expediente
 *     tags: [Expedientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - IdCoordinadorRevision
 *             properties:
 *               IdCoordinadorRevision:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Expediente aprobado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Expediente no encontrado
 *       500:
 *         description: Error del servidor
 */
router.post('/expedientes/:id/aprobar', aprobarExpediente);

/**
 * @swagger
 * /expedientes/{id}/rechazar:
 *   post:
 *     summary: Rechazar un expediente
 *     tags: [Expedientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - IdCoordinadorRevision
 *               - ObservacionesExpediente
 *             properties:
 *               IdCoordinadorRevision:
 *                 type: integer
 *                 example: 2
 *               ObservacionesExpediente:
 *                 type: string
 *                 example: "Falta información sobre la ubicación exacta de los indicios"
 *     responses:
 *       200:
 *         description: Expediente rechazado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Expediente no encontrado
 *       500:
 *         description: Error del servidor
 */
router.post('/expedientes/:id/rechazar', rechazarExpediente);

export default router;