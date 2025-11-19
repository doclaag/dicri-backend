import { getConnection } from '../database/connection.js';
import sql from 'mssql';

export const getReporteExpedientes = async (req, res) => {
  try {
    const { fechaInicio, fechaFin, estado } = req.query;
    
    const pool = await getConnection();
    const result = await pool.request()
      .input('FechaInicio', sql.DateTime, fechaInicio ? new Date(fechaInicio) : null)
      .input('FechaFin', sql.DateTime, fechaFin ? new Date(fechaFin) : null)
      .input('IdEstado', sql.Int, estado || null)
      .execute('SP_ReporteExpedientes');
    
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEstadisticas = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;
    
    const pool = await getConnection();
    const result = await pool.request()
      .input('FechaInicio', sql.DateTime, fechaInicio ? new Date(fechaInicio) : null)
      .input('FechaFin', sql.DateTime, fechaFin ? new Date(fechaFin) : null)
      .execute('SP_EstadisticasGenerales');
    
    res.json({
      estadisticasPorEstado: result.recordsets[0],
      totales: result.recordsets[1][0]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReporteTecnicos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .execute('SP_ReporteTecnicos');
    
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReporteCoordinadores = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .execute('SP_ReporteCoordinadores');
    
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};