// plugins/cmd-autoresponder.js
import { db } from '../lib/postgres.js'

let handler = async (m, { args, isAdmin, isBotAdmin, conn }) => {
  if (!m.isGroup) throw '🌐 Este comando solo funciona en grupos.'
  if (!isAdmin) throw '👮‍♀️ Necesitas ser admin para usar este comando.'
  if (!isBotAdmin) throw '🤖 Necesito ser admin para activar esta función.'

  const option = (args[0] || '').toLowerCase()
  if (!['on', 'off'].includes(option)) {
    throw `✳️ Usa el comando así:\n\n.autoresponder on\n.autoresponder off`
  }

  const prompt = option === 'on'
    ? `Eres una bot llamada Hinata. Responde todo lo que te digan con un estilo coqueto, grosero y divertido. Sé sarcástica, directa, pero graciosa.`
    : ''

  try {
    await db.query(
      `INSERT INTO group_settings (group_id, sautorespond)
       VALUES ($1, $2)
       ON CONFLICT (group_id) DO UPDATE SET sautorespond = $2`,
      [m.chat, prompt]
    )
    await conn.reply(
      m.chat,
      option === 'on'
        ? '✨ Autorespuesta activada. Hinata está lista para repartir flow y sarcasmo 😈'
        : '❌ Autorespuesta desactivada. Hinata se quedará calladita 💤',
      m
    )
  } catch (e) {
    console.error('[❌] Error guardando autoresponder:', e)
    throw '⚠️ Error al guardar la configuración.'
  }
}

handler.help = ['autoresponder on', 'autoresponder off']
handler.tags = ['group']
handler.command = /^autoresponder$/i
handler.group = true

export default handler
