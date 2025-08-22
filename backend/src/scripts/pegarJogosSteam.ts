require('dotenv').config();
const prisma = require('../prisma/prisma').default;

type SteamApp = {
  appid: number;
  name: string;
};

async function pegarJogosSteam(): Promise<void> {
  try {
    console.log('Buscando jogos da Steam...');
    
    const res = await fetch('https://api.steampowered.com/ISteamApps/GetAppList/v2/');
    if (!res.ok) throw new Error(`Erro na API da Steam: ${res.status}`);
    
    const data = await res.json();
    const apps: SteamApp[] = data.applist.apps;

    console.log(`Total de apps encontrados: ${apps.length}`);

    const validApps = apps.filter(app => app.name);

    for (let i = 0; i < validApps.length; i += 100) {
      const batch = validApps.slice(i, i + 100);

      const steamIds = batch.map(app => app.appid);
      const existentes = await prisma.jogo.findMany({
        where: { steamId: { in: steamIds } },
        select: { steamId: true }
      });
      const existentesSet = new Set(existentes.map((g: { steamId: number }) => g.steamId));

      const novos = batch.filter(app => !existentesSet.has(app.appid)).map(app => ({
        nome: app.name,
        steamId: app.appid,
        caminhoImagem: `https://cdn.cloudflare.steamstatic.com/steam/apps/${app.appid}/header.jpg`,
      }));

      if (novos.length > 0) {
        await prisma.jogo.createMany({ data: novos, skipDuplicates: true });
        console.log(`Batch ${i / 100 + 1}: ${novos.length} jogos adicionados.`);
      } else {
        console.log(`Batch ${i / 100 + 1}: Nenhum novo jogo para adicionar.`);
      }

      await new Promise(r => setTimeout(r, 500));
    }

    console.log('Importação completa!');
  } catch (err) {
    console.error('Erro ao buscar jogos da Steam:', err);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  pegarJogosSteam();
}

module.exports = pegarJogosSteam;
