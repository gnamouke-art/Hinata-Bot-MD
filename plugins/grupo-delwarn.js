import { db } from '../lib/postgres.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let who;

    // Detectar al usuario a quien quitar la advertencia
    if (m.isGroup) {
      who = m.mentionedJid?.[0] || m.quoted?.sender;
    } else {
      who = m.chat;
    }

    if (!who) {
      return m.reply(`🚫 *¿A quién le quito una advertencia?*\n\nUsa: *${usedPrefix + command} @usuario* o responde a un mensaje.`);
    }

    // Verificar si el usuario está en la base de datos
    const res = await db.query('SELECT warn FROM usuarios WHERE id = $1', [who]);
    if (!res.rows.length) {
      return m.reply(`⚠️ El usuario no tiene registro en la base de datos.`);
    }

    let warn = Number(res.rows[0].warn || 0);

    if (warn > 0) {
      await db.query('UPDATE usuarios SET warn = warn - 1 WHERE id = $1', [who]);
      warn -= 1;

      await conn.sendMessage(m.chat, {
        text: `✅ *Advertencia eliminada:*\n\n👤 Usuario: @${who.split('@')[0]}\n⚠️ Advertencias restantes: *${warn}*`,
        mentions: [who]
      }, { quoted: m });

    } else {
      await conn.sendMessage(m.chat, {
        text: `📢 @${who.split('@')[0]} no tiene advertencias activas.`,
        mentions: [who]
      }, { quoted: m });
    }

  } catch (e) {
    console.error(e);
    m.reply('❌ Ocurrió un error al intentar eliminar la advertencia.');
  }
};

handler.help = ['delwarn @user', 'unwarn @user'];
handler.tags = ['group'];
handler.command = /^(delwarn|unwarn)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.register = true;

export default handler;
