import clienteRedis from "../utils/clienteRedis";
const prisma = require('../prisma/prisma').default;
import { Request, Response } from "express";

type Jogo = {
  nome: string;
  steamId: number;
  caminhoImagem: string;
};

export const getGames = async (req: Request, res: Response) => {
  const { query } = req.query;
  const key = res.locals.cacheKey;
  if (!key) {
    console.warn('Chave de cache não definida, não será salvo no Redis.');
  }

  const jogos = await prisma.jogo.findMany({
    where: {
      nome: { contains: query as string, mode: "insensitive" },
    },
    select: {
      nome: true,
      steamId: true,
      caminhoImagem: true
    },
    take: 200,
  });

  const jogosComImagem: Jogo[] = jogos.map((jogo: any) => ({
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