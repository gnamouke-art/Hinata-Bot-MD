import axios from 'axios';
import puppeteer from 'puppeteer';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const emoji = '🔞';

  if (!text || !text.includes('hentai.tv')) {
    return m.reply(`${emoji} Por favor proporciona un enlace válido de hentai.tv\nEjemplo:\n> ${usedPrefix + command} https://hentai.tv/hentai/sisters-the-last-day-of-summer-chinatsu-episode-3/`);
  }

  let videoUrl;
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(text, { waitUntil: 'networkidle0' });

    videoUrl = await page.$eval('video source', el => el.src).catch(() => null);
    await browser.close();
  } catch (e) {
    console.error(e);
    return m.reply('😿 Hubo un error cargando la página para extraer el video.');
  }

  if (!videoUrl) {
    return m.reply('💔 Ooops... No encontré el video en esa página. ¿Seguro que es un episodio con reproductor?');
  }

  try {
    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: `🎬 Aquí tienes el video:\n🔗 ${videoUrl}`
    }, { quoted: m });
  } catch (e) {
    console.error(e);
    m.reply('😿 El video es muy grande o no pudo enviarse. Intenta bajarlo desde el enlace directamente.');
  }
};

handler.command = ['hentaivideo', 'descargarhentai'];
handler.tags = ['nsfw'];
handler.help = ['hentaivideo <link>'];
handler.limit = true;

export default handler;
