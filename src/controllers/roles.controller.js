import { getConnection } from '../database/connection.js';
import sql from 'mssql';

export const getRoles = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('IdRol', sql.Int, null)
      .execute('SP_ConsultarRoles');
    
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRol = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input('IdRol', sql.Int, id)
      .execute('SP_ConsultarRoles');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }
    
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRol = async (req, res) => {
  try {
    const { RoleName, Description } = req.body;
    
    if (!RoleName) {
      return res.status(400).json({ message: 'El nombre del rol es requerido' });
    }
    
    const pool = await getConnection();
    const result = await pool.request()
      .input('RoleName', sql.VarChar(50), RoleName)
      .input('Description', sql.VarChar(200), Description)
      .execute('SP_InsertarRol');
    
    res.status(201).json({ 
      message: 'Rol creado exitosamente',
      IdRol: result.recordset[0].IdRol
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { RoleName, Description, IsActive } = req.body;
    
    const pool = await getConnection();
    await pool.request()
      .input('IdRol', sql.Int, id)
      .input('RoleName', sql.VarChar(50), RoleName)
      .input('Description', sql.VarChar(200), Description)
      .input('IsActive', sql.Bit, IsActive)
      .execute('SP_ActualizarRol');
    
    res.json({ message: 'Rol actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRol = async (req, res) => {
  try {
    const { id } = req.params;
    
    const pool = await getConnection();
    await pool.request()
      .input('IdRol', sql.Int, id)
      .execute('SP_EliminarRol');
    
    res.json({ message: 'Rol eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};