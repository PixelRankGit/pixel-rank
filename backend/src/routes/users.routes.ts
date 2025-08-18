const express = require('express');
const router = express.Router();

import { getUserById, getUserByNome } from "../controllers/users.contoller";

router.get('/usuarios/:id', getUserById);

router.get('/usuarios/', getUserByNome)

module.exports = router;

/**
 * @openapi
 * /api/usuarios:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Busca usuários por nome
 *     description: Retorna todos os usuários cujo nome contém o valor informado.
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome (ou parte do nome) do usuário para filtrar
 *     responses:
 *       200:
 *         description: Lista de usuários encontrada com sucesso
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
 *                   email:
 *                     type: string
 *                   criadoEm:
 *                     type: string
 *                   atualizadoEm:
 *                     type: string
 */

/**
 * @openapi
 * /api/usuarios/{id}:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Busca usuário por UUID
 *     description: Retorna os dados de um usuário específico pelo seu UUID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *                 criadoEm:
 *                   type: string
 *                 atualizadoEm:
 *                   type: string
 *       404:
 *         description: Usuário não encontrado
 */