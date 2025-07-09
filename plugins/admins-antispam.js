import db from '../lib/database.js';

const spamLimit = 4; // cantidad de mensajes
const tiempoSpam = 5000; // 5 segundos

const usuariosFlood = {};

export async function before(m, { conn, isAdmin, isBotAdmin }) {
  if (!m.isGroup) return;

  const chat = db.data.chats[m.chat] || {};
  if (!chat.antispam) return;

  if (!usuariosFlood[m.chat]) usuariosFlood[m.chat] = {};
  const user = usuariosFlood[m.chat][m.sender] || {
    mensajes: 0,
    ultimoMensaje: 0,
  };

  const ahora = Date.now();
  if (ahora - user.ultimoMensaje < tiempoSpam) {
    user.mensajes++;
  } else {
    user.mensajes = 1;
  }

  user.ultimoMensaje = ahora;
  usuariosFlood[m.chat][m.sender] = user;

  if (user.mensajes >= spamLimit) {
    user.mensajes = 0; // reinicia el contador
    if (isBotAdmin && !isAdmin) {
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      await conn.reply(m.chat, `⚠️ @${m.sender.split('@')[0]} fue eliminado por hacer spam.`, m, {
        mentions: [m.sender]
      });
    }
  }
}

const handler = async (m, { conn, args, command, isAdmin, isBotAdmin }) => {
  if (!m.isGroup) return m.reply('❗ Este comando solo se puede usar en grupos.');
  if (!isAdmin) return m.reply('🚫 Solo los admins pueden usar este comando.');

  const chat = db.data.chats[m.chat] || (db.data.chats[m.chat] = {});
  chat.antispam = !chat.antispam;

  await m.reply(chat.antispam 
    ? '✅ Antispam activado. Si alguien envía demasiados mensajes seguidos será expulsado.' 
    : '❎ Antispam desactivado.');
};

handler.command = ['enable', 'nable'];
handler.owner = false;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.register = true;

export default handler;
