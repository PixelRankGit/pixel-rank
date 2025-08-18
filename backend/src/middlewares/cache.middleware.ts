import { Request, Response, NextFunction } from "express";
import clienteRedis from "../utils/clienteRedis";

export const cacheGame = async (req: Request, res: Response, next: NextFunction) => {
  const { id, nome } = req.params.id ? req.params : req.query;

  const key = id ? `game:${id}` : nome ? `game:search:${nome}` : null;
  if (!key) return next();

  const cached = await clienteRedis.get(key);

  if (cached) {
    return res.json(JSON.parse(cached));
  }

  res.locals.cacheKey = key;
  next();
};

export async function updateGameCache({ id, nome, data }: { id?: string, nome?: string, data: any }) {
  const key = id ? `game:${id}` : nome ? `game:search:${nome}` : null;
  if (!key) return;
  await clienteRedis.setEx(key, 3600, JSON.stringify(data));
}

export async function deleteGameCache({ id, nome }: { id?: string, nome?: string }) {
  const key = id ? `game:${id}` : nome ? `game:search:${nome}` : null;
  if (!key) return;
  await clienteRedis.del(key);
}

export default { deleteGameCache, updateGameCache, cacheGame };
