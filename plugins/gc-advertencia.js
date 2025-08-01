// 💋 Comando .advertencia – Hinata Bot
// 😈 Sistema de advertencias coquetas y expulsión automática
import fs from 'fs';

let handler = async (m, { conn, text, args, participants, groupMetadata, isAdmin, isBotAdmin }) => {
  if (!m.isGroup) return conn.reply(m.chat, '🍑 Este comando solo funciona en grupos, bebé.', m);
  if (!isAdmin) return conn.reply(m.chat, '👀 Solo los admins pueden dar advertencias, mi ciela.', m);
  if (!isBotAdmin) return conn.reply(m.chat, '💢 Hazme admin primero, tontito. ¿Cómo quieres que te ayude si no tengo poder?', m);

  let user = m.mentionedJid[0] || m.quoted?.sender;
  if (!user) return conn.reply(m.chat, '🎯 Etiqueta a alguien para darle su advertencia merecida.', m);
  if (user === conn.user.jid) return conn.reply(m.chat, '😇 No me puedo advertir a mí misma, soy perfecta.', m);

  let path = './src/database/advertencias.json';
  if (!fs.existsSync(path)) fs.writeFileSync(path, '{}');
  let data = JSON.parse(fs.readFileSync(path));
  if (!data[m.chat]) data[m.chat] = {};
  if (!data[m.chat][user]) data[m.chat][user] = 0;

  data[m.chat][user]++;
  fs.writeFileSync(path, JSON.stringify(data, null, 2));

  let advertencias = data[m.chat][user];

  if (advertencias >= 3) {
    if (isBotAdmin) {
      await conn.reply(m.chat, `💣 *${advertencias} ADVERTENCIAS*\nEste usuario ya colmó mi paciencia...\n🚫 ¡A la verga fuera del grupo!`, m);
      await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
      delete data[m.chat][user];
      fs.writeFileSync(path, JSON.stringify(data, null, 2));
    } else {
      conn.reply(m.chat, '💢 Quiero eliminarlo pero no soy admin, mi amor...', m);
    }
  } else {
    conn.reply(m.chat, `🚩 Se registró una advertencia para @${user.split('@')[0]}\n📛 Total: *${advertencias}/3* advertencias.`, m, {
      mentions: [user]
    });
  }
};

handler.help = ['advertencia @usuario'];
handler.tags = ['group'];
handler.command = ['advertencia', 'advertir', 'warn'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
