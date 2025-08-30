import cron from 'node-cron';
const prisma = require('../prisma/prisma').default;

cron.schedule('0 0 * * *', async () => {
    console.log('Rodando rotina de desativar users');
    try {
        await apagarUsersDesativados();
        console.log('Rotina de desativar users finalizada');
    } catch (error) {
        console.error('Erro ao apagar usuários desativados:', error);
    }
});

export const apagarUsersDesativados = async () => {
    const agora: Date = new Date();
    const dataApagar: Date = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000);

    await prisma.usuario.deleteMany({
        where: {
            ativo: false,
            naoAtivoDesde: { lt: dataApagar }
        }
    });

    console.log('Rotina feita, usuários apagados');
};

export default apagarUsersDesativados;