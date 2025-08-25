import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './index';

dotenv.config();

const port = process.env.PORT || 3000;

const allowedOrigins = [
  'http://localhost:5173',        // Dev local
  'http://194.163.181.133:5173',  // Produção
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
      { url: `http://194.163.181.133:${port}` },
    ],
  },
  apis: ['./src/routes/*.ts'],
};
const swaggerSpec = swaggerJsdoc(opcoesSwagger);

app.use(cors({
  origin: function (origin, callback) {
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

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  }
});

io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  socket.on('novoComentario', (data) => {
    io.emit('novoComentario', data); 
  });

  socket.on('novaPostagem', (data) => {
    io.emit('novaPostagem', data);
  });

  socket.on("connect", () => console.log("Conectado", socket.id));
  socket.on("disconnect", () => console.log("Desconectado"));
  socket.on("novaPostagem", data => console.log("Novo post:", data));
  socket.on("novoComentario", data => console.log("Novo comentário:", data));
});

httpServer.listen(port, () => {
  console.log(`Servidor rodando em http://194.163.181.133:${port}`);
  console.log(`Swagger no link: http://194.163.181.133:${port}/api-docs`);
});



export default io;
