//🩸 Código demoniaco creado por 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 x Akeno Himejima

const TIEMPO_BLOQUEO_MS = 2 * 24 * 60 * 60 * 1000; // 2 días

export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  try {
    if (m.isBaileys || m.fromMe || m.isGroup || !m.message || !m.text) return true;

    const text = m.text.toUpperCase();
    const exentos = ['PIEDRA', 'PAPEL', 'TIJERA', 'SERBOT', 'JADIBOT'];
    const comandoPermitidoBloqueado = ['CODE', 'MENU', 'NSFW'];

    const bot = global.db?.data?.settings?.[conn.user?.jid] || {};
    const user = global.db?.data?.users?.[m.sender] || {};
    const gp1 = global.gp1 || 'https://chat.whatsapp.com/FaH0I7KkHX2ADdBueuLdDR';

    if (exentos.some(w => text.includes(w)) || comandoPermitidoBloqueado.some(c => text.startsWith(c))) {
      return true;
    }

    // Desbloqueo automático tras el tiempo
    if (user.bloqueado && user.tiempoBloqueo) {
      const ahora = Date.now();
      if (ahora - user.tiempoBloqueo >= TIEMPO_BLOQUEO_MS) {
        await conn.updateBlockStatus(m.sender, 'unblock').catch(() => {});
        user.bloqueado = false;
        user.tiempoBloqueo = 0;
        user.warnPrivado = 0;

        await conn.sendMessage(m.sender, {
          text: `🔓 *La maldición fue levantada...*\n\n🌙 @${m.sender.split('@')[0]}, la demonio Akeno te ha perdonado.\n✨ Puedes volver a usar mis poderes prohibidos.`,
          mentions: [m.sender]
        });
      }
      return false;
    }

    // Bloqueo si escribe en privado y no es owner
    if (bot.antiPrivate && !isOwner && !isROwner) {
      user.warnPrivado = (user.warnPrivado || 0) + 1;

      if (user.warnPrivado >= 3) {
        await conn.reply(m.chat, `
🔮 *𝐀𝐊𝐄𝐍𝐎 𝐃𝐄𝐌𝐎𝐍𝐈𝐀𝐂 𝐒𝐄𝐀𝐋* 🔮
━━━━━━━━━━━━━━━━━━━━━
💀 Usuario: @${m.sender.split('@')[0]}
⛓️ Violaste la barrera del grimorio sagrado.

🕯️ Estado: *ENCADENADO POR 2 DÍAS*
🔒 Has sido sellado por la sacerdotisa Akeno.

🔥 Si quieres redención, arrodíllate en mi grupo:
👾 ${gp1}
━━━━━━━━━━━━━━━━━━━━━`.trim(), m, { mentions: [m.sender] });

        await conn.updateBlockStatus(m.sender, 'block').catch(() => {});
        user.warnPrivado = 0;
        user.bloqueado = true;
        user.tiempoBloqueo = Date.now();
      } else {
        await conn.reply(m.chat, `
⚠️ *𝐀𝐃𝐕𝐄𝐑𝐓𝐄𝐍𝐂𝐈𝐀 𝐃𝐄 𝐀𝐊𝐄𝐍𝐎* ⚠️
━━━━━━━━━━━━━━━━━━━━━
😾 @${m.sender.split('@')[0]}, ¡NO TOQUES EL GRIMORIO PRIVADO!

🧨 Advertencia: *${user.warnPrivado}/3*
💢 A la tercera... vendrá la oscuridad.

🩸 Si buscas salvación, ve al templo de la demonio:
👾 ${gp1}
━━━━━━━━━━━━━━━━━━━━━`.trim(), m, { mentions: [m.sender] });
      }
      return false;
    }

    return true;

  } catch (e) {
    console.error('[❌ ERROR EN ANTI-PRIVADO DEMONÍACO]', e);
    return true;
  }
}
