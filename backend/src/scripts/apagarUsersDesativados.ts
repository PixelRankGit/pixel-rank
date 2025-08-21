import cron from 'node-cron';
const prisma = require('../prisma/prisma').default;

cron.schedule('0 0 * * *', async () => {
    console.log('Rodando rotina de desativar users');

    const hoje: Date = new Date;
    const datas = new Date(
        hoje.getFullYear(),
        hoje.getMonth(),
        hoje.getDay()
    );

    await prisma.usuario.deleteMany({
        where: {
            ativo: false,
            naoAtivoDesde: datas 
        }
    });

    console.log('Rotina feita, usuários apagados');
});