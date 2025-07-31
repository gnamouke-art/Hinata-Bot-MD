// 💋 Comandos .fantasmas y .kickfantasmas – Hinata Bot 😈
// 🛠️ Desarrollado por 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲

let handler = async (m, { conn, participants, isAdmin, isBotAdmin, command }) => {
  if (!m.isGroup) throw '🚫 Este comando es pa’ grupos, mi amor, no estés de solito 😏';

  global.db.data.messages ??= {};
  global.db.data.messages[m.chat] ??= {};

  const mensajes = global.db.data.messages;
  const miembros = participants.map(p => p.id).filter(id => id !== conn.user.jid);
  const activos = miembros.filter(id => mensajes[m.chat][id]);
  const fantasmas = miembros.filter(id => !activos.includes(id));

  if (!isAdmin) {
    await conn.sendMessage(m.chat, { react: { text: '😜', key: m.key }});
    return conn.reply(m.chat, `╭── 💋 *Hinata Bot la más rica* 💋
│
│  ¿Quién te dio permiso pa’ usar eso, eh? 🙄
│  Solo mis admins sabrosos pueden usar
│  este comando, así que a mirar y callar 😘
│
╰─────────────💄`, m);
  }

  if (command === 'fantasmas') {
    await conn.sendMessage(m.chat, { react: { text: '👻', key: m.key }});

    if (fantasmas.length === 0) {
      return m.reply(`╭── 🌟 *Hinata Bot* 🌟
│
│  Aaawww... todes han hablado 💋
│  Qué grupo más cachondo y participativo 😏
│
╰─────────────✨`);
    }

    let texto = `╭── 🔥 *Fantasmas detectados* 👻
│
│  Miren estas almitas perdidas 👀
│  Bien calladitas, como si les metiera miedo~ 🤭
│  ¡Hablen o las saco a nalgadas! 😈🍑
│
`;

    for (let user of fantasmas) {
      texto += `│  ✦ @${user.split('@')[0]}\n`;
    }

    texto += `│
╰─💅 Total de muditos: *${fantasmas.length}* 🧂`;

    return conn.sendMessage(m.chat, { text: texto, mentions: fantasmas }, { quoted: m });
  }

  if (command === 'kickfantasmas') {
    if (!isBotAdmin) {
      return m.reply('🛑 ¡Ni loca los saco si no soy admin! Hazme admin primero, baboso 💅');
    }

    await conn.sendMessage(m.chat, { react: { text: '💋', key: m.key }});

    if (fantasmas.length === 0) {
      return m.reply(`╭── ✨ *Hinata Bot* ✨
│
│  Todos han hablado, qué delicia~ 😚
│  Nadie pa’ patear el culo 💔
╰─────────────😜`);
    }

    await conn.reply(m.chat, `╭── 😈 *Hinata en modo bruja* 😈
│
│  Bye bye fantasmas 🧹💨
│  No me sirven si no hablan, fueraaa 💋
│
╰─🔪 Eliminando *${fantasmas.length}* 🩸`, m);

    for (let id of fantasmas) {
      try {
        await conn.groupParticipantsUpdate(m.chat, [id], 'remove');
        await new Promise(resolve => setTimeout(resolve, 1500));
      } catch (e) {
        await m.reply(`❌ No pude sacar a @${id.split('@')[0]}... seguro le reza a algún dios 😒`, null, {
          mentions: [id]
        });
      }
    }
  }
};

handler.command = /^fantasmas|kickfantasmas$/i;
handler.group = true;

export default handler;
