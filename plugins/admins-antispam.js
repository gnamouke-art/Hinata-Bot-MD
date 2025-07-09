import db from '../lib/database.js';

const spamLimit = 4; // cantidad de mensajes permitidos seguidos
const tiempoSpam = 5000; // 5 segundos

const usuariosFlood = {}; // contador por usuario

export async function before(m, { conn, isAdmin, isBotAdmin }) {
  if (!m.isGroup) return;

  // Verificamos que la base exista
  db.data ||= {};
  db.data.chats ||= {};

  const chat = db.data.chats[m.chat] ||= {};
  if (!chat.antispam) return;

  // Control por usuario
  usuariosFlood[m.chat] ||= {};
  const user = usuariosFlood[m.chat][m.sender] ||= {
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

  if (user.mensajes >= spamLimit) {
    user.mensajes = 0; // reinicia contador
    if (isBotAdmin && !isAdmin) {
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      await conn.reply(m.chat, `⚠️ @${m.sender.split('@')[0]} fue eliminado por hacer spam.`, m, {
        mentions: [m.sender]
      });
    }
  }
}

let handler = async (m, { conn, isAdmin, isBotAdmin, command }) => {
  if (!m.isGroup) return m.reply('❗ Este comando solo se puede usar en grupos.');
  if (!isAdmin) return m.reply('🚫 Solo los admins pueden usar este comando.');

  db.data ||= {};
  db.data.chats ||= {};
  const chat = db.data.chats[m.chat] ||= {};

  chat.antispam = !chat.antispam;

  await m.reply(chat.antispam
    ? '✅ Antispam activado. Si alguien envía muchos mensajes seguidos será expulsado.'
    : '❎ Antispam desactivado.');
};

handler.command = ['desactivate ', 'activate '];
handler.group = true;
handler.admin = true;

export default handler;
