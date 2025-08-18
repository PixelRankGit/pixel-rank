import { Request, Response, NextFunction } from "express";
import clienteRedis from "../utils/clienteRedis";

export const cacheGame = async (req: Request, res: Response, next: NextFunction) => {
  const { id, query } = req.params.id ? req.params : req.query;

  const key = id ? `game:${id}` : `game:search:${query}`;
  const redis = await clienteRedis();
  const cached = await redis.get(key);

  if (cached) {
    return res.json(JSON.parse(cached));
  }

  res.locals.cacheKey = key;
  next();
};
