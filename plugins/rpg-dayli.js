const cooldowns = {}

const handler = async (m) => {
  const user = global.db.data.users[m.sender]
  const isOwner = m.sender === '50248019799@s.whatsapp.net'
  const tiempoEspera = 24 * 60 * 60 * 1000 // 24 horas en milisegundos

  if (!isOwner) {
    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera) {
      const tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera - Date.now()) / 1000))
      return m.reply(`🌙 *Has reclamado tu recompensa diaria recientemente.*\n🕒 *Vuelve en:* ${tiempoRestante}`)
    }
    cooldowns[m.sender] = Date.now()
  }

  const dulces = 20
  user.limit += dulces

  const texto = `
┏━━━━━🌟 𝐂𝐋𝐀𝐈𝐌 𝐃𝐈𝐀𝐑𝐈𝐎 🌟━━━━┓
┃🎉 𝑭𝒆𝒍𝒊𝒄𝒊𝒅𝒂𝒅𝒆𝒔 ${isOwner ? '𝒎𝒊 𝒄𝒓𝒆𝒂𝒅𝒐𝒓 🐲' : ''}!!
┃🍬 𝑯𝒂𝒔 𝒓𝒆𝒄𝒍𝒂𝒎𝒂𝒅𝒐: *${dulces}* 𝐃𝐮𝐥𝐜𝐞𝐬
┃🗓️ 𝑹𝒆𝒄𝒍𝒂𝒎𝒂 𝒖𝒏𝒂 𝒗𝒆𝒛 𝒂𝒍 𝒅𝒊́𝒂!
┗━━━━━━━━━━━━━━━━━━━━┛

👑 *𝐁𝐨𝐭:* 𝑵𝒆𝒐𝑻𝒐𝒌𝒚𝒐 𝑩𝒆𝒂𝒕𝒔™
✨ *𝐃𝐞𝐬𝐚𝐫𝐫𝐨𝐥𝐥𝐚𝐝𝐨 𝐩𝐨𝐫:* 𝑳𝒊𝒈𝒉𝒕 𝒀𝒂𝒈𝒂𝒎𝒊
  `.trim()

  await m.reply(texto)
}

handler.help = ['claim']
handler.tags = ['rpg']
handler.command = ['daily', 'claim']
handler.register = false

export default handler

function segundosAHMS(segundos) {
  const horas = Math.floor(segundos / 3600)
  const minutos = Math.floor((segundos % 3600) / 60)
  const segundosRestantes = segundos % 60
  return `${horas} horas, ${minutos} minutos y ${segundosRestantes} segundos`
}
