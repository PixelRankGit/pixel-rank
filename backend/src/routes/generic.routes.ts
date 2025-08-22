import express from 'express';
import { Request, Response } from "express";

const router = express.Router();

router.get('/', async (req: Request, res: Response) =>{
    res.status(200).json({ message: 'Para de Bisbilhotar!!!'});
});

router.get('/status', async (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString()});
});

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Status
 *     summary: Mensagem de aviso genérica
 *     description: Retorna uma mensagem simples para qualquer acesso à raiz do router.
 *     responses:
 *       200:
 *         description: Mensagem enviada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Para de Bisbilhotar!!!"
 */

/**
 * @swagger
 * /status:
 *   get:
 *     tags:
 *       - Status
 *     summary: Retorna o status do servidor
 *     description: Permite verificar se a API está ativa e exibe o timestamp atual.
 *     responses:
 *       200:
 *         description: Status retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-08-22T19:45:00.000Z"
 */

export default router;