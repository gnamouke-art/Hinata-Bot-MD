import { execSync } from 'child_process';

const handler = async (m, { conn }) => {
  try {
    // Asegúrate de que el remoto exista y se actualice
    execSync('git remote set-url origin https://github.com/TOKIO5025/Hinata-Bot-MD.git');
    execSync('git fetch origin');
    
    // Obtener lista de archivos cambiados entre HEAD y el último commit remoto
    const diff = execSync('git diff --name-only HEAD origin/main').toString().trim().split('\n');
    const cambiosPlugins = diff.filter(f => f.startsWith('plugins/') && f.endsWith('.js'));

    if (cambiosPlugins.length === 0) {
      return conn.reply(m.chat, '❌ *no encontré actualizaciones en el plugins :*', m);
    }

    // Aplicar los cambios del remoto
    execSync('git pull origin main');

    // Mostrar los archivos actualizados
    let mensaje = '✅ *Plugins actualizados correctamente:*\n\n';
    mensaje += cambiosPlugins.map(f => `🆕 ${f}`).join('\n');
    return conn.reply(m.chat, mensaje, m);

  } catch (e) {
    console.error(e);
    return conn.reply(m.chat, `❌ Error al actualizar:\n${e.message || e}`, m);
  }
};

handler.command = /^(update|actualizar|gitpull)$/i;
handler.rowner = true;
export default handler;
