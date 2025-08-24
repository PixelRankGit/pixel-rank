import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/prisma';
import { Admin, Usuario } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET as string

import { Request, Response } from 'express';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, senha } = req.body;

    try {
        const user: Usuario = await prisma.usuario.findUnique({
            where: {email}
        });

        if (!user || !(await bcrypt.compare(senha, user.senha))) {
            res.status(401).json({ message: 'Credenciais Inválidas'});
            return; 
        }

        if (!JWT_SECRET) {
            res.status(500).json({ message: "JWT_SECRET não foi definido." });
            return;
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });
        
        res.json({ message: "Login bem-sucedido", userId: user.id})
    } catch (error){
        res.status(500).json({ message: "Erro no login: " + error});
    }
};

export default loginUser