import { getConnection } from '../database/connection.js';
import sql from 'mssql';

export const getUsuarios = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('IdUsuario', sql.Int, null)
      .execute('SP_ConsultarUsuarios');
    
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input('IdUsuario', sql.Int, id)
      .execute('SP_ConsultarUsuarios');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const { Username, Password, FullName, IdRol } = req.body;
    
    if (!Username || !Password || !FullName || !IdRol) {
      return res.status(400).json({ 
        message: 'Username, Password, FullName e IdRol son requeridos' 
      });
    }
    
    const pool = await getConnection();
    const result = await pool.request()
      .input('Username', sql.VarChar(50), Username)
      .input('Password', sql.VarChar(255), Password)
      .input('FullName', sql.VarChar(100), FullName)
      .input('IdRol', sql.Int, IdRol)
      .execute('SP_InsertarUsuario');
    
    res.status(201).json({ 
      message: 'Usuario creado exitosamente',
      IdUsuario: result.recordset[0].IdUsuario
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { Username, FullName, IdRol, IsActive } = req.body;
    
    const pool = await getConnection();
    await pool.request()
      .input('IdUsuario', sql.Int, id)
      .input('Username', sql.VarChar(50), Username)
      .input('FullName', sql.VarChar(100), FullName)
      .input('IdRol', sql.Int, IdRol)
      .input('IsActive', sql.Bit, IsActive)
      .execute('SP_ActualizarUsuario');
    
    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    
    const pool = await getConnection();
    await pool.request()
      .input('IdUsuario', sql.Int, id)
      .execute('SP_EliminarUsuario');
    
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { Username, Password } = req.body;
    
    if (!Username || !Password) {
      return res.status(400).json({ 
        message: 'Username y Password son requeridos' 
      });
    }
    
    const pool = await getConnection();
    const result = await pool.request()
      .input('Username', sql.VarChar(50), Username)
      .input('Password', sql.VarChar(255), Password)
      .execute('SP_AutenticarUsuario');
    
    if (result.recordset.length === 0) {
      return res.status(401).json({ 
        message: 'Credenciales inválidas' 
      });
    }
    
    const user = result.recordset[0];
    
    res.json({ 
      message: 'Login exitoso',
      user: user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};