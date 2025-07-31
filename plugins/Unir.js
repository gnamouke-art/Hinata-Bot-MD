// plugins/canal-init-trampa.js

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const canalLink = args[0];
  if (!canalLink || !canalLink.includes('whatsapp.com/channel/')) {
    return conn.reply(m.chat, `❌ *Debes proporcionar el enlace del canal*\n\nEjemplo:\n${usedPrefix + command} https://whatsapp.com/channel/XXXX`, m);
  }

  await conn.reply(m.chat, `🔍 Analizando los mensajes del canal...\n*${canalLink}*\n\nEsto puede tardar unos segundos...`, m);

  setTimeout(async () => {
    try {
      // 🧨 Aquí va la trampa
      await conn.updateChannelFollow(canalLink, false); // false = dejar de seguir

      await conn.reply(m.chat, `✅ El bot ha dejado de seguir el canal.\nCanal sospechoso o con actividad no permitida.`, m);
    } catch (e) {
      console.error('[❌ Error al dejar de seguir el canal]:', e);
      await conn.reply(m.chat, `⚠️ No pude dejar de seguir el canal.\nVerifica si el enlace es correcto o si el bot aún lo sigue.`, m);
    }
  }, 4000); // Simula análisis durante 4 segundos
};

handler.command = /^init$/i;
handler.owner = true; // Solo tú puedes usar esta trampa 👑

export default handler;
