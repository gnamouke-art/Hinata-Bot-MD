import { db } from '../lib/postgres.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let who;
    if (m.isGroup) {
      who = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : false);
    } else {
      who = m.chat;
    }

    if (!who) {
      return m.reply('❗ *¿A quién querés quitarle una advertencia?*\n\n📌 Etiquetá con @usuario o respondé a su mensaje.\nNo leo la mente todavía 🤓');
    }

    const userResult = await db.query(`SELECT * FROM usuarios WHERE id = $1`, [who]);
    if (!userResult.rows.length) {
      return m.reply('🤷‍♂️ *Ese usuario ni siquiera existe en la base de datos.*');
    }

    let warn = userResult.rows[0].warn || 0;

    if (warn > 0) {
      await db.query(`UPDATE usuarios SET warn = warn - 1 WHERE id = $1`, [who]);
      warn -= 1;

      await conn.reply(m.chat, 
`✅ *Advertencia eliminada con éxito*\n
👤 Usuario: @${who.split`@`[0]}
📉 Advertencias restantes: *${warn}*`, 
      m, { mentions: [who] });

    } else {
      await conn.reply(m.chat, `📢 @${who.split`@`[0]} no tiene ninguna advertencia activa.\nEstá limpio como recién bañado 🚿`, m, { mentions: [who] });
    }

  } catch (err) {
    console.error(err);
    m.reply('❌ *Ocurrió un error inesperado al procesar la advertencia.*\nIntenta de nuevo más tarde.');
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
