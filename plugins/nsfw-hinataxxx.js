import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
  let texto = `
🍑 *¡Ay papi!* Ya me calentaste, ven y fóllame como solo tú sabes... 💦

🔞 Aquí tienes una sesión privada con Hinata, solo para ti... ¡disfruta, sucio! 😈💋

*Desarrollado por 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & light Yagami*
  `.trim()

  let media = await fetch('https://api.nekos.dev/api/v3/images/nsfw/img/hinata/')
    .then(res => res.json())
    .then(json => json.data.response.url)

  await conn.sendFile(m.chat, media, 'hinata.jpg', texto, m)
}
handler.command = ['hinataxxx', 'hinataporno', 'hinatahot']
handler.tags = ['nsfw']
handler.help = ['hinataxxx']
handler.premium = false
handler.register = false
handler.limit = 2
handler.level = 0

export default handler
