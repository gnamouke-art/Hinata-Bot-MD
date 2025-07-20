import { db, getSubbotConfig } from '../lib/postgres.js'

const linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text, isOwner }) => {
  let quotedText = m.quoted?.text || ""
  let extText = m.quoted?.message?.extendedTextMessage?.text || ""
  let allText = `${quotedText}\n${extText}\n${text}`

  let link = allText.match(linkRegex)?.[0]
  let [_, code] = link ? link.match(linkRegex) : []

  if (!code) throw `
🤔 𝙔 𝙚𝙡 𝙚𝙣𝙡𝙖𝙘𝙚?

📌 *¿Cómo usar el comando?*
Usa: #join <enlace> [tiempo]

- Si no pones tiempo, el bot se une por:
  ◽ 30 minutos (usuarios)
  ◽ 1 día (propietario)

✏️ *Ejemplos:*
- #join https://chat.whatsapp.com/xxxx (por defecto)
- #join https://chat.whatsapp.com/xxxx 60 minuto
- #join https://chat.whatsapp.com/xxxx 2 día
- #join https://chat.whatsapp.com/xxxx 1 mes
`.trim()

  let solicitante = m.sender.split('@')[0]
  const botConfig = await getSubbotConfig(conn.user.id)
  const prestar = botConfig.prestar ?? true

  const timeMatch = text.match(/(\d+)\s*(minuto|hora|día|dias|mes)/i)
  let time = timeMatch ? parseInt(timeMatch[1]) : (isOwner ? 1 : 30)
  let unit = timeMatch ? timeMatch[2].toLowerCase() : (isOwner ? 'día' : 'minuto')

  let timeInMs =
    unit.includes('minuto') ? time * 60 * 1000 :
    unit.includes('hora') ? time * 60 * 60 * 1000 :
    unit.includes('día') || unit.includes('dias') ? time * 24 * 60 * 60 * 1000 :
    unit.includes('mes') ? time * 30 * 24 * 60 * 60 * 1000 : 0

  if (!prestar && !isOwner) {
    await m.reply(`
🔒 𝙎𝙤𝙡𝙞𝙘𝙞𝙩𝙪𝙙 𝙚𝙣𝙫𝙞𝙖𝙙𝙖 𝙖 𝙡𝙖 𝙖𝙙𝙢𝙞𝙣

⚠️ *𝙀𝙨𝙥𝙚𝙧𝙖 𝙖 𝙦𝙪𝙚 𝙚𝙡(𝙡𝙖) 𝙥𝙧𝙤𝙥𝙞𝙚𝙩𝙖𝙧𝙞𝙤(𝙖) 𝙚𝙫𝙖𝙡𝙪́𝙚 𝙩𝙪 𝙚𝙣𝙡𝙖𝙘𝙚.*
`.trim())

    const ownerJid = "573226873710@s.whatsapp.net"
    if (ownerJid !== conn.user.jid) {
      await conn.sendMessage(ownerJid, {
        text: `
⪨ 𝙎𝙊𝙇𝙄𝘾𝙄𝙏𝙐𝘿 𝘿𝙀 𝘽𝙊𝙏 ⪩

👤 𝙎𝙤𝙡𝙞𝙘𝙞𝙩𝙖𝙣𝙩𝙚: wa.me/${m.sender.split('@')[0]}
🔗 𝙀𝙣𝙡𝙖𝙘𝙚: ${link}
⏳ 𝙏𝙞𝙚𝙢𝙥𝙤: ${time} ${unit}${time > 1 ? 's' : ''}

Desarrollado por 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 & light Yagami.
        `.trim(),
        contextInfo: { mentionedJid: [m.sender] }
      })
    }
    return
  }

  if (prestar || isOwner) {
    if (!isOwner) {
      const costPerHour = 100
      const cost = Math.ceil((timeInMs / (60 * 60 * 1000)) * costPerHour)
      let { rows } = await db.query('SELECT limite FROM usuarios WHERE id = $1', [m.sender])
      let limite = rows[0]?.limite ?? 0
      if (limite < cost) return m.reply(`❌ No tienes suficientes diamantes. Necesitas *${cost} diamantes* para usar este comando.`)
      await db.query('UPDATE usuarios SET limite = limite - $1 WHERE id = $2', [cost, m.sender])
      await m.reply(`💎 Se descontaron *${cost} diamantes* de tu cuenta.\n⏳ Espera 3 segundos...`)
    }

    let res
    try {
      res = await conn.groupAcceptInvite(code)
    } catch (e) {
      console.error("❌ Error al unirse al grupo:", e)
      return m.reply("❌ No pude unirme al grupo. Verifica el enlace e inténtalo nuevamente.")
    }

    await new Promise(r => setTimeout(r, 3000))

    let groupMeta = await conn.groupMetadata(res)
    let groupName = groupMeta.subject || "este grupo"

    await conn.sendMessage(res, {
      text: `
🖤 Llegó su diosa *Akeno HIMEJIMA*, la mejor...

👤 Invitada por: @${solicitante}
📜 Para ver el menú: *#menu*

⏳ El bot saldrá automáticamente en:
${time} ${unit}${time > 1 ? 's' : ''}
`.trim(),
      contextInfo: { mentionedJid: [`${solicitante}@s.whatsapp.net`] },
      buttons: [
        {
          buttonId: `.salir`,
          buttonText: { displayText: '❌ Salir del grupo' },
          type: 1
        }
      ],
      footer: 'Desarrollado por 🐉NeoTokyo Beats🐲'
    }, { quoted: m })

    await db.query(
      'INSERT INTO group_settings (group_id, expired) VALUES ($1, $2) ON CONFLICT (group_id) DO UPDATE SET expired = $2',
      [res, Date.now() + timeInMs]
    )

    await m.reply(`✅ ¡Me uní exitosamente al grupo!\nDuración: *${time} ${unit}${time > 1 ? 's' : ''}*`)
  }
}

handler.help = ['join [link] [tiempo]']
handler.tags = ['owner']
handler.command = /^unete|join|nuevogrupo|unir|unite|unirse|entra|entrar$/i
handler.register = true
export default handler
