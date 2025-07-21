import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return;

  const chat = global.db.data.chats[m.chat] || {};
  const isWelcomeOn = chat.welcome;
  const isByeOn = chat.bye;

  // Obtener imagen de perfil
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://files.catbox.moe/rblv23.jpg');
  let img = await (await fetch(pp)).buffer();
  let usuario = `@${m.messageStubParameters[0].split('@')[0]}`;
  let subject = groupMetadata.subject;
  let descs = groupMetadata.desc || "*Sin descripción del grupo*";

  if (m.messageStubType == 27 && isWelcomeOn) {
    // BIENVENIDA
    let textWel = `
┏━━━━━❖━━━✦━━━❖━━━━━┓
┃ 💗 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎/𝐀 ✨
┗━━━━━❖━━━✦━━━❖━━━━━┛
╔═════════════════════════════╗
💗 Hola ${usuario}~
🌷 Bienvenido/a a *『${subject}』*

🫶 Aquí solo hay:
– 𝐏𝐚𝐳 𝐄𝐧𝐭𝐫𝐞 𝐀𝐦𝐢𝐠𝐨𝐬   
– 𝐂𝐚𝐨𝐬 𝐄𝐧𝐭𝐫𝐞 𝐀𝐦𝐢𝐠𝐨𝐬 
– 𝐋𝐚 𝐌𝐞𝐣𝐨𝐫 𝐁𝐨𝐭 𝐐𝐮𝐞 𝐇𝐚𝐲

💬 𝐄𝐬𝐜𝐫𝐢𝐛𝐞  *#menu* 𝐩𝐚𝐫𝐚 𝐯𝐞𝐫 𝐥𝐨𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬

📌 𝐋𝐞𝐞 𝐥𝐚 𝐝𝐞𝐬𝐜𝐫𝐢𝐩𝐜𝐢𝐨𝐧 
> ${descs}

❤️ 𝐃𝐢𝐬𝐟𝐫𝐮𝐭𝐚 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐨 😘
╚══════════════════════════════╝`;

    await conn.sendMessage(m.chat, {
      image: img,
      caption: textWel,
      mentions: [m.sender, m.messageStubParameters[0]]
    });

  } else if (m.messageStubType == 32 && isByeOn) {
    // SALIDA VOLUNTARIA
    let textBye = `
┏━━━━━❖━━━✦━━━❖━━━━━┓
┃ 🕊️ 𝐒𝐄 𝐅𝐔𝐄 𝐔𝐍 𝐌𝐈𝐄𝐌𝐁𝐑𝐎 🕊️
┗━━━━━❖━━━✦━━━❖━━━━━┛
╔══════════════════════════════╗
𝐀𝐝𝐢𝐨𝐬 𝐛𝐫𝐨𝐭 ${usuario}...

🕊️ 𝐂𝐮𝐢𝐝𝐚𝐭𝐞 😇 
✨ 𝐄𝐥 𝐠𝐫𝐮𝐩𝐨 𝐞𝐬𝐭𝐚𝐫𝐚 𝐦𝐞𝐣𝐨𝐫 𝐬𝐢𝐧 𝐭𝐢 😹
╚══════════════════════════════╝`;

    await conn.sendMessage(m.chat, {
      image: img,
      caption: textBye,
      mentions: [m.sender, m.messageStubParameters[0]]
    });

  } else if (m.messageStubType == 28 && isByeOn) {
    // EXPULSIÓN
    let textBan = `
┏━━━━━❖━━━✦━━━❖━━━━━┓
┃ ⛔ 𝐄𝐗𝐏𝐔𝐋𝐒𝐀𝐃𝐎 ⛔
┗━━━━━❖━━━✦━━━❖━━━━━┛
╔════════════════════════════════════════╗
${usuario} 𝐟𝐮𝐞 𝐞𝐱𝐩𝐮𝐥𝐬𝐚𝐝𝐨 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐨.

🥀 𝐍𝐮𝐧𝐜𝐚 𝐭𝐞 𝐪𝐮𝐢𝐬𝐢𝐦𝐨𝐬 𝐚𝐪𝐮𝐢 😌
🚪 𝐃𝐞𝐬𝐩𝐢𝐞𝐫𝐭𝐚𝐭𝐞 𝐩𝐚𝐫𝐚 𝐬𝐨𝐩𝐨𝐫𝐭𝐞 xD

✨ 𝐏𝐚𝐳 𝐫𝐞𝐬𝐭𝐚𝐮𝐫𝐚𝐝𝐚 ⭐
╚════════════════════════════════════════╝`;

    await conn.sendMessage(m.chat, {
      image: img,
      caption: textBan,
      mentions: [m.sender, m.messageStubParameters[0]]
    });
  }
      }
