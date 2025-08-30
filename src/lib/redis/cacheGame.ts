import { redis } from "./redis";

export async function getGameCache({ id, nome }: { id?: string; nome?: string }) {
  const key = id ? `game:${id}` : nome ? `game:search:${nome}` : null;
  if (!key) return null;

  const cached = await redis.get(key);
  return cached ? JSON.parse(cached) : null;
}

export async function setGameCache({ id, nome, data }: { id?: string; nome?: string; data: any }) {
  const key = id ? `game:${id}` : nome ? `game:search:${nome}` : null;
  if (!key) return;
  await redis.setex(key, 3600, JSON.stringify(data));
}

export async function deleteGameCache({ id, nome }: { id?: string; nome?: string }) {
  const key = id ? `game:${id}` : nome ? `game:search:${nome}` : null;
  if (!key) return;
  await redis.del(key);
}
