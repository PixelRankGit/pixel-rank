// @ts-nocheck
import request from 'supertest';
import app, { popularBanco } from '../src/index';
import prisma from '../src/prisma/prisma';
import clienteRedis from '../src/utils/clienteRedis';

beforeAll(async () => {
  await popularBanco();
});

afterAll(async () => {
  await clienteRedis.quit();
  await prisma.$disconnect();
});

describe('Rotas de Jogos', () => {
  it('GET /api/games deve retornar status 200 e um array', async () => {
    const res = await request(app).get('/api/games');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/games?nome=Half-Life deve retornar status 200', async () => {
    const res = await request(app).get('/api/games?nome=Half-Life');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});