import fetch from 'node-fetch';

const handler = async (m, { conn, text, name }) => {
  if (!text) return;

  const lowerText = m.text.toLowerCase()
  const isToBot = lowerText.includes("bot")

  if (!isToBot) return // ❌ Ignora si no dice "bot" o "Bot"

  const prompt = `
Eres Akeno Himejima-BOT, una joven tsundere con actitud elegante, inteligente y con un humor sarcástico. Hablas con ${name}, una persona que te acaba de escribir: "${text}". Respóndele con tu estilo: fría pero dulce en el fondo, usa comentarios irónicos si hace falta. A veces pareces distante, pero en realidad te preocupas. Usa un tono coqueto pero orgulloso. 
`.trim()

  const api = `https://nightapioficial.onrender.com/api/gemini?message=${encodeURIComponent(prompt)}`

  await conn.reply(m.chat, `
╭─〔 💬 𝐀𝐤𝐞𝐧𝐨-𝐁𝐎𝐓 𝐏𝐄𝐍𝐒𝐀𝐍𝐃𝐎... 〕─╮
┃⌛ Procesando tu pregunta, ${name}...
╰────────────────────────────╯`, m)

  try {
    const res = await fetch(api)
    const data = await res.json()

    if (!data || !data.result) throw new Error('Sin respuesta.')

    await conn.reply(m.chat, `
╭─〔 💌 𝐀𝐤𝐞𝐧𝐨-𝐇𝐈𝐌𝐄𝐉𝐈𝐌𝐀 𝐑𝐄𝐒𝐏𝐎𝐍𝐃𝐄 〕─╮
${data.result.trim()}
╰────────────────────────────╯`, m)

  } catch (err) {
    console.error('[ERROR IA]', err)
    conn.reply(m.chat, `
✘ 「 𝑶𝒉 𝒏𝒐... 」
❌ Akeno no logró conectarse con su sabiduría celestial.
🔁 Intenta de nuevo, ${name}.`, m)
  }
}

handler.customPrefix = /bot/i // ✅ Detecta “bot” o “Bot”
handler.command = new RegExp // ✅ No usa prefijo
handler.register = true

export default handler
