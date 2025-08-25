const express = require('express');
const router = express.Router();

import jwt from 'jsonwebtoken';
import { loginUser } from '../controllers/login.controller'

const JWT_SECRET = process.env.JWT_SECRET as string

router.post('/login', loginUser);

// backend
router.get('/api/me', (req: { cookies: { token: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { user: null; }): void; new(): any; }; }; json: (arg0: { userId: string; email: string; }) => void; }) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ user: null });
  
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string, email: string };
    res.json({ userId: payload.userId, email: payload.email });
  } catch {
    res.status(401).json({ user: null });
  }
});


export default router;

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Login
 *     summary: Autentica um usuário e retorna um token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     nome:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Email ou senha incorretos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

