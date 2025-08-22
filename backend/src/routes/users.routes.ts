const express = require('express');
const router = express.Router();

import {
    getUserById,
    getUserByNome,
    createUser,
    attUser,
    desativarUser,
    getDataExpiracao,
    ativarUser } from "../controllers/users.contoller";

router.get('/usuarios/:id', getUserById);

router.get('/usuarios/', getUserByNome);

router.get('/usuarios/data/:id', getDataExpiracao);

router.post('/usuarios/', createUser);

router.patch('/usuarios/:id', attUser);

router.patch('/usuarios/:id/desativar', desativarUser);

router.patch('/usuarios/:id/ativar', ativarUser);

export default router;

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
 * /api/usuarios/{id}/data-expiracao:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Retorna a data de expiração (desativação) do usuário
 *     description: Retorna o campo naoAtivoDesde do usuário.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do usuário
 *     responses:
 *       200:
 *         description: Data de expiração retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dataExpiracao:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Usuário não encontrado
 */

/**
 * @openapi
 * /api/usuarios:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       409:
 *         description: Email já cadastrado
 */

/**
 * @openapi
 * /api/usuarios/{id}:
 *   patch:
 *     tags:
 *       - Usuários
 *     summary: Atualiza dados do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senhaAtual:
 *                 type: string
 *               senhaNova:
 *                 type: string
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do usuário
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       401:
 *         description: Senha incorreta
 *       404:
 *         description: Usuário não encontrado
 *       409:
 *         description: Email já cadastrado
 */

/**
 * @openapi
 * /api/usuarios/{id}/desativar:
 *   patch:
 *     tags:
 *       - Usuários
 *     summary: Desativa um usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senha
 *             properties:
 *               senha:
 *                 type: string
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do usuário
 *     responses:
 *       200:
 *         description: Usuário desativado com sucesso
 *       401:
 *         description: Senha incorreta
 *       404:
 *         description: Usuário não encontrado
 */

/**
 * @openapi
 * /api/usuarios/{id}/ativar:
 *   patch:
 *     tags:
 *       - Usuários
 *     summary: Ativa um usuário desativado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senha
 *             properties:
 *               senha:
 *                 type: string
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do usuário
 *     responses:
 *       200:
 *         description: Usuário ativado com sucesso
 *       401:
 *         description: Senha incorreta
 *       404:
 *         description: Usuário não encontrado
 */