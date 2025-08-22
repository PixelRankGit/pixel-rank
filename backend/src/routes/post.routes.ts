import express from 'express';

const router = express.Router();


import { getPosts, createPost, curtirPost, descurtirPost } from '../controllers/post.controller';


router.get('/posts', getPosts);

router.post('/posts', createPost);
router.post('/posts/:id/curtir', curtirPost);

router.delete('/posts/:id/descurtir', descurtirPost);

export default router;

/**
 * @swagger
 * /posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Retorna a lista de postagens
 *     responses:
 *       200:
 *         description: Lista de postagens recuperadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   conteudo:
 *                     type: string
 *                   usuarioId:
 *                     type: string
 *                   criadoEm:
 *                     type: string
 *                     format: date-time
 *                   atualizadoEm:
 *                     type: string
 *                     format: date-time
 *                   qtCurtidas:
 *                     type: integer
 *       404:
 *         description: Nenhuma postagem encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erro ao buscar postagens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Cria uma nova postagem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - conteudo
 *             properties:
 *               conteudo:
 *                 type: string
 *                 description: Conteúdo da postagem
 *               jogos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de IDs de jogos associados (opcional)
 *     responses:
 *       201:
 *         description: Postagem criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 conteudo:
 *                   type: string
 *                 usuarioId:
 *                   type: string
 *                 criadoEm:
 *                   type: string
 *                   format: date-time
 *                 atualizadoEm:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos ou faltando conteúdo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Usuário não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erro ao criar postagem
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /posts/{id}/curtir:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Curte uma postagem
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da postagem a ser curtida
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Postagem curtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Postagem já curtida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Usuário não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Postagem não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erro ao curtir postagem
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /posts/{id}/descurtir:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Remove a curtida de uma postagem
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da postagem a ser descurtida
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Postagem descurtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Postagem ainda não curtida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Usuário não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Postagem não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erro ao descurtir postagem
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
