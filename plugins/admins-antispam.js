import db from '../lib/database.js';

let handler = async (m, { args, command, isAdmin }) => {
  if (!m.isGroup) return m.reply('❗ Este comando solo se puede usar en grupos.');
  if (!isAdmin) return m.reply('🚫 Solo los administradores pueden usar este comando.');

  db.data ||= {};
  db.data.chats ||= {};
  const chat = db.data.chats[m.chat] ||= {};

  const opcion = (args[0] || '').toLowerCase();

  if (command === 'activa' && opcion === 'antispam') {
    chat.antispam = true;
    return m.reply('✅ Función V2 activada: el sistema antispam está activo.');
  }

  if (command === 'desactivarr') {
    chat.antispam = false;
    return m.reply('❎ Sistema antispam desactivado.');
  }

  // Si escriben solo `.activa` sin "antispam"
  if (command === 'activa') {
    return m.reply('📌 Usa *.activa antispam* para activar el sistema antispam.');
  }
};

handler.command = ['activa', 'desactivarr'];
handler.help = ['activa antispam', 'desactivarr'];
handler.tags = ['admin'];
handler.group = true;
handler.admin = true;

export default handler;
