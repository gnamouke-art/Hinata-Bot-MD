let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted) {
    return conn.reply(m.chat, `💋 *Bebé...* responde a un *video* para convertirlo en gif con audio 😈\n\nEjemplo:\n1. Manda un video 📹\n2. Responde con *.${command}* y déjame hacer mi magia ✨`, m)
  }

  conn.reply(m.chat, `⏳ *Espera chiquito...* Estoy convirtiendo tu videíto en un sexy gif 🔥`, m, {
    contextInfo: {
      externalAdReply: {
        mediaUrl: null,
        mediaType: 1,
        showAdAttribution: true,
        title: packname,
        body: dev,
        previewType: 0,
        thumbnail: icons,
        sourceUrl: channel
      }
    }
  })

  const q = m.quoted || m
  let mime = (q.msg || q).mimetype || ''
  if (!/mp4/.test(mime)) {
    return conn.reply(m.chat, `🚫 *Eso no es un video, amor...*\nResponde correctamente a un *video corto* para que lo convierta en gif 💞`, m)
  }

  await m.react(rwait)

  let media = await q.download()
  let caption = `💖 *Listo bebé, aquí tienes tu gif sexy con audio.*\n_¿Te gustó? 😘_`

  conn.sendMessage(m.chat, { video: media, gifPlayback: true, caption }, { quoted: fkontak })
  
  await m.react(done)
}

handler.help = ['togifaud']
handler.tags = ['transformador']
handler.command = ['togifaud']
export default handler
