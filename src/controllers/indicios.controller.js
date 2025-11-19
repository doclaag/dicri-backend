import { getConnection } from '../database/connection.js';
import sql from 'mssql';

export const getIndicios = async (req, res) => {
  try {
    const { idExpediente } = req.query;
    
    const pool = await getConnection();
    const result = await pool.request()
      .input('IdIndicio', sql.Int, null)
      .input('IdExpediente', sql.Int, idExpediente || null)
      .execute('SP_ConsultarIndicios');
    
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getIndicio = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input('IdIndicio', sql.Int, id)
      .input('IdExpediente', sql.Int, null)
      .execute('SP_ConsultarIndicios');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Indicio no encontrado' });
    }
    
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getIndiciosByExpediente = async (req, res) => {
  try {
    const { idExpediente } = req.params;
    
    const pool = await getConnection();
    const result = await pool.request()
      .input('IdIndicio', sql.Int, null)
      .input('IdExpediente', sql.Int, idExpediente)
      .execute('SP_ConsultarIndicios');
    
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createIndicio = async (req, res) => {
  try {
    const { 
      IdExpediente, 
      Description, 
      Color, 
      Size, 
      Weight, 
      Location, 
      IdTecnicoRegistro 
    } = req.body;
    
    if (!IdExpediente || !Description || !Location || !IdTecnicoRegistro) {
      return res.status(400).json({ 
        message: 'IdExpediente, Description, Location e IdTecnicoRegistro son requeridos' 
      });
    }
    
    const pool = await getConnection();
    const result = await pool.request()
      .input('IdExpediente', sql.Int, IdExpediente)
      .input('Description', sql.VarChar(500), Description)
      .input('Color', sql.VarChar(50), Color || null)
      .input('Size', sql.VarChar(100), Size || null)
      .input('Weight', sql.VarChar(50), Weight || null)
      .input('Location', sql.VarChar(200), Location)
      .input('IdTecnicoRegistro', sql.Int, IdTecnicoRegistro)
      .execute('SP_InsertarIndicio');
    
    res.status(201).json({ 
      message: 'Indicio creado exitosamente',
      IdIndicio: result.recordset[0].IdIndicio
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateIndicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { Description, Color, Size, Weight, Location } = req.body;
    
    const pool = await getConnection();
    await pool.request()
      .input('IdIndicio', sql.Int, id)
      .input('Description', sql.VarChar(500), Description)
      .input('Color', sql.VarChar(50), Color || null)
      .input('Size', sql.VarChar(100), Size || null)
      .input('Weight', sql.VarChar(50), Weight || null)
      .input('Location', sql.VarChar(200), Location)
      .execute('SP_ActualizarIndicio');
    
    res.json({ message: 'Indicio actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteIndicio = async (req, res) => {
  try {
    const { id } = req.params;
    
    const pool = await getConnection();
    await pool.request()
      .input('IdIndicio', sql.Int, id)
      .execute('SP_EliminarIndicio');
    
    res.json({ message: 'Indicio eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};