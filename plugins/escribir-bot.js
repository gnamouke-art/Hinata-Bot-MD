let handler = async (m, { conn }) => {
  const botOficial = '5217226982487@s.whatsapp.net'; // Tu número como bot oficial

  try {
    // Verifica si el bot oficial está en el grupo
    let participants = await conn.groupMetadata(m.chat);
    let esta = participants.participants.some(p => p.id === botOficial);

    if (!esta) {
      return conn.reply(m.chat, '⚠️ El bot oficial no está en este grupo.');
    }

    // Intenta abrir el grupo
    await conn.groupSettingUpdate(m.chat, 'not_announcement'); // Quita solo admin
    await conn.sendMessage(m.chat, { text: '✅ Hinata Bot ya puede escribir libremente en este grupo.' });
  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, '❌ No pude abrir el grupo. ¿Soy admin? Verifícalo.');
  }
};

handler.command = /^activarbot|escribebot|permitirbot$/i;
handler.group = true;
handler.admin = true;

export default handler;
