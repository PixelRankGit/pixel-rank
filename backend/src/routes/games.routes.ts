const express = require('express');
const router = express.Router();

import { cacheGame, updateGameCache, deleteGameCache } from '../middlewares/cache.middleware';
import { getGames, getGameById, updateGameById, deleteGameById, createGame } from '../controllers/games.controller';

router.get('/games', cacheGame, getGames);

router.get('/games/:id', cacheGame, getGameById);

router.post('/games/', createGame);

router.put('/games/:id', updateGameById, updateGameCache);

router.delete('/games/:id', deleteGameById, deleteGameCache);

module.exports = router;

/**
 * @openapi
 * /api/games:
 *   get:
 *     tags:
 *       - Jogos
 *     summary: Lista todos os jogos ou filtra por nome
 *     description: Retorna uma lista de jogos. Pode filtrar por nome usando o parâmetro de query `nome`.
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome (ou parte do nome) do jogo para filtrar
 *     responses:
 *       200:
 *         description: Lista de jogos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nome:
 *                     type: string
 *                   steamId:
 *                     type: integer
 *                   caminhoImagem:
 *                     type: string
 */

/**
 * @openapi
 * /api/games/{id}:
 *   get:
 *     tags:
 *       - Jogos
 *     summary: Busca um jogo pelo UUID
 *     description: Retorna os dados de um jogo específico pelo seu UUID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do jogo
 *     responses:
 *       200:
 *         description: Jogo encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 steamId:
 *                   type: integer
 *                 caminhoImagem:
 *                   type: string
 *       404:
 *         description: Jogo não encontrado
 */

/**
 * @openapi
 * /api/games:
 *   post:
 *     tags:
 *       - Jogos
 *     summary: Cria um novo jogo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - steamId
 *               - caminhoImagem
 *             properties:
 *               nome:
 *                 type: string
 *               steamId:
 *                 type: integer
 *               caminhoImagem:
 *                 type: string
 *     responses:
 *       201:
 *         description: Jogo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 steamId:
 *                   type: integer
 *                 caminhoImagem:
 *                   type: string
 */

/**
 * @openapi
 * /api/games/{id}:
 *   put:
 *     tags:
 *       - Jogos
 *     summary: Atualiza um jogo existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do jogo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               steamId:
 *                 type: integer
 *               caminhoImagem:
 *                 type: string
 *     responses:
 *       200:
 *         description: Jogo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 steamId:
 *                   type: integer
 *                 caminhoImagem:
 *                   type: string
 *       404:
 *         description: Jogo não encontrado
 */

/**
 * @openapi
 * /api/games/{id}:
 *   delete:
 *     tags:
 *       - Jogos
 *     summary: Deleta um jogo existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do jogo
 *     responses:
 *       204:
 *         description: Jogo deletado com sucesso
 *       404:
 *         description: Jogo não encontrado
 */

