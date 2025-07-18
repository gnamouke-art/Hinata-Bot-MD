let handler = async (m, { conn, text, name }) => {
  // No responderse a sí mismo
  if (m.sender === (conn.user && conn.user.jid)) return

  // Si no hay texto, no responde
  if (!text) return

  // Opcional: puedes hacer que responda a TODO texto o solo si contiene ciertas palabras
  // Para responder a cualquier texto, elimina esta línea:
  // const activadores = ['hola', 'akeno', 'bot', 'qué', 'cómo', 'cuándo']
  // if (!activadores.some(palabra => text.toLowerCase().includes(palabra))) return

  // Respuestas estilo Akeno Himejima, con toque tsundere y mencionando al usuario
  const respuestas = [
    `¿Qué quieres, ${name}? No es como si me importara, baka...`,
    `Hmm, ${name}, no te pongas muy cómodo, solo te escucho por ahora.`,
    `No es que quiera hablar contigo, pero... ¿qué quieres?`,
    `Si vas a molestarme, al menos hazlo rápido, ${name}.`,
    `Tsk... ¿acaso no tienes nada mejor que hacer? Pero dime, ¿qué pasa?`,
    `No es que me guste, pero eres interesante, ${name}.`,
    `¡¿Eh?! No malinterpretes las cosas, ${name}! Solo respondo porque debo.`,
    `Pfff, ¡qué pesado eres, ${name}! Pero bueno, habla rápido.`,
    `Si quieres mi atención, tendrás que esforzarte un poco más, ${name}.`,
    `Solo porque me lo pides tú, ${name}, aquí estoy... no te acostumbres.`,
    `¡Deja de mirarme así! No es que me gustes, baka...`,
    `A veces me pregunto por qué te aguanto, pero supongo que tienes tu encanto, ${name}.`
  ]

  // Elegir respuesta aleatoria
  const respuesta = respuestas[Math.floor(Math.random() * respuestas.length)]

  // Responder
  await conn.reply(m.chat, `🖤 *Akeno Himejima-BOT* dice:\n${respuesta}`, m)
}

handler.customPrefix = /.*/  // cualquier texto activa el handler
handler.command = new RegExp() // sin prefijo
handler.register = true

export default handler
