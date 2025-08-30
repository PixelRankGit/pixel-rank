import cron from 'node-cron';
import redisClient from '../utils/clienteRedis'

cron.schedule('0 0 * * *', async () => {
    await apagarCache();
    console.log('Cache apagado com sucesso!');
});

export const apagarCache = async () => {
    await redisClient.flushAll();
    await redisClient.disconnect();
}

export default apagarCache;