const handler = async (m, { conn, text, participants, isAdmin, isBotAdmin }) => {
  if (!m.isGroup) {
    return m.reply('👠 *¡Error, amor!* Este comando solo funciona en grupos~\n\nEn privado no puedo mostrar mi lado malvado 😈💋');
  }

  const groupMetadata = await conn.groupMetadata(m.chat);
  const groupAdmins = groupMetadata.participants
    .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
    .map(p => p.id);

  if (!isAdmin) {
    return m.reply('💅 *¡Aún no eres digno!* Solo los *Admins sensuales* pueden invocar mi lado oscuro 💄✨\n\n¿O acaso quieres que te castigue por intentar usar mis poderes sin permiso? 😈🔞');
  }

  if (!isBotAdmin) {
    return m.reply('👑 *¡Reina sin corona!* Necesito ser *admin* para desplegar mi venganza divina 💔\n\nHazme reina y verás cómo los traidores *vuelan* 😏🔥');
  }

  // Obtener el usuario objetivo
  let target;
  if (m.mentionedJid && m.mentionedJid.length > 0) {
    target = m.mentionedJid[0];
  } else if (m.quoted && m.quoted.sender) {
    target = m.quoted.sender;
  } else if (text) {
    const number = text.replace(/[^0-9]/g, '');
    if (number.length < 5) return m.reply('🚫 *Ese número está más chueco que tus intenciones, amor~*');
    target = number + '@s.whatsapp.net';
  } else {
    return m.reply('📌 *Mención o respuesta, nene~*\n\nNecesito saber a *quién voy a eliminar con estilo*, no soy adivina 💋');
  }

  // Validar si el objetivo está en el grupo
  const isMember = participants.find(p => p.id === target);
  if (!isMember) {
    return m.reply('🌀 *No puedo castigar a quien no existe, cielito~*\nEse usuario no está en el grupo, y yo no hago magia negra con fantasmas 😜✨');
  }

  // Verificar que no sea admin
  if (groupAdmins.includes(target)) {
    return m.reply('🚫 *Alto ahí, gatito~*\nEse usuario es un admin, y está bajo mi protección... por ahora 😈💖');
  }

  try {
    // Texto dramático de Hinata malvada
    await conn.sendMessage(m.chat, {
      text: `💄 *"Hinata ha despertado su lado oscuro..."* 👠\n\n👋 @${target.split('@')[0]}...\n💬 *Tus pecados no serán perdonados.*\n\n🧹✨ ¡Que se largue esta rata!`,
      mentions: [target]
    }, { quoted: m });

    // Audio malvado (puedes reemplazarlo con uno más "Hinata" si quieres)
    await conn.sendMessage(m.chat, {
      audio: { url: 'https://n.uguu.se/CfuenqXz.mp3' },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: m });

    await delay(2000);

    await conn.groupParticipantsUpdate(m.chat, [target], 'remove');
  } catch (err) {
    console.error(err);
    return m.reply(`⚠️ *Oops... algo salió mal expulsando a la víctima:*\n${err.message}`);
  }
};

handler.command = handler.help = ['kick', 'ban', 'expulsar', 'sacar', 'desaparecer', 'fuera', 'v'];

handler.group = true;
handler.botAdmin = true;
handler.admin = true;
handler.register = true;

export default handler;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
