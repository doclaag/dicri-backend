import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import rolesRoutes from './routes/roles.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', rolesRoutes);
app.use('/api', usuariosRoutes);

app.get('/api', (req, res) => {
  res.json({ 
    message: 'API DICRI - Sistema de Gestión de Evidencias',
    version: '1.0.0'
  });
});

export default app;