export const handler = async (m, { conn, args, usedPrefix, command }) => {
  const texto = args.join(' ')
  if (!texto) {
    return conn.reply(
      m.chat,
      `💋 *¿Y el texto, tontito?*\n\n👉 Usa el comando así:\n${usedPrefix + command} <texto que quieras decir>\n\n📌 *Ejemplo:*\n${usedPrefix + command} Hola papi, ¿me extrañaste?`,
      m
    )
  }

  // Reacción de procesando 🔵
  await conn.sendMessage(m.chat, { react: { text: '🔵', key: m.key } })

  try {
    const url = `https://api.siputzx.my.id/api/tools/ttsgoogle?text=${encodeURIComponent(texto)}`
    const res = await fetch(url)

    if (!res.ok) throw '❌ No se pudo obtener el audio.'

    const buffer = await res.arrayBuffer()

    await conn.sendMessage(
      m.chat,
      {
        audio: Buffer.from(buffer),
        mimetype: 'audio/mp4',
        ptt: true
      },
      { quoted: m }
    )

    // Reacción de éxito 🟢
    await conn.sendMessage(m.chat, { react: { text: '🟢', key: m.key } })

  } catch (e) {
    console.error(e)
    // Reacción de error 🔴
    await conn.sendMessage(m.chat, { react: { text: '🔴', key: m.key } })
    conn.reply(
      m.chat,
      '❌ *Ay no... fallé como perra y como bot.*\nIntenta otra vez más tarde 💔',
      m
    )
  }
}

handler.help = ['tts <texto>']
handler.tags = ['herramientas']
handler.command = /^tts$/i

export default handler
