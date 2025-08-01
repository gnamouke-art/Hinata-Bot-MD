let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted) return conn.reply(m.chat, `💋 *RESPONDE A UN VIDEO MI CIELO.*\n\n¿Y así quieres magia? 😏`, m, rcanal)

  conn.reply(m.chat, global.wait, m, {
    contextInfo: { 
      externalAdReply: {
        mediaUrl: null,
        mediaType: 1,
        showAdAttribution: true,
        title: "Hinata 𝘽𝙤𝙩 💖",
        body: "🐉 Creado por 𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨 & David Oficial 🐲",
        previewType: 0,
        thumbnail: icons,
        sourceUrl: channel
      }
    }
  })

  const q = m.quoted || m
  let mime = (q.msg || q).mimetype || ''
  if (!/mp4/.test(mime)) return conn.reply(m.chat, `💋 *ESO NO ES UN VIDEO, BEBÉ.*\n\nMándame algo que se mueva, como yo 😏`, m, rcanal)

  await m.react(rwait)
  let media = await q.download()
  let listo = `🍑 *TÓMALO, RICO Y LISTO PARA USAR...*`
  conn.sendMessage(m.chat, { video: media, gifPlayback: true, caption: listo }, { quoted: fkontak })
  await m.react(done)
}

handler.help = ['togifaud']
handler.tags = ['transformador']
handler.command = ['togifaud']
export default handler
