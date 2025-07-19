import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  // Defino los emojis y variables primero
  const emoji = '📌'
  const rwait = '🕒'
  const done = '✅'
  const error = '⚠️'

  if (!text) 
    return conn.reply(m.chat, `${emoji} Por favor, ingresa el link de un video/imagen de Pinterest.`, m)

  try {
    await conn.sendMessage(m.chat, { react: { text: rwait, key: m.key } })

    let response = await fetch(`https://api.agatz.xyz/api/pinterest?url=${encodeURIComponent(text)}`)
    if (!response.ok) throw new Error('Error en la API')

    let json = await response.json()
    if (!json.data || !json.data.result)
      return conn.reply(m.chat, `${error} No se pudo obtener el video/imagen de Pinterest.`, m)

    await conn.sendFile(m.chat, json.data.result, `pinvideobykeni.mp4`, `*${emoji} Url:* ${json.data.url}`, m)
    await conn.sendMessage(m.chat, { react: { text: done, key: m.key } })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { react: { text: error, key: m.key } })
    return conn.reply(m.chat, `${error} Ocurrió un error al descargar el contenido.`, m)
  }
}

handler.help = ['pinvid *<link>*']
handler.tags = ['descargas']
handler.command = ['pinvideo', 'pinvid']
handler.premium = false
handler.group = true
handler.register = true
handler.coin = 2

export default handler
