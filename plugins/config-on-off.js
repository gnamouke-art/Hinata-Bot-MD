let handler = async (m, { conn, command, args, usedPrefix }) => {
  const chat = global.db.data.chats[m.chat];
  if (!m.isGroup) throw `❌ Este comando solo puede usarse en grupos.`;

  if (!args.length) {
    throw `⚠️ Debes escribir qué deseas *${command === 'activate' ? 'activar' : 'desactivar'}*.\n\nEjemplos:\n${usedPrefix + command} welcome\n${usedPrefix + command} welcome bye`;
  }

  const valid = ['welcome', 'bye'];
  const input = args.map(a => a.toLowerCase()).filter(v => valid.includes(v));
  if (!input.length) {
    throw `❌ Opciones inválidas.\nSolo puedes modificar:\n• *welcome*\n• *bye*`;
  }

  const enable = /activate/i.test(command);
  input.forEach(opt => chat[opt] = enable);

  let estados = input.map(v => `*${v.toUpperCase()}* ➜ ${enable ? '✅ Activado' : '❌ Desactivado'}`).join('\n');
  m.reply(`📢 Configuración actualizada:\n${estados}`);
};

handler.help = ['activate <welcome/bye>', 'desactivate <welcome/bye>'];
handler.tags = ['group', 'config'];
handler.command = /^([.]?|)(activate|desactivate)$/i;
handler.admin = true;
handler.group = true;

export default handler;
