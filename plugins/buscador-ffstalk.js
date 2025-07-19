import axios from 'axios';

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `🍭 O-oye, por favor dime el ID de Free Fire que quieres stalkear~\n\n✨ Ejemplo:\n/freefirestalk 123456789`, m);

  try {
    let api = await axios.get(`https://vapis.my.id/api/ff-stalk?id=${text}`);
    let json = api.data;

    if (!json.status) return conn.reply(m.chat, "😿 No encontré ningún resultado para ese ID... ¿Seguro que es correcto?", m);

    let { account, pet_info, guild, ketua_guild } = json.data;
    let { id, name, level, xp, region, like, bio, create_time, last_login, honor_score, booyah_pass, booyah_pass_badge, evo_access_badge, equipped_title, BR_points, CS_points } = account;
    let { name: petName, level: petLevel, xp: petXP } = pet_info;
    let { name: guildName, level: guildLevel, member, capacity } = guild;
    let { name: leaderName, level: leaderLevel, xp: leaderXP, BR_points: leaderBR, CS_points: leaderCS, like: leaderLike, create_time: leaderCreate, last_login: leaderLogin } = ketua_guild;

    let txt = `
🌟 *───✨ Free Fire Stalk ✨───🌟*

👤 *Usuario:* ${name}
⭐ *Nivel:* ${level}   XP: ${xp}
🌎 *Región:* ${region}
👍 *Likes:* ${like}
📝 *Bio:* ${bio || "No disponible"}
📅 *Creado:* ${create_time}
🕒 *Último Login:* ${last_login}
🏅 *Honor Score:* ${honor_score}
🎫 *Booyah Pass:* ${booyah_pass}
🎮 *Puntos BR:* ${BR_points}
🎯 *Puntos CS:* ${CS_points}

🐾 *Mascota:*
  - Nombre: ${petName}
  - Nivel: ${petLevel}
  - XP: ${petXP}

🛡️ *Clan:*
  - Nombre: ${guildName}
  - Nivel: ${guildLevel}
  - Miembros: ${member} / ${capacity}

👑 *Líder del clan:*
  - Nombre: ${leaderName}
  - Nivel: ${leaderLevel}
  - XP: ${leaderXP}
  - Puntos BR: ${leaderBR}
  - Puntos CS: ${leaderCS}
  - Likes: ${leaderLike}
  - Creado: ${leaderCreate}
  - Último Login: ${leaderLogin}

✨ *¡Sigue brillando en Free Fire, campeón!*
`;

    await conn.sendMessage(m.chat, { text: txt }, { quoted: m });

  } catch (error) {
    console.error('[ERROR en FreeFireStalk]', error);
    conn.reply(m.chat, `💔 Ooops... Algo salió mal al buscar el usuario.\nIntenta otra vez, ¿vale?`, m);
  }
};

handler.command = ['freefirestalk', 'ffstalk'];

export default handler;
