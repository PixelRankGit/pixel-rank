const express = require('express');
const clienteRedis = require('../utils/clienteRedis');
const prisma = require('../prisma/prisma').default;

const router = express.Router();

import { Request, Response, NextFunction } from 'express';
import { getGames } from '../controllers/games.controller';

async function cacheGame(req: Request, res: Response, next: NextFunction) {
  const { query } = req.query;
  if (!query) return next();

  const key = `game:search:${query}`;
  const cached = await clienteRedis.get(key);

  if (cached) {
    return res.json(JSON.parse(cached));
  }

  res.locals.cacheKey = key;
  next();
}

router.get('/games', cacheGame, getGames);

module.exports = router;
