// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'API de Petsoft',
      version: '1.0.0',
      description: 'Web service to petsoft app',
    },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  },
  apis: ["./routes/*.mjs"], // Ruta al archivo que contiene tus rutas
  
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
