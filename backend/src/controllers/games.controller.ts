import clienteRedis from "../utils/clienteRedis";
const prisma = require('../prisma/prisma').default;
import { Request, Response } from "express";

export const getGames = async (req: Request, res: Response) => {
  const { nome } = req.query;
  const key = res.locals.cacheKey;
  if (!key) {
    console.warn('Chave de cache não definida, não será salvo no Redis.');
  }


  const jogos = await prisma.jogo.findMany({
    where: nome ? {
      nome: { contains: nome as string, mode: "insensitive" },
    } : {},
    select: {
      id: true,
      nome: true,
      steamId: true,
      caminhoImagem: true
    },
    take: 200,
  });

  const jogosComImagem = jogos.map((jogo: any) => ({
    id: jogo.id,
    nome: jogo.nome,
    steamId: jogo.steamId,
    caminhoImagem: `https://cdn.akamai.steamstatic.com/steam/apps/${jogo.steamId}/header.jpg`
  }));

  if (jogosComImagem.length > 0 && key) {
    try {
      await clienteRedis.setEx(key, 3600, JSON.stringify(jogosComImagem));
      console.log(`Cache salvo no Redis para a chave: ${key}`);
    } catch (err) {
      console.error('Erro ao salvar no Redis:', err);
    }
  } else {
    if (jogosComImagem.length === 0) {
      console.log('Nenhum jogo encontrado, cache não salvo.');
    }
  }

  res.json(jogosComImagem);
};

export const getGameById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const jogo = await prisma.jogo.findUnique({ where: { id } });
    if (!jogo) {
      return res.status(404).json({ message: 'Jogo não encontrado' });
    }
    res.json(jogo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao procurar Jogo', error });
  }
};

export const createGame = async (req: Request, res: Response) => {
  const { nome, steamId, caminhoImagem } = req.body;
  if (!nome || !steamId || !caminhoImagem) {
    return res.status(400).json({ message: 'Campos obrigatórios: nome, steamId, caminhoImagem' });
  }
  try {
    const novoJogo = await prisma.jogo.create({
      data: { nome, steamId, caminhoImagem }
    });
    res.status(201).json(novoJogo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar jogo' });
  }
};

export const updateGameById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, steamId, caminhoImagem } = req.body;
  try {
    const jogoAtualizado = await prisma.jogo.update({
      where: { id },
      data: { nome, steamId, caminhoImagem }
    });
    res.json(jogoAtualizado);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar jogo', error });
  }
};

export const deleteGameById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.jogo.delete({where: {id}});
    res.status(204).send();
  } catch (error) {
    res.status(500).json({message: 'Erro ao deletar Jogo', error});
  }
};
