import { exec } from 'child_process';
import util from 'util';
const execPromise = util.promisify(exec);

// 🧠 CONFIGURA TU REPO Y CANAL
const REPO_URL = 'https://github.com/TOKIO5025/Hinata-Bot-MD.git';
const REPO_BRANCH = 'main';
const R_CANAL = '🔧 *Canal oficial de actualizaciones:*\nhttps://whatsapp.com/channel/0029Vaqe1Iv65yDAKBYr6z0A';
const THUMBNAIL = 'https://h.uguu.se/wvsHCRNf.jpg';

let handler = async (m, { conn }) => {
  const allowedUser = '50248019799'; // Tu número

  if (m.sender.split('@')[0] !== allowedUser) {
    return conn.sendMessage(m.chat, { text: '❌ Este comando solo está disponible para mi creadora suprema 💖.' }, { quoted: m });
  }

  try {
    await conn.sendMessage(m.chat, { image: { url: THUMBNAIL }, caption: '🔄 Buscando nuevas actualizaciones de los plugins...', mentions: [m.sender] }, { quoted: m });

    // Clonar repositorio en carpeta temporal
    await execPromise('rm -rf ./tmp-repo');
    await execPromise(`git clone --depth=1 --branch ${REPO_BRANCH} ${REPO_URL} ./tmp-repo`);

    // Comparar solo carpeta plugins/
    const { stdout: diffOutput } = await execPromise(`diff -qr ./tmp-repo/plugins ./plugins || true`);
    
    // Filtrar solo archivos JS
    const cambios = diffOutput
      .split('\n')
      .filter(line => {
        const isPluginPath = line.includes('/plugins/');
        const isJSFile = line.endsWith('.js') || line.includes('.js ');
        return isPluginPath && isJSFile;
      });

    // Si no hay cambios relevantes
    if (cambios.length === 0) {
      await execPromise('rm -rf ./tmp-repo');
      return conn.sendMessage(m.chat, {
        image: { url: THUMBNAIL },
        caption: `❌ *no encontré actualizaciones en el plugins :*\n\n${R_CANAL}`,
        mentions: [m.sender]
      }, { quoted: m });
    }

    // Copiar plugins actualizados
    await execPromise('cp -ru ./tmp-repo/plugins/* ./plugins/');
    await execPromise('rm -rf ./tmp-repo');

    // Crear resumen claro
    const resumen = cambios.map(line => {
      if (line.startsWith('Files')) {
        const partes = line.split(' and ');
        const archivo = partes[0].split('/').pop().trim();
        return `📄 Modificado: ${archivo}`;
      } else if (line.startsWith('Only in')) {
        const archivo = line.split(':')[1]?.trim();
        return archivo && archivo.endsWith('.js') ? `🆕 Nuevo: ${archivo}` : null;
      }
      return null;
    }).filter(Boolean).join('\n');

    await conn.sendMessage(m.chat, {
      image: { url: THUMBNAIL },
      caption: `✅ *Plugins actualizados correctamente:*\n\n${resumen}\n\n${R_CANAL}`,
      mentions: [m.sender]
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, {
      image: { url: THUMBNAIL },
      caption: '❌ *Error durante la actualización:*\n' + (e.message || e),
      mentions: [m.sender]
    }, { quoted: m });
  }
};

handler.help = ['update'];
handler.tags = ['tools'];
handler.command = /^update$/i;
export default handler;
