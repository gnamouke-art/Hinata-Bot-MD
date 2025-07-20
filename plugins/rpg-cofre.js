const handler = async (m, { isPrems, conn }) => {
  if (!global.db.data.users[m.sender]) {
    throw `⚠️ Usuario no encontrado.`;
  }

  const lastCofreTime = global.db.data.users[m.sender].lastcofre || 0;
  const timeToNextCofre = lastCofreTime + 86400000;

  if (Date.now() < timeToNextCofre) {
    const tiempoRestante = timeToNextCofre - Date.now();
    const mensajeEspera = `🎁 Ya reclamaste tu cofre\n⏰️ Regresa en: *${msToTime(tiempoRestante)}* para volver a reclamar.`;
    await conn.sendMessage(m.chat, { text: mensajeEspera }, { quoted: m });
    return;
  }

  const img = 'https://pomf2.lain.la/f/onjn2935.jpg';
  const dia = Math.floor(Math.random() * 30);
  const tok = Math.floor(Math.random() * 10);
  const ai = Math.floor(Math.random() * 4000);
  const expp = Math.floor(Math.random() * 5000);

  let user = global.db.data.users[m.sender];
  user.dragones = (user.dragones || 0) + dia;
  user.money = (user.money || 0) + ai;
  user.joincount = (user.joincount || 0) + tok;
  user.exp = (user.exp || 0) + expp;
  user.lastcofre = Date.now();

  const texto = `
╭━〔 ${global.botname} 〕⬣
┃🧰 *Obtienes Un Cofre*
┃ ¡Felicidades!
╰━━━━━━━━━━━━⬣

╭━〔 ${global.botname} 〕⬣
┃ *${dia} yenes* 💴
┃ *${tok} Tokens* ⚜️
┃ *${ai} Coins* 🪙
┃ *${expp} Exp* ✨
╰━━━━━━━━━━━━⬣`;

  try {
    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption: texto
    }, { quoted: m });
  } catch (error) {
    console.error("❌ Error al enviar imagen:", error);
    throw `⚠️ Ocurrió un error al enviar el cofre.`;
  }
};

handler.help = ['cofre'];
handler.tags = ['rpg'];
handler.command = ['cofre'];
handler.level = 5;
handler.group = true;
handler.register = true;

export default handler;

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  return `${hours} Horas ${minutes} Minutos`;
                           }
