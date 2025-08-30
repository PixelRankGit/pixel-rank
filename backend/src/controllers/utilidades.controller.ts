import { Request, Response } from 'express';

import clienteRedis from '../utils/clienteRedis';
import apagarCache from '../scripts/apagarCache';

export const limparCache = async (req: Request, res: Response): Promise<void> => {
    try {
        await apagarCache();
        res.status(200).json({ message: 'Cache limpo com sucesso' });
    } catch (error) {
        console.error('Erro ao limpar cache:', error);
        res.status(500).json({ message: 'Erro ao limpar cache', error: {error}});
    }
};

export const adicionarCache = async (req: Request, res: Response): Promise<void> => {
    const { valorCache, chaveCache } : { valorCache: string, chaveCache: string } = req.body;
    try {
        await clienteRedis.set(chaveCache, valorCache);
        res.status(200).json({ message: 'Cache adicionado com sucesso' });
    } catch (error) {
        console.error('Erro ao adicionar cache:', error);
        res.status(500).json({ message: 'Erro ao adicionar cache', error: {error}});
    }
}

export const removerCache = async (req: Request, res: Response): Promise<void> => {
    const { chaveCache } : { chaveCache: string } = req.body;
    try {
        await clienteRedis.del(chaveCache);
        res.status(200).json({ message: 'Cache removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover cache:', error);
        res.status(500).json({ message: 'Erro ao remover cache', error: {error}});
    }
}

export const showCache = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json(await clienteRedis.keys('*'));
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar chaves do cache', error: {error}});
    }
}

export default { limparCache, adicionarCache, removerCache, showCache };