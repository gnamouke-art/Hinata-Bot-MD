// 🐤 TweetPosts HD por 🐉 NeoTokyo Beats
// 💜 Versión adaptada para Akeno-Himejima-BOT usando Baileys oficial

import axios from 'axios'
import baileys from '@whiskeysockets/baileys'

const {
  proto,
  generateWAMessageContent,
  generateWAMessageFromContent
} = baileys;

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const emoji = '🐦';
  const rwait = '⏳';

  if (!text) {
    return conn.reply(
      m.chat,
      `${emoji} *¿Qué deseas buscar en Twitter, amor?*\n\n📌 Ejemplo:\n${usedPrefix + command} Elon Musk`,
      m
    );
  }

  await m.react(rwait);
  conn.reply(
    m.chat,
    `✨ *Akeno está buscando tus tweets favoritos... espera un momento~*`,
    m
  );

  const createImage = async (url) => {
    const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer });
    return imageMessage;
  };

  try {
    let res = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/Twitter-Posts`, {
      params: { text: encodeURIComponent(text) },
      headers: { 'Content-Type': 'application/json' }
    });

    let data = res.data.result;
    let display = data.slice(0, 6);
    const cards = [];

    for (let tweet of display) {
      let description = `👤 *Usuario:* ${tweet.user}\n📝 *Tweet:* ${tweet.post}\n📎 *Perfil:* ${tweet.profile}\n🔗 *Enlace:* ${tweet.user_link}`;

      cards.push({
        body: proto.Message.InteractiveMessage.Body.create({ text: null }),
        footer: proto.Message.InteractiveMessage.Footer.create({ text: '✨ Twitter - Akeno Search' }),
        header: proto.Message.InteractiveMessage.Header.create({
          title: description,
          hasMediaAttachment: true,
          imageMessage: await createImage(tweet.profile)
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ buttons: [] })
      });
    }

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 4
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `🐤 *Resultados para:* 「 ${text} 」\n⪛✰ Twitter Posts ✰⪜`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '💜 Akeno-Himejima-BOT'
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.create({
              cards
            })
          })
        }
      }
    }, { quoted: m });

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    await m.react("✅");
  } catch (err) {
    console.error(err);
    await m.react("❌");
    conn.reply(m.chat, `⚠️ *Akeno no pudo encontrar los tweets...*\n💬 ${err.message}`, m);
  }
};

handler.help = ['tweetposts <texto>'];
handler.tags = ['buscador'];
handler.command = ['tweetposts'];
handler.register = true;
handler.group = false;

export default handler;
