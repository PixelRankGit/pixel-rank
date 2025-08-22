const express = require('express');
const dotenv = require('dotenv');

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const opcoesSwagger = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Pixel Rank API',
      version: '1.0.0',
      description: 'Documentação da API Pixel Rank',
    },
    servers: [
      { url: 'http://localhost:3000' }
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(opcoesSwagger);

dotenv.config();

import app from './index';

const port = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(port, () => {
  console.log(`Servidor rodando em http://194.163.181.133:${port}`);
  console.log(`Swagger no link: http://194.163.181.133:3000/api-docs`);
});
