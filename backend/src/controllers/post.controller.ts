const prisma = require('../prisma/prisma').default;

import { Postagem, Seguidor, Usuario } from "@prisma/client";
import { Optional } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.cookies?.token;
        if (token) {
            const secret = process.env.JWT_SECRET as string;
            let userId: string | undefined = undefined;
            try {
                const payload = jwt.verify(token, secret) as { userId: string };
                userId = payload.userId;
            } catch (err) {
            }
            if (userId) {
                const amigos: Seguidor[] = await prisma.seguidor.findMany({
                    where: { seguidorId: userId },
                    select: { seguindoId: true }
                }) || [];
                const amigosIds = amigos.map(a => a.seguindoId);
                const postsAmigos: Array<Postagem> = await prisma.postagem.findMany({
                    where: { usuarioId: { in: amigosIds } },
                    orderBy: { criadoEm: 'desc' },
                    take: 60
                });
                const postsUsuario: Array<Postagem> = await prisma.postagem.findMany({
                    where: { usuarioId: userId },
                    orderBy: { criadoEm: 'desc' },
                    take: 20
                });
                const posts = [...postsAmigos, ...postsUsuario];
                res.status(200).json(posts);
                return;
            }
        }
    const postsAleatorios: Optional<Postagem[]> = await prisma.$queryRaw`SELECT * FROM "Postagem" ORDER BY RANDOM() LIMIT 80`;
        if (!postsAleatorios || postsAleatorios.length === 0) {
            res.status(404).json({ message: 'Nenhum post encontrado' });
            return;
        }
        res.status(200).json(postsAleatorios);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar posts ${error}` });
    }
};

export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            res.status(401).json({ message: 'Token não encontrado' });
            return;
        }
        const secret = process.env.JWT_SECRET as string;
        let userId: string | undefined = undefined;
        try {
            const payload = jwt.verify(token, secret) as { userId: string };
            userId = payload.userId;
        } catch (err) {
            res.status(401).json({ message: 'Token inválido' });
            return;
        }

        const { conteudo, jogos } = req.body;
        if (!conteudo) {
            res.status(400).json({ message: 'Conteúdo é obrigatório' });
            return;
        }

        const novaPostagem = await prisma.postagem.create({
            data: {
                conteudo,
                usuarioId: userId
            }
        });

        if (jogos && Array.isArray(jogos) && jogos.length > 0) {
            const postagensJogos = jogos.map((jogoId: string) => ({
                postagemId: novaPostagem.id,
                jogoId
            }));
            await prisma.postagemJogo.createMany({ data: postagensJogos });
        }

        res.status(201).json(novaPostagem);
    } catch (error) {
        res.status(500).json({ message: `Erro ao criar postagem: ${error}` });
    }
};

export default { getPosts, createPost };