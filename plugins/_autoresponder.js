let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
  const chat = global.db.data.chats[m.chat] || {};
  const isEnable = /true|on|encender|activar|enable|1/i.test(args[0]);
  const isDisable = /false|off|apagar|desactivar|disable|0/i.test(args[0]);

  if (!isOwner) return m.reply('⚠️ Este comando es exclusivo para mi papi owner.');

  if (args.length === 0) {
    let estado = chat.autoresponder ? '✅ *ACTIVADO*' : '❌ *DESACTIVADO*';
    return m.reply(`🤖 *Modo autorespuesta:*\nEstado actual: ${estado}\n\nUsa:\n*.autoresponder on* para activar\n*.autoresponder off* para desactivar`);
  }

  if (isEnable) {
    chat.autoresponder = true;
    return m.reply('✅ *Modo autoresponder activado correctamente!*');
  } else if (isDisable) {
    chat.autoresponder = false;
    return m.reply('❌ *Modo autoresponder desactivado correctamente!*');
  } else {
    return m.reply('⚠️ Opción no válida. Usa:\n*.autoresponder on* o *.autoresponder off*');
  }
};

handler.command = /^autoresponder$/i;
handler.owner = true;

export default handler;
