import uploadFile, { quax, RESTfulAPI, catbox, uguu, filechan, pixeldrain, gofile, krakenfiles, telegraph } from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q?.msg?.mimetype || q?.mimetype || '')?.toLowerCase() || '';

    if (!mime) {
      return await m.reply(
        `*\`⚠️ ¿𝐘 𝐋𝐀 𝐈𝐌𝐀𝐆𝐄𝐍/𝐕𝐈𝐃𝐄𝐎?\`*

*• Ejemplo de Uso de ${usedPrefix + command}:*

— Responde a una imagen, sticker o video corto con el comando:

➔ *${usedPrefix + command}*

Subirá automáticamente el archivo a servidores como *qu.ax*, *catbox*, *gofile*, etc.

🌐 *\`¿Quieres elegir un servidor específico?\`*
> Puedes usar:

➔ *${usedPrefix + command} quax _(Recomendado)_*
➔ *${usedPrefix + command} catbox _(recomendado)_*
➔ *${usedPrefix + command} uguu*  
➔ *${usedPrefix + command} pixeldrain*  
➔ *${usedPrefix + command} restfulapi*  
➔ *${usedPrefix + command} filechan*  
➔ *${usedPrefix + command} gofile*  
➔ *${usedPrefix + command} krakenfiles*  
➔ *${usedPrefix + command} telegraph*

📝 *\`Notas:\`*
- *El archivo debe ser una imagen, sticker o video corto.*  
- *Enlaces de qu.ax y catbox no expiran.*
- *Algunos servicios como file.io expiran en 24 horas.*`.trim()
      );
    }

    // Descarga el archivo, verifica que exista q.download
    if (!q.download) {
      return await m.reply('⚠️ No pude descargar el archivo. Por favor, responde a un archivo válido.');
    }
    const media = await q.download();

    const option = (args[0] || '').toLowerCase();
    const services = { quax, restfulapi: RESTfulAPI, catbox, uguu, filechan, pixeldrain, gofile, krakenfiles, telegraph };

    if (option && services[option]) {
      const link = await services[option](media);
      return await m.reply(link);
    }

    // Decide si subir como imagen o archivo
    const isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    const link = await (isTele ? uploadImage : uploadFile)(media);

    return await m.reply(link);

  } catch (e) {
    console.error(e);
    return await m.reply(
      '❌ Error al subir el archivo. Intenta con otra opción:\n' +
      Object.keys({
        quax, restfulapi: RESTfulAPI, catbox, uguu, filechan, pixeldrain, gofile, krakenfiles, telegraph
      }).map(v => `➔ ${usedPrefix}${command} ${v}`).join('\n')
    );
  }
};

handler.help = ['quax <opcional servicio>'];
handler.tags = ['convertidor'];
handler.command = /^(quax|x)$/i;
handler.register = true;

export default handler;
