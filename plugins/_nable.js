import { createHash } from 'crypto'
import fetch from 'node-fetch'

const isGroupId = id => id?.endsWith('@g.us') || id?.endsWith('@lid') || id?.includes('@g.us') || id?.includes('@lid')

const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  const chat = global.db.data.chats[m.chat] || {}
  const user = global.db.data.users[m.sender] || {}
  const bot = global.db.data.settings[conn.user.jid] || {}
  const type = command.toLowerCase()

  // Verificación manual de permisos para evitar problemas con @lid
  let manualIsOwner = isOwner
  let manualIsAdmin = isAdmin
  let manualIsROwner = isROwner

  // Verificar owner manualmente si no está detectado
  if (!manualIsOwner && global.owner) {
    manualIsOwner = global.owner.some(owner => {
      let ownerNumber = Array.isArray(owner) ? owner[0] : owner
      return ownerNumber === m.sender.split('@')[0]
    })
  }

  // Verificar admin manualmente en grupos si no está detectado
  if (!manualIsAdmin && isGroupId(m.chat)) {
    try {
      let groupMetadata = await conn.groupMetadata(m.chat)
      if (groupMetadata && groupMetadata.participants) {
        let userParticipant = groupMetadata.participants.find(p => p.id === m.sender)
        if (userParticipant) {
          manualIsAdmin = userParticipant.admin === 'admin' || userParticipant.admin === 'superadmin'
        }
      }
    } catch (e) {
      console.log('Error verificando admin manualmente:', e.message)
    }
  }

  // Si es owner, también es admin y rowner
  if (manualIsOwner) {
    manualIsAdmin = true
    manualIsROwner = true
  }

  // Revisar si el argumento es on/enable o off/disable
  let isEnable
  if (args[0] === 'on' || args[0] === 'enable') {
    isEnable = true
  } else if (args[0] === 'off' || args[0] === 'disable') {
    isEnable = false
  } else {
    // Mostrar estado actual con estilo Akeno
    const estado = chat[type] ? '💖 Activado' : '💔 Desactivado'
    return conn.reply(
      m.chat,
      `♡─｡ﾟ:*:✼✿ *Ay~* ✿✼:*:ﾟ｡─♡\n\nSolo un admin puede cambiar *${command}*, pero aquí te dejo cómo está:\n\n🔸 *${usedPrefix}${command} on* para activar, mi amor~\n🔹 *${usedPrefix}${command} off* para desactivar, si quieres.\n\n✦ Estado actual: *${estado}*`,
      m
    )
  }

  // Función para verificar permisos y cambiar estado
  const checkPerms = (permiso, scope = 'group') => {
    if (scope === 'group') {
      if (!isGroupId(m.chat)) {
        if (!manualIsOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!(manualIsAdmin || manualIsOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
    } else if (scope === 'rowner') {
      if (!manualIsROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
    }
    chat[permiso] = isEnable
  }

  try {
    switch (type) {
      case 'welcome': case 'bienvenida': checkPerms('welcome'); break
      case 'antilag': checkPerms('antiLag'); break
      case 'antiprivado': case 'antiprivate': checkPerms('antiPrivate', 'rowner'); bot.antiPrivate = isEnable; break
      case 'restrict': case 'restringir': checkPerms('restrict', 'rowner'); bot.restrict = isEnable; break
      case 'antibot': case 'antibots': checkPerms('antiBot'); break
      case 'autoaceptar': case 'aceptarauto': checkPerms('autoAceptar'); break
      case 'autorechazar': case 'rechazarauto': checkPerms('autoRechazar'); break
      case 'autoresponder': case 'autorespond': checkPerms('autoresponder'); break
      case 'antisubbots': case 'antibot2': checkPerms('antiBot2'); break
      case 'modoadmin': case 'soloadmin': checkPerms('modoadmin'); break
      case 'reaction': case 'reaccion': checkPerms('reaction'); break
      case 'nsfw': case 'modohorny': checkPerms('nsfw'); break
      case 'jadibotmd': case 'modejadibot': checkPerms('jadibotmd', 'rowner'); bot.jadibotmd = isEnable; break
      case 'detect': case 'avisos': checkPerms('detect'); break
      case 'antilink': checkPerms('antiLink'); break
      case 'antifake': checkPerms('antifake'); break
      default:
        return conn.reply(
          m.chat,
          `✘ Lo siento, cariño, no conozco el comando *${command}*... intenta otro, porfa~`,
          m
        )
    }

    const status = isEnable ? '🌸 activado con mucho amor 🌸' : '❄️ desactivado, pero igual te quiero ❄️'
    const scope = ['antiprivado', 'restrict', 'jadibotmd'].includes(type)
      ? 'globalmente en el bot, mi querido(a)~'
      : 'para este chat especial~'

    await conn.reply(m.chat, `✧･ﾟ: *✧･ﾟ:* La función *${type}* se ${status} ${scope} ✧･ﾟ: *✧･ﾟ:*`, m)
  } catch (error) {
    if (error === false) return
    console.error('Error en enable/disable:', error)
    await conn.reply(
      m.chat,
      `❌ Ay no, hubo un problema al procesar tu pedido: ${error.message}… Porfa intenta otra vez~`,
      m
    )
  }
}

handler.help = [
  'welcome', 'bienvenida', 'antiprivado', 'antiprivate', 'restrict', 'restringir',
  'autolevelup', 'autonivel', 'antibot', 'antibots', 'autoaceptar', 'aceptarauto',
  'autorechazar', 'rechazarauto', 'autoresponder', 'autorespond', 'antisubbots',
  'antibot2', 'modoadmin', 'soloadmin', 'reaction', 'reaccion', 'nsfw', 'modohorny',
  'antispam', 'jadibotmd', 'modejadibot', 'subbots', 'detect', 'avisos', 'antilink', 'antifake'
]
handler.tags = ['nable']
handler.command = handler.help

export default handler
