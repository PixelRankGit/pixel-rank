import express from 'express';
import dotenv from 'dotenv';

import usersRouter from './routes/users.routes';
import loginRouter from './routes/login.routes';
import postRouter from './routes/post.routes';
import gamesRouter from './routes/games.routes';
import cookieParser from 'cookie-parser';
import genericRouter from './routes/generic.routes';

import cors from 'cors';

const allowedOrigins = [
  'http://localhost:5173',           // dev local
  'http://194.163.181.133:5173',    // IP público         // produção
];

const prisma = require('./prisma/prisma').default;
const pegarJogosSteam = require('./scripts/pegarJogosSteam');

export async function popularBanco(): Promise<void> {
    try {
        const contagemJogos = await prisma.jogo.count();
        console.log(`Jogos no banco: ${contagemJogos}`);

        if (contagemJogos <= 100) {
            console.log('Limpando tabela de jogos...');
            await prisma.jogo.deleteMany({});
            console.log('Tabela limpa. Importando jogos da Steam...');
            await pegarJogosSteam();
            console.log('Importação finalizada!');
        } else {
            console.log('Banco já populado. Nenhuma ação necessária.');
        }
    } catch (err) {
        console.error('Erro ao popular banco:', err);
    }
}

dotenv.config();

const app = express();

popularBanco();

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

app.use(express.json());
app.use(cookieParser());

app.use('/api', gamesRouter);
app.use('/api', usersRouter);
app.use('/api', loginRouter);
app.use('/api', postRouter);
app.use('/api', genericRouter);

export default app;
