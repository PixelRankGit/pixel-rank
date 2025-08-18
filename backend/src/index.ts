const express = require('express');
const dotenv = require('dotenv');
const gamesRouter = require('./routes/games.routes');
const prisma = require('./prisma/prisma');
const pegarJogosSteam = require('./scripts/pegarJogosSteam');

async function popularBanco(): Promise<void> {
    try {
        const contagemJogos = await prisma.game.count();
        console.log(`Jogos no banco: ${contagemJogos}`);

        if (contagemJogos <= 100) {
            console.log('Limpando tabela de jogos...');
            await prisma.game.deleteMany({});
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

app.use(express.json());

app.use('/api', gamesRouter);

module.exports = app;
