import { exec } from 'child_process';
import util from 'util';
const execPromise = util.promisify(exec);

// 🧠 CONFIGURA AQUÍ TU REPO (solo para uso interno)
const REPO_URL = 'https://github.com/TOKIO5025/Hinata-Bot-MD.git';
const REPO_BRANCH = 'main';

let handler = async (m) => {
  // Verifica si el mensaje viene de ti
  const allowedUser = '50248019799'; // Solo tú puedes usar este comando
  if (m.sender.split('@')[0] !== allowedUser) {
    return m.reply('❌ Este comando solo está disponible para mi creador 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 💖.');
  }

  try {
    await m.reply('⚡ Buscando nuevas actualizaciones del plugins...');

    // Eliminar carpeta temporal si ya existe
    await execPromise('/tmp-repo');

    // Clonar el repositorio en carpeta temporal
    await execPromise(`git clone --depth=1 --branch ${REPO_BRANCH} ${REPO_URL} ./tmp-repo`);

    // Comparar diferencias entre versiones
    const { stdout: diffOutput } = await execPromise(`diff -qr ./tmp-repo ./ | grep -vE ".git|node_modules" || true`);

    if (!diffOutput.trim()) {
      await execPromise('rm -rf ./tmp-repo');
      return m.reply('✅ El bot ya está actualizado. No se encontraron cambios.');
    }

    // Copiar archivos modificados o nuevos
    await execPromise('/tmp-repo/* ./');
    await execPromise('rm -rf ./tmp-repo');

    // Generar resumen de cambios
    const resumen = diffOutput
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        if (line.startsWith('Files')) {
          const partes = line.split(' and ');
          return `📄 Modificado: ${partes[0].replace('Files ', '').trim()}`;
        } else if (line.startsWith('Only in')) {
          return `🆕 Nuevo archivo o carpeta: ${line.replace('Only in ', '').trim()}`;
        } else {
          return `📁 Otro cambio: ${line.trim()}`;
        }
      }).join('\n');

    await m.reply(`✅ *Actualización completada*\n\n📋 *Cambios detectados:*\n${resumen}`);

  } catch (e) {
    console.error(e);
    await m.reply('❌ *Error durante la actualización:*\n' + (e.message || e));
  }
};

handler.help = ['update'];
handler.tags = ['tools'];
handler.command = /^update$/i;

export default handler;
