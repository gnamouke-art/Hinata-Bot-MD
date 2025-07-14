import { exec } from 'child_process';
import util from 'util';
const execPromise = util.promisify(exec);

// ⚙️ Configura tu repo
const REPO_URL = 'https://github.com/TOKIO5025/Hinata-Bot-MD.git';
const REPO_BRANCH = 'main';

let handler = async (m) => {
  const allowedUser = '50248019799'; // solo tú

  if (m.sender.split('@')[0] !== allowedUser) {
    return m.reply('❌ Este comando solo está disponible para mi creadora suprema 💖.');
  }

  try {
    await m.reply('🌀 *Buscando actualizaciones...*');

    // Limpiar carpeta temporal
    await execPromise('rm -rf ./tmp-repo');

    // Clonar repositorio temporal
    await execPromise(`git clone --depth=1 --branch ${REPO_BRANCH} ${REPO_URL} ./tmp-repo`);

    // Comparar cambios
    const { stdout: diffOutput } = await execPromise(`diff -qr ./tmp-repo ./ | grep -vE ".git|node_modules" || true`);

    if (!diffOutput.trim()) {
      await execPromise('rm -rf ./tmp-repo');
      return m.reply('✅ *El bot ya está actualizado.*');
    }

    // Aplicar cambios
    await execPromise('cp -ru ./tmp-repo/* ./');
    await execPromise('rm -rf ./tmp-repo');

    // ✅ Mostrar solo confirmación
    await m.reply('✅ *Bot actualizado correctamente.*');

  } catch (e) {
    console.error(e);
    await m.reply('❌ *Error durante la actualización:*\n' + (e.message || e));
  }
};

handler.help = ['update'];
handler.tags = ['tools'];
handler.command = /^update$/i;

export default handler;
