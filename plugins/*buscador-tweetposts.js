// 🐦 Tweetposts - Akeno-BOT + MayBaileys
// Hecho por Mira 💜 usando @soymaycol/maybailyes

import axios from 'axios';
const {
  proto,
  generateWAMessageFromContent,
  generateWAMessageContent,
} = (await import('@soymaycol/maybailyes')).default;

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const emoji = '🐤';

  if (!text) return conn.reply(
    m.chat,
    `${emoji} *Por favor, dime qué deseas buscar en Twitter~*\n\n✧ Ejemplo:\n${usedPrefix + command} Elon Musk`,
    m
  );

  await m.react('⏳');
  conn.reply(m.chat, '🌸 Akeno está buscando en Twitter... espera unos segundos~', m, {
    contextInfo: {
      externalAdReply: {
        mediaType: 1,
        title: '🐦 ʀᴇꜱᴜʟᴛᴀᴅᴏꜱ ᴅᴇ ᴛᴡɪᴛᴛᴇʀ',
        body: 'Akeno-Himejima BOT',
        previewType: 0,
        thumbnail: avatar,
        sourceUrl: redes
      }
    }
  });

  try {
    const res = await axios.get(`https://apis-may.onrender.com/api/twitter/search?text=${encodeURIComponent(text)}`);
    const results = res.data.result || [];

    if (!results.length) throw new Error('No se encontraron resultados 😿');

    const mini = [];

    for (let i = 0; i < Math.min(6, results.length); i++) {
      const tweet = results[i];
      const user = tweet.user || 'Desconocido';
      const tweetText = tweet.post || 'Sin contenido';
      const avatar = tweet.profile || null;
      const link = tweet.user_link || 'https://twitter.com';

      const caption = `👤 *Usuario:* ${user}\n📝 *Tweet:* ${tweetText}\n🔗 *Link:* ${link}`;

      const imageMsg = await generateWAMessageContent({ image: { url: avatar } }, { upload: conn.waUploadToServer });

      mini.push({
        body: proto.Message.InteractiveMessage.Body.create({ text: null }),
        footer: proto.Message.InteractiveMessage.Footer.create({ text: "🌐 Twitter Search by Akeno" }),
        header: proto.Message.InteractiveMessage.Header.create({
          title: caption,
          hasMediaAttachment: true,
          imageMessage: imageMsg.imageMessage
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ buttons: [] })
      });
    }

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 4 },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({ text: `✨ *Resultados para:* ${text}` }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: "🐦 Powered by @soymaycol/maybailyes" }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.create({ cards: mini })
          })
        }
      }
    }, { quoted: m });

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    await m.react('✅');
  } catch (e) {
    await m.react('❌');
    console.error(e);
    return conn.reply(m.chat, `⚠️ *Akeno no pudo encontrar los tweets...*\n💬 ${e.message}`, m);
  }
};

handler.help = ['tweetposts <texto>'];
handler.tags = ['buscador'];
handler.command = ['tweetposts', 'twsearch'];
handler.register = true;
handler.group = false;

export default handler;
