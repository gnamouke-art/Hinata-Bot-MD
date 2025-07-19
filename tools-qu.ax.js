import uploadFile, { quax, RESTfulAPI, catbox, uguu, filechan, pixeldrain, gofile, krakenfiles, telegraph } from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';

const handlerQuax = async (m, { conn, args, usedPrefix, command }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q?.msg?.mimetype || q?.mimetype || '')?.toLowerCase() || '';

    if (!mime) {
      // Si no hay media, responde con instrucción simple
      return await m.reply(`⚠️ Por favor responde a una imagen, video o sticker con el comando *${usedPrefix + command}* para subir el archivo.`);
    }

    if (!q.download) {
      return await m.reply('⚠️ No pude descargar el archivo. Por favor responde a un archivo válido.');
    }

    const media = await q.download();

    const option = (args[0] || '').toLowerCase();
    const services = { quax, restfulapi: RESTfulAPI, catbox, uguu, filechan, pixeldrain, gofile, krakenfiles, telegraph };

    if (option && services[option]) {
      const link = await services[option](media);
      return await m.reply(link);
    }

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

handlerQuax.help = ['quax <opcional servicio>'];
handlerQuax.tags = ['convertidor'];
handlerQuax.command = /^(quax|x)$/i;
handlerQuax.register = true;

// Comando simple para probar si el bot responde
const handlerPing = async (m, { conn }) => {
  await m.reply('Pong! 🏓');
};
handlerPing.help = ['ping'];
handlerPing.tags = ['info'];
handlerPing.command = /^ping$/i;
handlerPing.register = true;

export { handlerQuax, handlerPing };
