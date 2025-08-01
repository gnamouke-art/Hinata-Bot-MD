export const handler = async (m, { conn, args, usedPrefix, command }) => {
  const texto = args.join(' ')
  if (!texto) {
    return conn.reply(
      m.chat,
      `✳️ *Uso correcto:*\n${usedPrefix + command} <texto>\n\n📌 *Ejemplo:*\n${usedPrefix + command} Hola, ¿cómo estás?`,
      m
    )
  }

  // Reacción de inicio
  await conn.sendMessage(m.chat, { react: { text: '🔵', key: m.key } })

  try {
    const url = `https://api.siputzx.my.id/api/tools/ttsgoogle?text=${encodeURIComponent(texto)}`
    const res = await fetch(url)

    if (!res.ok) throw '❌ Error al generar el audio.'

    const buffer = await res.arrayBuffer()
    const audio = Buffer.from(buffer)

    await conn.sendMessage(
      m.chat,
      {
        audio,
        mimetype: 'audio/ogg; codecs=opus',
        ptt: true
      },
      { quoted: m }
    )

    await conn.sendMessage(m.chat, { react: { text: '🟢', key: m.key } })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { react: { text: '🔴', key: m.key } })
    conn.reply(m.chat, '❌ No se pudo generar el audio. Asegúrate de que el texto no sea muy largo.', m)
  }
}

handler.help = ['tts <texto>']
handler.tags = ['herramientas']
handler.command = /^tts$/i
export default handler
