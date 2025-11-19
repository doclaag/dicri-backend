import { getConnection } from '../database/connection.js';
import sql from 'mssql';

export const getEstados = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('IdEstado', sql.Int, null)
      .execute('SP_ConsultarEstadosExpediente');
    
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input('IdEstado', sql.Int, id)
      .execute('SP_ConsultarEstadosExpediente');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Estado no encontrado' });
    }
    
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEstado = async (req, res) => {
  try {
    const { StateName, Description } = req.body;
    
    if (!StateName) {
      return res.status(400).json({ message: 'El nombre del estado es requerido' });
    }
    
    const pool = await getConnection();
    const result = await pool.request()
      .input('StateName', sql.VarChar(50), StateName)
      .input('Description', sql.VarChar(200), Description)
      .execute('SP_InsertarEstadoExpediente');
    
    res.status(201).json({ 
      message: 'Estado creado exitosamente',
      IdEstado: result.recordset[0].IdEstado
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { StateName, Description, IsActive } = req.body;
    
    const pool = await getConnection();
    await pool.request()
      .input('IdEstado', sql.Int, id)
      .input('StateName', sql.VarChar(50), StateName)
      .input('Description', sql.VarChar(200), Description)
      .input('IsActive', sql.Bit, IsActive)
      .execute('SP_ActualizarEstadoExpediente');
    
    res.json({ message: 'Estado actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEstado = async (req, res) => {
  try {
    const { id } = req.params;
    
    const pool = await getConnection();
    await pool.request()
      .input('IdEstado', sql.Int, id)
      .execute('SP_EliminarEstadoExpediente');
    
    res.json({ message: 'Estado eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};