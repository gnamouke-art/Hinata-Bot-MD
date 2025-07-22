let handler = async (m, { conn, usedPrefix, command, args }) => {
  const chat = global.db.data.chats[m.chat];
  if (!chat) throw `❌ Este comando solo puede usarse en grupos.`;

  const setting = args[0]?.toLowerCase();
  if (!setting) {
    throw `⚠️ Debes especificar qué deseas *${command === 'activar' ? 'activ' : 'desactivar'}*.\n\nUso correcto:\n*${usedPrefix + command} welcome*\n*${usedPrefix + command} bye*`;
  }

  const validSettings = ['welcome', 'bye'];
  if (!validSettings.includes(setting)) {
    throw `🚫 Opción inválida.\nSolo puedes cambiar:\n• *welcome*\n• *bye*`;
  }

  const enable = command === 'on';
  chat[setting] = enable;

  m.reply(`✅ La configuración *${setting.toUpperCase()}* ha sido *${enable ? 'activada' : 'desactivada'}* con éxito 😎`);
};

handler.help = ['activar <welcome/bye>', 'desactivar <welcome/bye>'];
handler.tags = ['group', 'config'];
handler.command = /^(activar|desactivar)$/i;
handler.admin = true;
handler.group = true;

export default handler;
