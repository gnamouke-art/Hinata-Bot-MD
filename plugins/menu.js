import fs from 'fs';

let handler = async (m, { conn }) => {
  try {
    const botName = 'Hinata-Bot';
    const currency = '¥';
    const videoUrl = 'https://files.catbox.moe/n35h6q.mp4';
    const version = '1.0.0';
    const developer = 'NeoTokyo Beats';
    const copy = '🔧 Sistema personalizado';

    // Canal
    const canalID = '120363341523880410';
    const newsletterName = 'hinataBot. channel ✨️';

    const menuMessage = `
╭─────────────────────────────╮
│       ✨ ${botName} ✨        │
│    Versión: ${version}             │
│    Desarrollado por: ${developer} │
│    Moneda: ${currency}               │
╰─────────────────────────────╯

📌 𝐂𝐑𝐄𝐀𝐃𝐎𝐑 𝐘 𝐀𝐃𝐌𝐈𝐍
• .cambiarnombreBot — Cambiar nombre
• .setbanner — Establecer banner
• .setmoneda — Cambiar moneda
• .viewbanner — Ver banner
• .deletebanner — Eliminar banner
• .resetpreferences — Reiniciar preferencias

─────────────────────────────

🎲 𝐉𝐔𝐄𝐆𝐎𝐒 / 𝐑𝐏𝐆
• .mina — Minería mágica

─────────────────────────────

🤖 𝐈𝐀 / 𝐂𝐇𝐀𝐓𝐁𝐎𝐓𝐒
• .gimini — Habla con Gimini
• .ia — Conversa con IA
• .akeno — Chat Akeno Himejima
• .demo — Pregunta a Demo
• .dalle — Genera imagen con DALL·E

─────────────────────────────

🛡️ 𝐀𝐃𝐌𝐈𝐍 /grupo
• .kick — Expulsar usuario
• .getplugin — Obtener plugin
• .getpack — Descargar pack
• .store — Ver tienda
• .status — Estado actual
• .ping — Latencia del bot
• .link obten el link del grupo si el bot es admin
• .kicknum  elimina alos que tengan el mismo prefix
─────────────────────────────

🎲 𝐑𝐀𝐍𝐃𝐎𝐌 𝐘 𝐖𝐀𝐈𝐅𝐔𝐒
• .rw — Waifu random
• .winfo — Info waifu
• .rollwaifu — Tirar waifu
• .claim — Reclamar waifu
• .harem — Ver harem
• .addrw — Añadir waifu
• .alya — Charla con Alya
• .kaori — Momento musical
• .waifu — Imagen waifu
• .fakengl — Nombre fake inglés

─────────────────────────────

📥 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒
• .instagram — Descargar video Instagram
• .ytmp4 — Descargar video YouTube
• .tt / .tiktok — Descargar TikTok
• .tiktokmp3 — Audio TikTok
• .sp / .spotify — Descargar Spotify
• .tksearch — Buscar TikTok
• .tourl — Subir URL
• .gitclone — Clonar repositorios
• .pinterest — Imagen random
• .pinvid — Descargar video Pinterest
• .imagen — Descargar imagen
• .apk — Descargar APK

─────────────────────────────

💰 𝐄𝐂𝐎𝐍𝐎𝐌𝐈𝐀
• .work — Trabajar y ganar ¥
• .slut — Riesgo o recompensa
• .robar — Robar a otro jugador
• .deposit — Depositar banco
• .retirar — Retirar banco
• .transferir — Transferir dinero
• .perfil — Ver economía

─────────────────────────────

⛩️ 𝐀𝐍𝐈𝐌𝐄 𝐑𝐄𝐀𝐂𝐂𝐈𝐎𝐍𝐄𝐒
• .abrazar — Abrazo kawaii
• .aburrido — Me aburro
• .bañarse — Hora del baño
• .bleh — ¡Bleh!
• .comer — Comiendo onigiri
• .dance — Hora de bailar
• .enojado — Molesto
• .feliz — Sonríe más
• .kiss — Envío un beso
• .love — ¡Te amo!
• .matar — Hora de acabar
• .morder — Ñam~
• .nalguear — Nalgadita
• .punch — Golpe directo
• .saludar — ¡Hola!
• .bofetada — ¡Toma esto!
• .dormir — Zzz...
• .smoke — Fumando con estilo
• .paja — 🔞

─────────────────────────────

🧰 𝐓𝐎𝐎𝐋𝐒
• .ver — Reacciona contenido “ver una vez”
• .get — Descargar estados
• .subirver — Sube “ver una vez”
• .rpf — Robar foto perfil
• .rpf2 — Robar perfil y nombre

─────────────────────────────

✨ 𝐎𝐖𝐍𝐄𝐑
• .update
• .dsowner
• .purgar
• .join

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📢 𝐂𝐚𝐧𝐚𝐥 𝐨𝐟𝐢𝐜𝐢𝐚𝐥:
${newsletterName}
🆔 𝐈𝐃: ${canalID}@newsletter
🔗 https://chat.whatsapp.com/channel/${canalID}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

> ${copy} — Hecho con ❤️ por ${developer}
`;

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: menuMessage,
      mentions: [m.sender],
    });
  } catch (error) {
    conn.reply(m.chat, `❌ Error al cargar el menú: ${error.message}`, m);
  }
};

handler.help = ['menu'];
handler.tags = ['info'];
handler.command = ['menu', 'help'];

export default handler;
