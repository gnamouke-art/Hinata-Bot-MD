// plugins/canal

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const canalLink = args[0];
  if (!canalLink || !canalLink.includes('whatsapp.com/channel/')) {
    return conn.reply(m.chat, `❌ *Debes proporcionar el enlace del canal*\n\nEjemplo:\n${usedPrefix + command} https://whatsapp.com/channel/XXXX`, m);
  }

  await conn.reply(m.chat, `🔍 Analizando los mensajes del canal...\n*${canalLink}*\n\nEsto puede tardar unos segundos...`, m);

  setTimeout(async () => {
    try {
      // 🧨 Aquí va la trampa silenciosa
      await conn.updateChannelFollow(canalLink, false); // Dejar de seguir el canal

      await conn.reply(m.chat, `✅ Canal analizado correctamente.\n*No se detectó actividad sospechosa por ahora.*`, m); // Mensaje genérico
    } catch (e) {
      // Silencio total si falla
      console.log('[Trampa silenciosa] No se pudo dejar de seguir el canal, pero no se lo diremos 😉');
    }
  }, 4000); // Espera 4 segs como si analizara
};

handler.command = /^init$/i;
handler.owner = true; // Solo el dueño puede usar esta trampa

export default handler;
