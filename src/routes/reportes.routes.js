import { Router } from 'express';
import {
  getReporteExpedientes,
  getEstadisticas,
  getReporteTecnicos,
  getReporteCoordinadores
} from '../controllers/reportes.controller.js';

const router = Router();

/**
 * @swagger
 * /reportes/expedientes:
 *   get:
 *     summary: Obtener reporte de expedientes
 *     tags: [Reportes]
 *     description: Genera un reporte de expedientes con filtros opcionales por fecha y estado
 *     parameters:
 *       - in: query
 *         name: fechaInicio
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de inicio del filtro (YYYY-MM-DD)
 *         example: "2024-01-01"
 *       - in: query
 *         name: fechaFin
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de fin del filtro (YYYY-MM-DD)
 *         example: "2024-12-31"
 *       - in: query
 *         name: estado
 *         schema:
 *           type: integer
 *         description: ID del estado para filtrar
 *         example: 1
 *     responses:
 *       200:
 *         description: Reporte generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IdExpediente:
 *                     type: integer
 *                   FileNumber:
 *                     type: string
 *                   Description:
 *                     type: string
 *                   StateName:
 *                     type: string
 *                   TecnicoRegistro:
 *                     type: string
 *                   CoordinadorRevision:
 *                     type: string
 *                   CreatedAt:
 *                     type: string
 *                     format: date-time
 *                   ReviewDate:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/reportes/expedientes', getReporteExpedientes);

/**
 * @swagger
 * /reportes/estadisticas:
 *   get:
 *     summary: Obtener estadísticas generales
 *     tags: [Reportes]
 *     description: Genera estadísticas generales del sistema con filtros opcionales por fecha
 *     parameters:
 *       - in: query
 *         name: fechaInicio
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de inicio del filtro (YYYY-MM-DD)
 *         example: "2024-01-01"
 *       - in: query
 *         name: fechaFin
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de fin del filtro (YYYY-MM-DD)
 *         example: "2024-12-31"
 *     responses:
 *       200:
 *         description: Estadísticas generadas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estadisticasPorEstado:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       StateName:
 *                         type: string
 *                         example: "Registrando"
 *                       Total:
 *                         type: integer
 *                         example: 15
 *                 totales:
 *                   type: object
 *                   properties:
 *                     TotalExpedientes:
 *                       type: integer
 *                       example: 45
 *                     TotalIndicios:
 *                       type: integer
 *                       example: 150
 *                     TotalAprobados:
 *                       type: integer
 *                       example: 30
 *                     TotalRechazados:
 *                       type: integer
 *                       example: 5
 *       500:
 *         description: Error del servidor
 */
router.get('/reportes/estadisticas', getEstadisticas);

/**
 * @swagger
 * /reportes/tecnicos:
 *   get:
 *     summary: Obtener reporte de técnicos
 *     tags: [Reportes]
 *     description: Genera un reporte con el desempeño de los técnicos
 *     responses:
 *       200:
 *         description: Reporte de técnicos generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IdUsuario:
 *                     type: integer
 *                   FullName:
 *                     type: string
 *                   TotalExpedientes:
 *                     type: integer
 *                   TotalIndicios:
 *                     type: integer
 *                   ExpedientesAprobados:
 *                     type: integer
 *                   ExpedientesRechazados:
 *                     type: integer
 *       500:
 *         description: Error del servidor
 */
router.get('/reportes/tecnicos', getReporteTecnicos);

/**
 * @swagger
 * /reportes/coordinadores:
 *   get:
 *     summary: Obtener reporte de coordinadores
 *     tags: [Reportes]
 *     description: Genera un reporte con las revisiones realizadas por coordinadores
 *     responses:
 *       200:
 *         description: Reporte de coordinadores generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IdUsuario:
 *                     type: integer
 *                   FullName:
 *                     type: string
 *                   TotalRevisiones:
 *                     type: integer
 *                   TotalAprobados:
 *                     type: integer
 *                   TotalRechazados:
 *                     type: integer
 *       500:
 *         description: Error del servidor
 */
router.get('/reportes/coordinadores', getReporteCoordinadores);

export default router;