import cheerio from 'cheerio';
import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const emoji = '🔞';
  const emoji2 = '❌';

  if (!db.data.chats[m.chat]?.nsfw && m.isGroup) {
    return m.reply(`${emoji} El contenido *NSFW* está desactivado en este grupo.\n\nUn administrador puede activarlo con:\n> *${usedPrefix}nsfw on*`);
  }

  if (!text) {
    return m.reply(`${emoji} Ingresa el nombre de un hentai para buscar.\n\nEjemplo:\n> *${usedPrefix + command} Zero Two*`);
  }

  try {
    const searchResults = await searchHentai(text);
    if (!searchResults || !searchResults.result || searchResults.result.length === 0) {
      return m.reply(`${emoji2} No encontré resultados para: *${text}*`);
    }

    let randomResult = searchResults.result[Math.floor(Math.random() * searchResults.result.length)];
    let resultado = `*🌸 Hentai encontrado:* ${text}\n\n`;

    resultado += searchResults.result.slice(0, 5).map((v, i) => `
${i + 1}. *${v.title}*
📈 *Vistas:* ${v.views}
🔗 *Enlace:* ${v.url}`).join('\n\n');

    await conn.sendFile(m.chat, randomResult.thumbnail, 'hentai.jpg', resultado, m);
  } catch (err) {
    console.error(err);
    return m.reply(`${emoji2} Ocurrió un error al buscar.\nVuelve a intentarlo más tarde.`);
  }
};

handler.command = ['searchhentai', 'hentaisearch'];
handler.tags = ['nsfw'];
handler.help = ['searchhentai <nombre>'];
handler.limit = true;

export default handler;

async function searchHentai(query) {
  try {
    const { data } = await axios.get('https://hentai.tv/?s=' + encodeURIComponent(query));
    const $ = cheerio.load(data);
    const result = [];

    $('div.flex > div.crsl-slde').each((i, el) => {
      const thumbnail = $(el).find('img').attr('src');
      const title = $(el).find('a').text().trim();
      const views = $(el).find('p').text().trim();
      const url = $(el).find('a').attr('href');
      result.push({ thumbnail, title, views, url });
    });

    return { coder: 'Light Yagami Bot', result };
  } catch (err) {
    console.error('Error al hacer scraping:', err);
    return { result: [] };
  }
}
