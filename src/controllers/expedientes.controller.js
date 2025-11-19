import { getConnection } from '../database/connection.js';
import sql from 'mssql';

export const getExpedientes = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('IdExpediente', sql.Int, null)
      .execute('SP_ConsultarExpedientes');
    
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpediente = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input('IdExpediente', sql.Int, id)
      .execute('SP_ConsultarExpedientes');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Expediente no encontrado' });
    }
    
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createExpediente = async (req, res) => {
  try {
    const { FileNumber, Description, IdTecnicoRegistro, IdEstado } = req.body;
    
    if (!FileNumber || !Description || !IdTecnicoRegistro || !IdEstado) {
      return res.status(400).json({ 
        message: 'FileNumber, Description, IdTecnicoRegistro e IdEstado son requeridos' 
      });
    }
    
    const pool = await getConnection();
    const result = await pool.request()
      .input('FileNumber', sql.VarChar(50), FileNumber)
      .input('Description', sql.VarChar(500), Description)
      .input('IdTecnicoRegistro', sql.Int, IdTecnicoRegistro)
      .input('IdEstado', sql.Int, IdEstado)
      .execute('SP_InsertarExpediente');
    
    res.status(201).json({ 
      message: 'Expediente creado exitosamente',
      IdExpediente: result.recordset[0].IdExpediente
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateExpediente = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      FileNumber, 
      Description, 
      IdEstado, 
      ObservacionesExpediente,
      IdCoordinadorRevision,
      ReviewDate 
    } = req.body;
    
    const pool = await getConnection();
    await pool.request()
      .input('IdExpediente', sql.Int, id)
      .input('FileNumber', sql.VarChar(50), FileNumber)
      .input('Description', sql.VarChar(500), Description)
      .input('IdEstado', sql.Int, IdEstado)
      .input('ObservacionesExpediente', sql.VarChar(500), ObservacionesExpediente || null)
      .input('IdCoordinadorRevision', sql.Int, IdCoordinadorRevision || null)
      .input('ReviewDate', sql.DateTime, ReviewDate || null)
      .execute('SP_ActualizarExpediente');
    
    res.json({ message: 'Expediente actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteExpediente = async (req, res) => {
  try {
    const { id } = req.params;
    
    const pool = await getConnection();
    await pool.request()
      .input('IdExpediente', sql.Int, id)
      .execute('SP_EliminarExpediente');
    
    res.json({ message: 'Expediente eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const enviarRevision = async (req, res) => {
  try {
    const { id } = req.params;
    
    const pool = await getConnection();
    
    const expedienteResult = await pool.request()
      .input('IdExpediente', sql.Int, id)
      .execute('SP_ConsultarExpedientes');
    
    if (expedienteResult.recordset.length === 0) {
      return res.status(404).json({ message: 'Expediente no encontrado' });
    }
    
    const expediente = expedienteResult.recordset[0];
    
    const estadoResult = await pool.request()
      .input('IdEstado', sql.Int, null)
      .execute('SP_ConsultarEstadosExpediente');
    
    const estadoEnRevision = estadoResult.recordset.find(
      e => e.StateName === 'EnRevision'
    );
    
    if (!estadoEnRevision) {
      return res.status(500).json({ 
        message: 'Estado EnRevision no encontrado en el sistema' 
      });
    }
    
    await pool.request()
      .input('IdExpediente', sql.Int, id)
      .input('FileNumber', sql.VarChar(50), expediente.FileNumber)
      .input('Description', sql.VarChar(500), expediente.Description)
      .input('IdEstado', sql.Int, estadoEnRevision.IdEstado)
      .input('ObservacionesExpediente', sql.VarChar(500), expediente.ObservacionesExpediente)
      .input('IdCoordinadorRevision', sql.Int, expediente.IdCoordinadorRevision)
      .input('ReviewDate', sql.DateTime, expediente.ReviewDate)
      .execute('SP_ActualizarExpediente');
    
    res.json({ message: 'Expediente enviado a revisión exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const aprobarExpediente = async (req, res) => {
  try {
    const { id } = req.params;
    const { IdCoordinadorRevision } = req.body;
    
    if (!IdCoordinadorRevision) {
      return res.status(400).json({ 
        message: 'IdCoordinadorRevision es requerido' 
      });
    }
    
    const pool = await getConnection();
    
    const expedienteResult = await pool.request()
      .input('IdExpediente', sql.Int, id)
      .execute('SP_ConsultarExpedientes');
    
    if (expedienteResult.recordset.length === 0) {
      return res.status(404).json({ message: 'Expediente no encontrado' });
    }
    
    const expediente = expedienteResult.recordset[0];
    
    const estadoResult = await pool.request()
      .input('IdEstado', sql.Int, null)
      .execute('SP_ConsultarEstadosExpediente');
    
    const estadoAprobado = estadoResult.recordset.find(
      e => e.StateName === 'Aprobado'
    );
    
    if (!estadoAprobado) {
      return res.status(500).json({ 
        message: 'Estado Aprobado no encontrado en el sistema' 
      });
    }
    
    await pool.request()
      .input('IdExpediente', sql.Int, id)
      .input('FileNumber', sql.VarChar(50), expediente.FileNumber)
      .input('Description', sql.VarChar(500), expediente.Description)
      .input('IdEstado', sql.Int, estadoAprobado.IdEstado)
      .input('ObservacionesExpediente', sql.VarChar(500), expediente.ObservacionesExpediente)
      .input('IdCoordinadorRevision', sql.Int, IdCoordinadorRevision)
      .input('ReviewDate', sql.DateTime, new Date())
      .execute('SP_ActualizarExpediente');
    
    res.json({ message: 'Expediente aprobado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rechazarExpediente = async (req, res) => {
  try {
    const { id } = req.params;
    const { IdCoordinadorRevision, ObservacionesExpediente } = req.body;
    
    if (!IdCoordinadorRevision || !ObservacionesExpediente) {
      return res.status(400).json({ 
        message: 'IdCoordinadorRevision y ObservacionesExpediente son requeridos' 
      });
    }
    
    const pool = await getConnection();
    
    const expedienteResult = await pool.request()
      .input('IdExpediente', sql.Int, id)
      .execute('SP_ConsultarExpedientes');
    
    if (expedienteResult.recordset.length === 0) {
      return res.status(404).json({ message: 'Expediente no encontrado' });
    }
    
    const expediente = expedienteResult.recordset[0];
    
    const estadoResult = await pool.request()
      .input('IdEstado', sql.Int, null)
      .execute('SP_ConsultarEstadosExpediente');
    
    const estadoRechazado = estadoResult.recordset.find(
      e => e.StateName === 'Rechazado'
    );
    
    if (!estadoRechazado) {
      return res.status(500).json({ 
        message: 'Estado Rechazado no encontrado en el sistema' 
      });
    }
    
    await pool.request()
      .input('IdExpediente', sql.Int, id)
      .input('FileNumber', sql.VarChar(50), expediente.FileNumber)
      .input('Description', sql.VarChar(500), expediente.Description)
      .input('IdEstado', sql.Int, estadoRechazado.IdEstado)
      .input('ObservacionesExpediente', sql.VarChar(500), ObservacionesExpediente)
      .input('IdCoordinadorRevision', sql.Int, IdCoordinadorRevision)
      .input('ReviewDate', sql.DateTime, new Date())
      .execute('SP_ActualizarExpediente');
    
    res.json({ message: 'Expediente rechazado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};