import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import rolesRoutes from './routes/roles.routes.js';
import estadosRoutes from './routes/estados.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import expedientesRoutes from './routes/expedientes.routes.js';
import indiciosRoutes from './routes/indicios.routes.js';
import reportesRoutes from './routes/reportes.routes.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', rolesRoutes);
app.use('/api', estadosRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', expedientesRoutes);
app.use('/api', indiciosRoutes);
app.use('/api', reportesRoutes);

app.get('/api', (req, res) => {
  res.json({ 
    message: 'API DICRI - Sistema de Gestión de Evidencias',
    version: '1.0.0'
  });
});

export default app;