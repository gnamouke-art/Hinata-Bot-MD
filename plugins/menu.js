import fs from 'fs';
import axios from 'axios';
import path from 'path';

let handler = async (m, { conn }) => {
    try {
        const botName = 'Hinata-Bot';
        const currency = '¥';
        const videoUrl = 'https://n.uguu.se/yCTFGNTM.mp4'; // Asegúrate que esta URL esté funcionando
        const vs = '1.0.0';
        const dev = 'NeoTokyo Beats';
        const copy = '🔧 Sistema personalizado';

        const menuMessage = `
╔══🎀══════════════════╗
🌟  𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨 𝐚 ${botName}      
╚══🎀══════════════════╝
🧠 ᴅᴇsᴀʀʀᴏʟʟᴀᴅᴏ ᴘᴏʀ: 👨🏻‍💻 ${dev}
📦 𝙑𝙚𝙧𝙨𝙞ó𝙣: ${vs}
💻 Hinata-Bot - 𝙀𝙡 𝙢𝙚𝙟𝙤𝙧 𝘽𝙤𝙩 𝙙𝙚𝙡 𝙢𝙪𝙣𝙙𝙤

┏━━༺💬༻━━┓
┃ ¡Hola! Soy *${botName}* 🩵
┃ Aquí tienes la lista de comandos
┗━━༺💬༻━━┛

💴 𝙈𝙤𝙣𝙚𝙙𝙖 𝙖𝙘𝙩𝙪𝙖𝙡: ${currency}
📢 Más información y novedades:
🔗 https://whatsapp.com/channel/0029Vaqe1Iv65yDAKBYr6z0A

╔═══❖🌟❖═══╗
┃  👑 𝙎𝙊𝙇𝙊 𝘾𝙍𝙀𝘼𝘿𝙊𝙍 
╚═══❖🌟❖═══╝
✿ .cambiarnombreBot ✏️  — Cambia el nombre del bot  
✿ .setbanner 🖼️ — Establece un banner
✿ .setmoneda 🪙 — Cambia la moneda global
✿ .viewbanner 📄 — Ver banner actual
✿ .deletebanner 🗑️ — Eliminar banner
✿ .resetpreferences ♻️ — Reiniciar preferencias

╔═══❖🌙❖═══╗
┃  🗂️ 𝙈𝙀𝙉𝙐 𝘿𝙀𝙎𝘾𝙐𝙀𝙉𝙏𝙊
╚═══❖🌙❖═══╝
☘ .menu2  — Comandos especiales

╔═══🌙≪ 𝘼𝘿𝙈𝙄𝙉𝙄𝙎𝙏𝙍𝘼𝘾𝙄𝙊𝙉 ≫🌙═══╗
┃ 🛡️ Comandos exclusivos para admins
┃ ✦ .kick 🚫 — Expulsar usuario
┃ ✦ .getplugin 🔌 — Obtener plugin
┃ ✦ .getpack 📦 — Descargar pack
┃ ✦ .store 🏪 — Ver tienda
┃ ✦ .status 🖥️ — Estado actual
┃ ✦ .ping 📍 — Latencia del bot
┃ ✦ .gemini 🔍 — Buscar con Gemini
┃ ✦ .pinterest ✨ — Imagen random
╚════════════════════════════╝

╔═══🎲≪ 𝙍𝘼𝙉𝘿𝙊𝙈 ≫🎲═══╗
┃ 🎲 Comandos aleatorios y waifus
┃ ❖ .rw 🌟 — Random waifu
┃ ❖ .winfo 🧸 — Info de waifu
┃ ❖ .rollwaifu 🧸 — Tirar waifu
┃ ❖ .claim 💡 — Reclamar waifu
┃ ❖ .harem 💗 — Ver tu harem
┃ ❖ .addrw 📝 — Añadir waifu
┃ ❖ .alya ➩ .bot 🤖 — Charla con Alya
┃ ❖ .kaori ❤️ — Momento musical 🎻
┃ ❖ .waifu 👄 — Imagen de waifu
┃ ❖ .fakengl ⚡ — Nombre fake en inglés
╚═══════════════════════════╝

╔═════════════════════════╝

> ${copy} Hecho con mucho amor por ${dev}
`;

        // Descarga el video
        const videoPath = path.join(__dirname, 'temp_video.mp4');
        await downloadVideo(videoUrl, videoPath);

        // Envía el mensaje con el video
        await conn.sendMessage(m.chat, {
            video: { url: videoPath },
            caption: menuMessage,
            mentions: [m.sender]
        });

        // Elimina el archivo temporal después de enviarlo
        fs.unlinkSync(videoPath);
    } catch (error) {
        conn.reply(m.chat, `❌ Error al cargar el menú: ${error.message}`, m);
    }
};

// Función para descargar el video
const downloadVideo = async (url, filePath) => {
    const writer = fs.createWriteStream(filePath);
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
};

handler.help = ['menu'];
handler.tags = ['info'];
handler.command = ['menu', 'help'];

export default handler;
