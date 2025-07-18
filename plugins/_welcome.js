import { WAMessageStubType } from '@whiskeysockets/baileys'; // Asegúrate de importar correctamente
import fetch from 'node-fetch'; // Para obtener imágenes de perfil

export async function before(m, { conn, groupMetadata }) {
  // Verificar si el mensaje es un evento de grupo y si es de tipo bienvenida (27) o despedida (28, 32)
  if (!m.messageStubType || !m.isGroup) return;

  // Obtener la foto de perfil del usuario
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://files.catbox.moe/rblv23.jpg');
  let img = await (await fetch(pp)).buffer();

  // Obtener el nombre del usuario
  let usuario = `@${m.messageStubParameters[0].split('@')[0]}`;

  // Obtener metadatos del grupo
  let subject = groupMetadata.subject; // Nombre del grupo
  let descs = groupMetadata.desc || "*Descripción predeterminada del grupo*"; // Descripción del grupo

  // Mensaje de bienvenida personalizado
  if (m.messageStubType == 27) { // Evento de entrada al grupo
    let textWel = `
┏━━━━━❖━━━✦━━━❖━━━━━┓
┃  💗 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎/𝐀 ✨
┗━━━━━❖━━━✦━━━❖━━━━━┛
╔═════════════════════════════╗
💗 Hola ${usuario}~
🌷 Bienvenido/a a *『${subject}』*

🫶 Aquí solo hay:
– 𝐏𝐚𝐳 𝐄𝐧𝐭𝐫𝐞 𝐀𝐦𝐢𝐠𝐨𝐬   
– 𝐂𝐚𝐨𝐬 𝐄𝐧𝐭𝐫𝐞 𝐀𝐦𝐢𝐠𝐨𝐬 
– 𝐋𝐚 𝐌𝐞𝐣𝐨𝐫 𝐁𝐨𝐭 𝐐𝐮𝐞 𝐇𝐚𝐲

💬 𝐄𝐬𝐜𝐫𝐢𝐛𝐞  *#menu* 𝐏𝐚𝐫𝐚 𝐕𝐞𝐫 𝐋𝐚 𝐋𝐢𝐬𝐭𝐚 𝐃𝐞 𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬 

📌 𝐋𝐞𝐞 𝐥𝐚 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧 𝐎𝐢𝐬𝐭𝐞 𝐉𝐞𝐣𝐞 
> ${descs}

❤️ 𝐃𝐢𝐬𝐟𝐫𝐮𝐭𝐚 𝐃𝐞𝐥 𝐆𝐫𝐮𝐩𝐨 𝐄𝐬𝐩𝐞𝐫𝐨 𝐪𝐮𝐞 𝐭𝐞 𝐠𝐮𝐬𝐭𝐞 
╚══════════════════════════════╝`;

    await conn.sendMessage(m.chat, {
      image: img, // Envía la foto de perfil del usuario
      caption: textWel,
      mentions: [m.sender, m.messageStubParameters[0]] // Menciona al usuario
    });
  }

  // Mensaje de despedida personalizado
  else if (m.messageStubType == 32 ) { // Evento de salida del grupo
    let textBye = `
┏━━━━━❖━━━✦━━━❖━━━━━┓
┃🕊️ 𝐒𝐄 𝐅𝐔𝐄 𝐔𝐍 𝐌𝐈𝐄𝐌𝐁𝐑𝐎 🕊️
┗━━━━━❖━━━✦━━━❖━━━━━┛
╔══════════════════════════════╗
𝐀𝐝𝐢𝐨𝐬 𝐁𝐫𝐨𝐭 ${usuario}...

🕊️ 𝐂𝐮𝐢𝐝𝐚𝐭𝐞 😇 
✨ 𝐄𝐥 𝐠𝐫𝐮𝐩𝐨 𝐞𝐬𝐭𝐚𝐫𝐚 𝐦𝐞𝐣𝐨𝐫 𝐬𝐢𝐧 𝐭𝐢 𝐜𝐫𝐞𝐨 𝐱𝐝 
╚══════════════════════════════╝`;

    await conn.sendMessage(m.chat, {
      image: img, // Envía la foto de perfil del usuario
      caption: textBye,
      mentions: [m.sender, m.messageStubParameters[0]] // Menciona al usuario
    });
  }
  else if (m.messageStubType == 28 ) { // Evento de expulsión del grupo
    let textBan = `
┏━━━━━❖━━━✦━━━❖━━━━━┓
┃⛔ 𝐄𝐗𝐏𝐔𝐋𝐒𝐀𝐃𝐎 𝐃𝐄𝐋 𝐆𝐑𝐔𝐏𝐎 ⛔
┗━━━━━❖━━━✦━━━❖━━━━━┛
╔════════════════════════════════════════╗
${usuario} 𝐅𝐮𝐞 𝐄𝐱𝐩𝐮𝐥𝐬𝐚𝐝𝐨 𝐀𝐡𝐬 𝐏𝐨𝐫 𝐌𝐦𝐠𝐯

🥀 𝐍𝐮𝐧𝐜𝐚 𝐓𝐞 𝐐𝐮𝐢𝐬𝐢𝐦𝐨𝐬 𝐀𝐪𝐮𝐢 
🚪 𝐍𝐨 𝐓𝐞 𝐐𝐮𝐞𝐫𝐞𝐦𝐨𝐬 𝐌𝐚𝐬 𝐎𝐡 𝐓𝐞 𝐦𝐚𝐧𝐝𝐚𝐦𝐨𝐬 𝐩𝐚𝐫𝐚 𝐬𝐨𝐩𝐨𝐫𝐭𝐞 𝐱𝐃

✨ 𝐏𝐨𝐫𝐟𝐢𝐧 𝐡𝐚𝐲 𝐩𝐚𝐳 𝐀 𝐃𝐢𝐬𝐟𝐫𝐮𝐭𝐚𝐫 ⭐
╚════════════════════════════════════════╝`;
    await conn.sendMessage(m.chat, {
      image: img, // Envía la foto de perfil del usuario
      caption: textBan,
      mentions: [m.sender, m.messageStubParameters[0]] // Menciona al usuario
    });

  }
}
