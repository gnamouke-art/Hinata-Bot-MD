import db from '../lib/database.js';

let handler = async (m, { text, args, command, isAdmin, isBotAdmin, isOwner }) => {
  if (!m.isGroup) return m.reply('❗ Este comando solo se puede usar en grupos.');
  if (!isAdmin) return m.reply('🚫 Solo los administradores pueden usar este comando.');

  db.data ||= {};
  db.data.chats ||= {};
  const chat = db.data.chats[m.chat] ||= {};

  const opcion = (args[0] || '').toLowerCase();

  if (command === 'activate' && opcion === 'antispam') {
    chat.antispam = true;
    return m.reply('✅ Función V2 activada: el sistema antispam está activo.');
  }

  if (command === 'desactivate' && opcion === 'antispam') {
    chat.antispam = false;
    return m.reply('❎ Sistema antispam desactivado.');
  }

  // Si escriben solo .activate o .desactivate sin "antispam"
  if (command === 'activate') {
    return m.reply('📌 Usa `.activate antispam` para activar que no hagan spam en el grupo.');
  }

  if (command === 'desactivate') {
    return m.reply('📌 Usa `.desactivate antispam` para desactivar el sistema antispam.');
  }
};

handler.command = ['activate', 'desactivate'];
handler.group = true;
handler.admin = true;
handler.botAdmin = false;

export default handler;
