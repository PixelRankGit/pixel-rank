import clienteRedis from "../utils/clienteRedis";
const prisma = require('../prisma/prisma');
import { Request, Response } from "express";

type Game = {
  name: string;
  steamId: number;
  imageUrl: string;
};

export const getGames = async (req: Request, res: Response) => {
  const { query } = req.query;
  const key = res.locals.cacheKey;
  if (!key) {
    console.warn('Chave de cache não definida, não será salvo no Redis.');
  }

  const games = await prisma.game.findMany({
    where: {
      name: { contains: query, mode: "insensitive" },
    },
    select: {
      name: true,
      steamId: true
    },
    take: 200,
  });

  const gamesWithImage: Game[] = games.map((game: Game) => ({
    name: game.name,
    steamId: game.steamId,
    imageUrl: `https://cdn.akamai.steamstatic.com/steam/apps/${game.steamId}/header.jpg`
  }));

  if (gamesWithImage.length > 0 && key) {
    try {
      await clienteRedis.setEx(key, 3600, JSON.stringify(gamesWithImage));
      console.log(`Cache salvo no Redis para a chave: ${key}`);
    } catch (err) {
      console.error('Erro ao salvar no Redis:', err);
    }
  } else {
    if (gamesWithImage.length === 0) {
      console.log('Nenhum jogo encontrado, cache não salvo.');
    }
  }

  res.json(gamesWithImage);
};