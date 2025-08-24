const express = require('express');
const dotenv = require('dotenv');

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import { Server } from 'socket.io'

const allowedOrigins = [
  'http://localhost:5173',           // dev local
  'http://194.163.181.133:5173',    // IP público         // produção
];



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
import { createServer } from 'http';

const port = process.env.PORT || 3000;

app.use(cors({
  origin: function(origin, callback) {

    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Servidor rodando em http://194.163.181.133:${port}`);
  console.log(`Swagger no link: http://194.163.181.133:3000/api-docs`);
});

const httpServer = createServer(app);

// socket.io atrelado ao mesmo servidor
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("Novo cliente conectado:", socket.id);

  // exemplo: quando receber um comentário novo
  socket.on("novoComentario", (data) => {
    io.emit("novoComentario", data);
  });
});

export default io;
