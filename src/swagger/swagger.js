import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API DICRI - Sistema de Gestión de Evidencias',
      version: '1.0.0',
      description: 'API RESTful para la gestión de evidencias de la Dirección de Investigación Criminalística (DICRI). Desarrollado como prueba técnica utilizando Node.js, Express y SQL Server.',
      contact: {
        name: 'Luis Alonzo',
        url: 'https://www.linkedin.com/in/doclaag'
      }
    },
    servers: [
      {
        url: 'https://dicri-backend.onrender.com/api',
        description: 'Servidor de producción (Render)'
      },
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      schemas: {
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de error'
            }
          }
        },
        Rol: {
          type: 'object',
          properties: {
            IdRol: { type: 'integer' },
            RoleName: { type: 'string' },
            Description: { type: 'string' },
            IsActive: { type: 'boolean' },
            CreatedAt: { type: 'string', format: 'date-time' },
            UpdatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Usuario: {
          type: 'object',
          properties: {
            IdUsuario: { type: 'integer' },
            Username: { type: 'string' },
            FullName: { type: 'string' },
            IdRol: { type: 'integer' },
            RoleName: { type: 'string' },
            IsActive: { type: 'boolean' },
            CreatedAt: { type: 'string', format: 'date-time' },
            UpdatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Estado: {
          type: 'object',
          properties: {
            IdEstado: { type: 'integer' },
            StateName: { type: 'string' },
            Description: { type: 'string' },
            IsActive: { type: 'boolean' },
            CreatedAt: { type: 'string', format: 'date-time' },
            UpdatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Expediente: {
          type: 'object',
          properties: {
            IdExpediente: { type: 'integer' },
            FileNumber: { type: 'string' },
            Description: { type: 'string' },
            IdTecnicoRegistro: { type: 'integer' },
            TecnicoRegistro: { type: 'string' },
            IdEstado: { type: 'integer' },
            StateName: { type: 'string' },
            ObservacionesExpediente: { type: 'string', nullable: true },
            IdCoordinadorRevision: { type: 'integer', nullable: true },
            CoordinadorRevision: { type: 'string', nullable: true },
            ReviewDate: { type: 'string', format: 'date-time', nullable: true },
            CreatedAt: { type: 'string', format: 'date-time' },
            UpdatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Indicio: {
          type: 'object',
          properties: {
            IdIndicio: { type: 'integer' },
            IdExpediente: { type: 'integer' },
            Description: { type: 'string' },
            Color: { type: 'string', nullable: true },
            Size: { type: 'string', nullable: true },
            Weight: { type: 'string', nullable: true },
            Location: { type: 'string' },
            IdTecnicoRegistro: { type: 'integer' },
            TecnicoRegistro: { type: 'string' },
            CreatedAt: { type: 'string', format: 'date-time' },
            UpdatedAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };