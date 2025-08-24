import prisma from '../prisma/prisma';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Comentario, Postagem, Usuario } from '@prisma/client';
import io from '../server';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const getComentarios = async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    const comentarios = await prisma.comentario.findMany({
      where: { postagemId: postId },
      include: { usuario: true },
      orderBy: { criadoEm: 'asc' }
    });
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ message: `Erro ao buscar comentários: ${error}` });
  }
};

export const createComentario = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { conteudo } = req.body;
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: 'Não autenticado' });

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    const userId = payload.userId;

    if (!conteudo?.trim()) return res.status(400).json({ message: 'Conteúdo obrigatório' });

    const postagem = await prisma.postagem.findUnique({ where: { id: postId } });
    if (!postagem) return res.status(404).json({ message: 'Postagem não encontrada' });

    const novoComentario = await prisma.comentario.create({
      data: { conteudo, usuarioId: userId, postagemId: postId },
      include: { usuario: true }
    });

    io.emit("novoComentario", {
      postagemId: postId, comentario: novoComentario
    });

    res.status(201).json(novoComentario);
  } catch (error) {
    res.status(500).json({ message: `Erro ao criar comentário: ${error}` });
  }
};

export const deleteComentario = async (req: Request, res: Response) => {
  const { comentarioId } = req.params;
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: 'Não autenticado' });

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    const userId = payload.userId;

    const comentario = await prisma.comentario.findUnique({ where: { id: comentarioId } });
    if (!comentario) return res.status(404).json({ message: 'Comentário não encontrado' });

    if (comentario.usuarioId !== userId)
      return res.status(403).json({ message: 'Você não pode deletar este comentário' });

    await prisma.comentario.delete({ where: { id: comentarioId } });
    res.status(200).json({ message: 'Comentário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: `Erro ao deletar comentário: ${error}` });
  }
};

export default { getComentarios, createComentario, deleteComentario };
