import axios from 'axios';
import fetch from 'node-fetch';
// import { search, download } from 'aptoide-scraper';  // solo si lo usas luego

const userMessages = new Map();
const userRequests = {};

const handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return m.reply(`💌 *Cielito, dime el nombre del APK que quieres descargar.*\n\n✨ Ejemplo:\n${usedPrefix + command} TikTok`);

  if (userRequests[m.sender]) {
    return await conn.reply(m.chat, `🥺 @${m.sender.split('@')[0]}, ya estás descargando un APK...\nEspera un poquito, amor, que termine el anterior.`, userMessages.get(m.sender) || m);
  }

  userRequests[m.sender] = true;
  await m.react("⏳");

  try {
    const downloadAttempts = [
      async () => {
        const res = await fetch(`https://api.dorratz.com/v2/apk-dl?text=${text}`);
        const data = await res.json();
        if (!data.name) throw new Error('No data from Dorratz API');
        return {
          name: data.name,
          package: data.package,
          lastUpdate: data.lastUpdate,
          size: data.size,
          icon: data.icon,
          dllink: data.dllink
        };
      },
      async () => {
        const res = await fetch(`${info.apis}/download/apk?query=${text}`);
        const data = await res.json();
        const apkData = data.data;
        return {
          name: apkData.name,
          developer: apkData.developer,
          publish: apkData.publish,
          size: apkData.size,
          icon: apkData.image,
          dllink: apkData.download
        };
      },
      // ⚠️ Descomentar si usas aptoide-scraper
      // async () => {
      //   const searchA = await search(text);
      //   const data5 = await download(searchA[0].id);
      //   return {
      //     name: data5.name,
      //     package: data5.package,
      //     lastUpdate: data5.lastup,
      //     size: data5.size,
      //     icon: data5.icon,
      //     dllink: data5.dllink
      //   };
      // },
    ];

    let apkData = null;
    for (const attempt of downloadAttempts) {
      try {
        apkData = await attempt();
        if (apkData) break;
      } catch (err) {
        console.error(`❌ Error: ${err.message}`);
        continue;
      }
    }

    if (!apkData) throw new Error('💔 No se pudo descargar el APK desde ninguna API...');

    const infoTxt = `📱 *APK Encontrado:*\n\n• 🏷️ *Nombre:* ${apkData.name}\n${apkData.developer ? `• 👤 *Dev:* ${apkData.developer}` : `• 📦 *Package:* ${apkData.package}`}\n• 📅 *Actualizado:* ${apkData.publish || apkData.lastUpdate}\n• 📥 *Tamaño:* ${apkData.size}\n\n⏳ Enviando tu APK, mi cielito. Ten un poquito de paciencia 💖`;

    const buttons = [
      { buttonId: `${usedPrefix + command} ${text}`, buttonText: { displayText: '🔁 Buscar de nuevo' }, type: 1 }
    ];

    const msg = await conn.sendButton(m.chat, infoTxt, '🔎 APK Downloader', apkData.icon, buttons, m);
    userMessages.set(m.sender, msg);

    const apkSize = apkData.size.toLowerCase();
    if (apkSize.includes('gb') || (apkSize.includes('mb') && parseFloat(apkSize) > 999)) {
      await m.reply('⚠️ El APK es muy pesado, no puedo enviarlo directamente 😢');
      return;
    }

    await conn.sendMessage(
      m.chat,
      {
        document: { url: apkData.dllink },
        mimetype: 'application/vnd.android.package-archive',
        fileName: `${apkData.name}.apk`,
        caption: null
      },
      { quoted: m }
    );

    await m.react("✅");
  } catch (e) {
    await m.react("❌");
    console.error(e);
    await m.reply('❌ Hubo un error descargando el APK, mi amor... intenta con otro nombre o más tarde 🥺');
  } finally {
    delete userRequests[m.sender];
  }
};

handler.help = ['apk', 'apkmod'];
handler.tags = ['downloader'];
handler.command = /^(apkmod|apk|modapk|dapk2|aptoide|aptoidedl)$/i;
handler.register = true;
handler.limit = 2;

export default handler;
