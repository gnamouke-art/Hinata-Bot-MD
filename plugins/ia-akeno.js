import fetch from 'node-fetch'

let handler = async (m, { text, conn }) => {
  if (!text) return conn.reply(m.chat, `💭 *¿Qué deseas preguntarme, darling?*\nEscribe algo como:\n*.akeno quién te creó*`, m)

  const name = conn.getName(m.sender)
  const url = 'https://raw.githubusercontent.com/TOKIO5025/Hinata-chat/refs/heads/main/akeno-himejina-BOT-test.text'

  try {
    let res = await fetch(url)
    if (!res.ok) throw `⚠️ No se pudo obtener el archivo remoto.`
    let raw = await res.text()

    let lineas = raw.split('\n').filter(Boolean)
    let respuestas = {}

    for (let linea of lineas) {
      let [clave, respuesta] = linea.split('||')
      if (clave && respuesta) respuestas[clave.trim().toLowerCase()] = respuesta.trim()
    }

    // Buscar coincidencias (por palabra clave)
    let clave = Object.keys(respuestas).find(k => text.toLowerCase().includes(k))
    if (!clave) return conn.reply(m.chat, `🤔 No entendí tu mensaje, ${name}. Intenta con otra pregunta...`, m)

    let respuesta = respuestas[clave].replace(/\${name}/g, name)
    conn.reply(m.chat, `💬 𝐀𝐤𝐞𝐧𝐨 𝐇𝐢𝐦𝐞𝐣𝐢𝐦𝐚 𝐝𝐢𝐜𝐞:\n\n${respuesta}`, m)

  } catch (err) {
    console.error(err)
    conn.reply(m.chat, '⚠️ Error al leer el archivo. Intenta más tarde.', m)
  }
}

handler.help = ['akeno <pregunta>']
handler.tags = ['ai', 'fun']
handler.command = ['akeno', 'akenochat']

export default handler
