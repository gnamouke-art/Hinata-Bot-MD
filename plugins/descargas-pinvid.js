import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  const emoji = '📌'
  const rwait = '🕒'
  const done = '✅'
  const error = '⚠️'

  if (!text) 
    return conn.reply(m.chat, `${emoji} Por favor, ingresa el link de un video/imagen de Pinterest.`, m)

  try {
    await conn.sendMessage(m.chat, { react: { text: rwait, key: m.key } })

    let response = await fetch(`https://api.agatz.xyz/api/pinterest?url=${encodeURIComponent(text)}`)

    if (!response.ok) {
      console.log('Error: respuesta no OK de la API', response.status, response.statusText)
      throw new Error(`API respondió con status ${response.status}`)
    }

    let json = await response.json()

    console.log('Respuesta API Pinterest:', JSON.stringify(json, null, 2)) // <-- Esto ayuda a ver qué devuelve

    if (!json.data || !json.data.result) {
      return conn.reply(m.chat, `${error} No se pudo obtener el video/imagen de Pinterest.\nPor favor verifica que el enlace sea válido y público.`, m)
    }

    await conn.sendFile(m.chat, json.data.result, `pinvideobykeni.mp4`, `*${emoji} Url:* ${json.data.url}`, m)
    await conn.sendMessage(m.chat, { react: { text: done, key: m.key } })

  } catch (e) {
    console.error('Error en handler Pinterest:', e)
    await conn.sendMessage(m.chat, { react: { text: error, key: m.key } })
    return conn.reply(m.chat, `${error} Ocurrió un error al descargar el contenido.`, m)
  }
}

handler.help = ['pinvid *<link>*']
handler.tags = ['descargas']
handler.command = ['pinvideo', 'pinvid']
handler.premium = false
handler.group = false
handler.register = true
handler.coin = 2

export default handler
