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

/**
 * @swagger
 * /indicios:
 *   get:
 *     summary: Obtener todos los indicios
 *     tags: [Indicios]
 *     description: Retorna una lista de todos los indicios registrados
 *     parameters:
 *       - in: query
 *         name: idExpediente
 *         schema:
 *           type: integer
 *         description: Filtrar indicios por ID de expediente
 *     responses:
 *       200:
 *         description: Lista de indicios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Indicio'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/indicios', getIndicios);

/**
 * @swagger
 * /indicios/{id}:
 *   get:
 *     summary: Obtener un indicio por ID
 *     tags: [Indicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del indicio
 *     responses:
 *       200:
 *         description: Indicio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Indicio'
 *       404:
 *         description: Indicio no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 */
router.get('/indicios/:id', getIndicio);

/**
 * @swagger
 * /expedientes/{idExpediente}/indicios:
 *   get:
 *     summary: Obtener todos los indicios de un expediente
 *     tags: [Indicios]
 *     parameters:
 *       - in: path
 *         name: idExpediente
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del expediente
 *     responses:
 *       200:
 *         description: Lista de indicios del expediente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Indicio'
 *       500:
 *         description: Error del servidor
 */
router.get('/expedientes/:idExpediente/indicios', getIndiciosByExpediente);

/**
 * @swagger
 * /indicios:
 *   post:
 *     summary: Crear un nuevo indicio
 *     tags: [Indicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - IdExpediente
 *               - Description
 *               - Location
 *               - IdTecnicoRegistro
 *             properties:
 *               IdExpediente:
 *                 type: integer
 *                 example: 1
 *               Description:
 *                 type: string
 *                 example: "Arma de fuego calibre 9mm"
 *               Color:
 *                 type: string
 *                 example: "Negro"
 *               Size:
 *                 type: string
 *                 example: "20cm x 15cm"
 *               Weight:
 *                 type: string
 *                 example: "800g"
 *               Location:
 *                 type: string
 *                 example: "Hallado en el piso del dormitorio principal"
 *               IdTecnicoRegistro:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Indicio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Indicio creado exitosamente"
 *                 IdIndicio:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 */
router.post('/indicios', createIndicio);

/**
 * @swagger
 * /indicios/{id}:
 *   put:
 *     summary: Actualizar un indicio
 *     tags: [Indicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del indicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Description:
 *                 type: string
 *                 example: "Arma de fuego calibre 9mm con número de serie XYZ123"
 *               Color:
 *                 type: string
 *                 example: "Negro mate"
 *               Size:
 *                 type: string
 *                 example: "21cm x 16cm"
 *               Weight:
 *                 type: string
 *                 example: "850g"
 *               Location:
 *                 type: string
 *                 example: "Hallado debajo de la cama del dormitorio principal"
 *     responses:
 *       200:
 *         description: Indicio actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Indicio actualizado exitosamente"
 *       500:
 *         description: Error del servidor
 */
router.put('/indicios/:id', updateIndicio);

/**
 * @swagger
 * /indicios/{id}:
 *   delete:
 *     summary: Eliminar un indicio
 *     tags: [Indicios]
 *     description: Realiza una eliminación física del indicio
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del indicio
 *     responses:
 *       200:
 *         description: Indicio eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Indicio eliminado exitosamente"
 *       500:
 *         description: Error del servidor
 */
router.delete('/indicios/:id', deleteIndicio);

export default router;