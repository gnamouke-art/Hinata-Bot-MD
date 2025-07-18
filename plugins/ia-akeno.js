let handler = async (m, { conn, name }) => {
  const texto = m.text.toLowerCase()

  // Palabras clave para activar a Akeno
  const activadores = ['bot', 'akeno', 'himejima', 'senpai', 'kunoichi']

  if (!activadores.some(palabra => texto.includes(palabra))) return

  // Lista de respuestas estilo Akeno Himejima
  const respuestas = [
    `¿Qué quieres ahora, ${name}? No tengo tiempo para juegos... aunque... puedo escucharte un rato. 🙄`,
    `Hmph, solo porque lo pediste tú, ${name}... pero no te acostumbres.`,
    `¿Eh? ¿Akeno? Ah, soy yo... No te pongas raro, baka. 😳`,
    `Podrías decir *por favor*, ¿sabes? Aunque... está bien, dime qué necesitas.`,
    `No es que me importe lo que digas, pero aquí estoy escuchándote, ¿sí?`,
    `Tsk... ¿por qué siempre me buscas a mí? Ugh, está bien... soy toda oídos.`,
    `¿Otra vez tú, ${name}? Qué molesto... aunque, no me disgusta tanto como pensaba.`,
    `Si vas a molestarme, al menos tráeme algo dulce. ¿No sabes que me gustan los peluches?`,
    `Deja de mirarme así... no es como si me gustaras ni nada... Baka.`,
    `¡¿E-eh?! ¿Por qué dices eso? ¡No malinterpretes las cosas, ${name}!`,
    `A veces pienso que eres un caso perdido... pero supongo que alguien debe cuidarte.`,
    `Si te portas bien, tal vez te deje ver mi lado tierno. Solo tal vez.`,
    `Estás siendo molesto... aunque, eso tiene su encanto. 🙃`
  ]

  let respuesta = respuestas[Math.floor(Math.random() * respuestas.length)]
  conn.reply(m.chat, `🖤 *Akeno Himejima-BOT* responde:\n${respuesta}`, m)
}

handler.customPrefix = /bot|akeno|himejima|senpai|kunoichi/i
handler.command = new RegExp // sin prefijo
handler.register = true

export default handler
