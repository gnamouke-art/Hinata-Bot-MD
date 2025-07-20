const handler = async (m, { conn, text, participants, isAdmin, isBotAdmin }) => {
  // Verificar si es un grupo
  if (!m.isGroup) {
    return m.reply('❌ Este comando solo puede usarse en grupos, nene~ En privado no puedo hacer travesuras como esta 😏✨');
  }

  const groupMetadata = await conn.groupMetadata(m.chat);
  const groupAdmins = groupMetadata.participants
    .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
    .map(p => p.id);

  // Verificar si el usuario que usó el comando es admin
  if (!isAdmin) {
    return m.reply('💄 Lo siento, nene... este comando es exclusivo para los Admins. ¿O acaso querías que te castigue por travieso?~ 😈💔');
  }

  // Verificar si el bot es admin
  if (!isBotAdmin) {
    return m.reply('❌ Awww~ No tan rápido, amor. Necesito ser Admin para usar este comando. Las travesuras prohibidas solo son para los que tienen autoridad~ 😈💋');
  }

  // Obtener el usuario objetivo
  let target;
  if (m.mentionedJid && m.mentionedJid.length > 0) {
    target = m.mentionedJid[0];
  } else if (m.quoted && m.quoted.sender) {
    target = m.quoted.sender;
  } else if (text) {
    const number = text.replace(/[^0-9]/g, '');
    if (number.length < 5) return m.reply('⚠️ Ese número no parece válido, amor.');
    target = number + '@s.whatsapp.net';
  } else {
    return m.reply('❌ Mmm~ necesito que menciones o respondas a alguien, amor. No puedo lanzar mi castigo al aire~ 💄🔥');
  }

  // Validar si el objetivo está en el grupo
  const isMember = participants.find(p => p.id === target);
  if (!isMember) {
    return m.reply('❌ Hmm... parece que ese usuario no está en nuestro pequeño círculo, amor. No puedo hacer magia con fantasmas~ 💋✨');
  }

  // Verificar que no sea un administrador
  if (groupAdmins.includes(target)) {
    return m.reply('❌ Ay, no tan rápido, cariño~ No puedes expulsar a un administrador... esos están bajo mi protección especial 😈💄');
  }

  try {
    await conn.groupParticipantsUpdate(m.chat, [target], 'remove');
    await conn.sendMessage(m.chat, {
      text: `✅ El usuario @${target.split('@')[0]} ha sido expulsado del grupo por travieso~ 💅✨`,
      mentions: [target],
    }, { quoted: m });
  } catch (err) {
    console.error(err);
    return m.reply(`❌ Ups... algo salió mal al expulsar al usuario: ${err.message}`);
  }
};

// 🛠️ Lista de comandos compatibles con este handler
handler.command = handler.help = ['kick', 'ban', 'v', 'bu', 'expulsar', 'sacar', 'murir'];

export default handler;
  
