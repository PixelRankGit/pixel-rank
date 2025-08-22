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

                const postsAmigos: Array<any> = await prisma.postagem.findMany({
                    where: { usuarioId: { in: amigosIds } },
                    orderBy: { criadoEm: 'desc' },
                    take: 60,
                    include: {
                        _count: {
                            select: { curtidas: true }
                        }
                    }
                });

                const postsUsuario: Array<any> = await prisma.postagem.findMany({
                    where: { usuarioId: userId },
                    orderBy: { criadoEm: 'desc' },
                    take: 20,
                    include: {
                        _count: {
                            select: { curtidas: true }
                        }
                    }
                });

                const posts = [...postsAmigos, ...postsUsuario].map(({ _count, ...rest }) => ({
                    ...rest,
                    qtCurtidas: _count.curtidas
                }));

                res.status(200).json(posts);
                return;
            }
        }
    const postsAleatorios = await prisma.$queryRaw<
    Array<Postagem & { qtCurtidas: number }>

    >   `SELECT p.*, 
            (SELECT COUNT(*) 
            FROM "CurtidaPost" c 
            WHERE c."postagemId" = p.id) as "qtCurtidas"
    FROM "Postagem" p
    ORDER BY RANDOM()
    LIMIT 80`;

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

export const curtirPost = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const token = req.cookies?.token;

    if (!token){
        res.status(401).json({ message: 'Você não está autenticado' });
        return;
    }

    try {
        const secret: string = process.env.JWT_SECRET as string;
        const payload = jwt.verify(token, secret) as { userId: string };
        const userId: string = payload.userId;

        const postagem: Optional<Postagem> = await prisma.postagem.findUnique({
            where: { id: id }
        });

        if (!postagem){
            res.status(404).json({ message: 'Postagem não encontrada' });
            return;
        }

        const usuario: Optional<Usuario> = await prisma.usuario.findUnique({
            where: { id: userId }
        });

        if (!usuario){
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        const jaCurtiu: Optional<boolean> = await prisma.CurtidaPost.findFirst({
            where: {
                postagemId: id,
                usuarioId: userId
            }
        });

        if (jaCurtiu){
            res.status(400).json({ message: 'Você já curtiu essa postagem' });
            return;
        }

        await prisma.CurtidaPost.create({
            data: {
                postagemId: id,
                usuarioId: userId
            }
        });
        res.status(200).json({ message: 'Postagem curtida com sucesso' });
        return;


    } catch (error){
        res.status(500).json({ message: `Erro ao curtir postagem: ${error}`});
        return;
    }
}

export const descurtirPost = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const token = req.cookies?.token;

    if (!token){
        res.status(401).json({ message: 'Você não está autenticado' });
        return;
    }

    try {
        const secret: string = process.env.JWT_SECRET as string;
        const payload = jwt.verify(token, secret) as { userId: string };
        const userId: string = payload.userId;

        const postagem: Optional<Postagem> = await prisma.postagem.findUnique({
            where: { id: id }
        });

        if (!postagem){
            res.status(404).json({ message: 'Postagem não encontrada' });
            return;
        }

        const usuario: Optional<Usuario> = await prisma.usuario.findUnique({
            where: { id: userId }
        });

        if (!usuario){
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        const jaCurtiu: Optional<boolean> = await prisma.CurtidaPost.findFirst({
            where: {
                postagemId: id,
                usuarioId: userId
            }
        });

        if (!jaCurtiu){
            res.status(400).json({ message: 'Você ainda não curtiu essa postagem' });
            return;
        }

        await prisma.CurtidaPost.deleteMany({
            where: {
                postagemId: id,
                usuarioId: userId
            }
        });
        res.status(200).json({ message: 'Postagem descurtida com sucesso' });
        return;
    } catch (error) {
        res.status(500).json({ message: `Erro ao descurtir postagem: ${error}`});
        return;
    }
};

export default { getPosts, createPost, curtirPost, descurtirPost };