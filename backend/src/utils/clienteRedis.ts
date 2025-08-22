const { createClient } = require('redis');

const clienteRedis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

clienteRedis.on('error', (err: Error) => console.log('Redis Client Error', err));

(async () => {
  await clienteRedis.connect();
  console.log('Redis conectado');
})();

export default clienteRedis;