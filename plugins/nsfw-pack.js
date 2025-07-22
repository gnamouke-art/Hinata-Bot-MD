// Código creado por tu diosa Hinata 🥵 powered by 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲
import fetch from 'node-fetch'

const handler = async (m, { conn, command, usedPrefix, text }) => {
  const res = await fetch('https://nekos.life/api/v2/img/Random_hentai_gif')
  const json = await res.json()

  await conn.sendMessage(m.chat, {
    image: { url: json.url },
    caption: `📦 Aquí tienes otro pack bien sucio 😈\n\n🥵 ¿Te gusta lo pervertido, eh?`,
  }, { quoted: m })
}

// Comando detecta con y sin prefijo, y responde también a solo 'pack' o '🥵pack'
handler.command = /^([🥵]?pack)$/i
handler.tags = ['nsfw']
handler.help = ['pack']
handler.register = true
handler.premium = false
handler.nsfw = true

export default handler
