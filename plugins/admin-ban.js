let handler = async (m, { conn }) => {
  const despedida = `🧹 *Adiós rats, ya no te queremos aquí.* 😤👋`
  const audioURL = 'https://n.uguu.se/CfuenqXz.mp3'

  if (!m.mentionedJid[0] && !m.quoted) {
    let texto = `👀 ¿A quién saco volando? Etiqueta con *@usuario* o responde a un mensaje, burro sin mecate 🐴`
    return m.reply(texto, m.chat, { mentions: conn.parseMention(texto) })
  }

  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender

  await conn.sendMessage(m.chat, {
    text: despedida,
    mentions: [user]
  }, { quoted: m })

  await conn.sendMessage(m.chat, {
    audio: { url: audioURL },
    mimetype: 'audio/mp4',
    ptt: true
  }, { quoted: m })

  await delay(2000)

  await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
}

handler.help = ['kick *@usuario*']
handler.tags = ['group']
handler.command = ['kick', 'expulsar']
handler.admin = true
handler.group = true
handler.botAdmin = true
handler.register = true

export default handler

const delay = ms => new Promise(res => setTimeout(res, ms))
