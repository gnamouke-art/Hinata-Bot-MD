import { db } from '../lib/postgres.js'
import { xpRange } from '../lib/levelling.js'

const cooldown = 3600000; // 1 hora
const handler = async (m, { conn, metadata }) => {
  const now = Date.now();
  const userRes = await db.query('SELECT exp, limite, money, crime FROM usuarios WHERE id = $1', [m.sender]);
  const user = userRes.rows[0];
  if (!user) return m.reply('❌ No estás registrado en la base de datos.');

  const timePassed = now - (user.crime || 0);
  if (timePassed < cooldown && m.sender !== '50248019799@s.whatsapp.net')
    return m.reply(`🕐 Ya cometiste un crimen, espera *${msToTime(cooldown - timePassed)}* para volver a intentarlo.`);

  const participants = metadata.participants.map(v => v.id);
  const randomTarget = participants[Math.floor(Math.random() * participants.length)];
  const exp = Math.floor(Math.random() * 7000);
  const diamond = Math.floor(Math.random() * 30);
  const money = Math.floor(Math.random() * 9000);
  const type = Math.floor(Math.random() * 5);

  let text = '';
  switch (type) {
    case 0:
      text = `✅ ${pickRandom(robar)} ${exp} XP`;
      await db.query('UPDATE usuarios SET exp = exp + $1, crime = $2 WHERE id = $3', [exp, now, m.sender]);
      break;
    case 1:
      text = `❌ ${pickRandom(robmal)} ${exp} XP`;
      await db.query('UPDATE usuarios SET exp = GREATEST(exp - $1, 0), crime = $2 WHERE id = $3', [exp, now, m.sender]);
      break;
    case 2:
      text = `✅ ${pickRandom(robar)}\n\n${diamond} 💎 DIAMANTES\n${money} 🪙 COINS`;
      await db.query('UPDATE usuarios SET limite = limite + $1, money = money + $2, crime = $3 WHERE id = $4', [diamond, money, now, m.sender]);
      break;
    case 3:
      text = `❌ ${pickRandom(robmal)}\n\n${diamond} 💎 DIAMANTES\n${money} 🪙 COINS`;
      await db.query('UPDATE usuarios SET limite = GREATEST(limite - $1, 0), money = GREATEST(money - $2, 0), crime = $3 WHERE id = $4', [diamond, money, now, m.sender]);
      break;
    case 4:
      text = `✅ Le has robado a @${randomTarget.split('@')[0]} una cantidad de ${exp} XP`;
      await db.query('UPDATE usuarios SET exp = exp + $1, crime = $2 WHERE id = $3', [exp, now, m.sender]);
      await db.query('UPDATE usuarios SET exp = GREATEST(exp - $1, 0) WHERE id = $2', [500, randomTarget]);
      break;
  }

  return conn.sendMessage(m.chat, { text, mentions: [m.sender, randomTarget] }, { quoted: m });
};

handler.help = ['crime'];
handler.tags = ['econ'];
handler.command = /^(crime|crimen)$/i;
handler.register = true;
handler.group = true;

export default handler;

function msToTime(duration) {
  const minutes = Math.floor((duration / 1000 / 60) % 60);
  const hours = Math.floor((duration / 1000 / 60 / 60) % 24);
  return `${hours.toString().padStart(2, '0')} Hora(s) ${minutes.toString().padStart(2, '0')} Minuto(s)`;
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

let robar = [
  'Robaste un Banco 🏦 y Obtuviste:',
  'Negociaste con el jefe de la mafia y Obtuviste:',
  'Hackeaste una cuenta bancaria secreta y conseguiste:',
  'Interceptaste una transferencia millonaria y robaste:',
  'Vendiste información clasificada al mercado negro y ganaste:',
  'Asaltaste a un político corrupto y recuperaste:',
  'Fingiste ser técnico de sistemas y robaste:',
  'Vaciaste una bóveda privada sin dejar huellas. Obtuviste:',
  'Sobornaste a un guardia y entraste a la bóveda. Ganaste:',
  'Hiciste una estafa piramidal y te llevaste:',
  'Hackeaste un casino online y cobraste:',
  'Engañaste a un jeque árabe y conseguiste:',
  'Viajaste en el tiempo y robaste oro antiguo por un valor de:',
  'Robaste un yate lujoso cargado de joyas. Obtuviste:',
  'Interceptaste un convoy blindado y te quedaste con:',
  'Infiltraste una base secreta y encontraste:',
  'Vendiste NFTs falsos y obtuviste:',
  'Te hiciste pasar por Elon Musk y robaste criptomonedas por valor de:',
];

let robmal = [
  'La policía te vio 😭 PERDISTE:',
  'Tu compinche te traicionó y te arrestaron. Perdiste:',
  'Activaste la alarma sin querer. Te arrestaron y perdiste:',
  'Te atraparon disfrazado de repartidor. Perdiste:',
  'El guardia del banco era ex militar. Te noqueó. Perdiste:',
  'Tu máscara se cayó y te reconocieron. Fuiste arrestado. Perdiste:',
  'Tu auto de escape explotó. No pudiste huir. Perdiste:',
  'Hackeaste mal y dejaste rastros. El FBI te encontró. Perdiste:',
  'Presumiste el dinero robado en TikTok. Te arrestaron. Perdiste:',
  'La víctima era otro criminal. Te robó a ti. Perdiste:',
  'Sistema de seguridad con reconocimiento facial. Te capturaron. Perdiste:',
  'El paquete robado tenía un GPS. Te hallaron. Perdiste:',
  'Vendiste el botín en el mercado negro... y era trampa. Te arrestaron. Perdiste:',
  'Tu cómplice era un agente encubierto. Te traicionó. Perdiste:',
  'El banco estaba vacío. Perdiste tiempo y quedaste en ridículo. Perdiste:',
];
