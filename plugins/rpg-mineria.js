import fs from 'fs';

let handler = async (m, { conn, command }) => {
  const user = global.db.data.users[m.sender];
  const name = conn.getName(m.sender);
  const now = new Date() * 1;

  const rand = (max) => Math.floor(Math.random() * max);

  const tipos = {
    mina: {
      tiempo: 1800000,
      recompensa: () => ({
        piedra: rand(10) + 1,
        hierro: rand(5) + 1,
        oro: rand(3) + 1,
        diamante: rand(2),
      }),
      nombre: '⛏️ Mina Normal',
    },
    minaprofunda: {
      tiempo: 3600000,
      recompensa: () => ({
        piedra: rand(20) + 5,
        hierro: rand(10) + 3,
        oro: rand(6) + 2,
        diamante: rand(4) + 1,
      }),
      nombre: '🕳️ Mina Profunda',
    },
    minarandom: {
      tiempo: 2700000,
      recompensa: () => {
        const tipo = ['piedra', 'hierro', 'oro', 'diamante'][rand(4)];
        let cantidad = rand(10) + 3;
        return { [tipo]: cantidad };
      },
      nombre: '🎲 Mina Aleatoria',
    },
  };

  const tipo = tipos[command];
  if (!tipo) return;

  const lastMine = user[`last_${command}`] || 0;
  const tiempoRestante = tipo.tiempo - (now - lastMine);

  if (tiempoRestante > 0) {
    const espera = msToTime(tiempoRestante);
    await conn.sendMessage(m.chat, {
      text: `💤 *Hey ${name}*, acabas de minar\n⏳ Espera *${espera}* antes de volver a usar *${command}*`,
      contextInfo: {
        externalAdReply: {
          title: '⛏️ Sistema de Minería - Hinata RPG',
          body: '💎 ¡Explora y gana minerales únicos!',
          thumbnailUrl: 'https://i.imgur.com/UqRkR08.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029Vaqe1Iv65yDAKBYr6z0A',
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true,
        }
      }
    }, { quoted: m });
    return;
  }

  const premio = tipo.recompensa();
  user[`last_${command}`] = now;

  for (let recurso in premio) {
    user[recurso] = (user[recurso] || 0) + premio[recurso];
  }

  let resultado = `╭━━〔 *${tipo.nombre} Completada* 〕━━⬣\n`;
  resultado += `┃👤 *Usuario:* ${name}\n┃📍 *Zona:* ${tipo.nombre}\n┃\n`;
  resultado += `┃🎁 *Recompensas:*\n`;
  for (let recurso in premio) {
    const emoji = recurso === 'piedra' ? '🪨' : recurso === 'hierro' ? '⛓️' : recurso === 'oro' ? '🪙' : '💎';
    resultado += `┃${emoji} ${capitalizar(recurso)}: +${premio[recurso]}\n`;
  }
  resultado += `╰━━━━━━━━━━━━━━━━━━⬣\n\n✨ Sigue minando para descubrir más riquezas.`

  await conn.sendMessage(m.chat, {
    text: resultado,
    contextInfo: {
      externalAdReply: {
        title: '🎮 Hinata Bot RPG Oficial',
        body: '¡Canal de eventos, regalos y torneos activos!',
        thumbnailUrl: 'https://i.imgur.com/UqRkR08.jpg',
        sourceUrl: 'https://whatsapp.com/channel/0029Vaqe1Iv65yDAKBYr6z0A',
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true,
      }
    }
  }, { quoted: m });
};

handler.help = ['mina', 'minaprofunda', 'minarandom'];
handler.tags = ['rpg'];
handler.command = /^mina|minaprofunda|minarandom$/i;

export default handler;

function msToTime(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor((ms % 3600000) / 60000);
  let s = Math.floor((ms % 60000) / 1000);
  return `${h ? h + 'h ' : ''}${m ? m + 'm ' : ''}${s + 's'}`;
}

function capitalizar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
