import { execSync } from 'child_process';

const handler = async (m, { conn, text }) => {
  try {
    const stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''));
    const output = stdout.toString();

    // Verificar si hubo cambios
    if (output.includes('Already up to date.')) {
      return conn.reply(m.chat, '❌ *no encontré actualizaciones en el plugins :*', m);
    }

    // Filtrar solo archivos en "plugins/" con extensión ".js"
    const changedFiles = execSync('git diff --name-only HEAD@{1} HEAD').toString().split('\n');
    const pluginChanges = changedFiles.filter(file => file.startsWith('plugins/') && file.endsWith('.js'));

    if (pluginChanges.length === 0) {
      return conn.reply(m.chat, '❌ *no encontré actualizaciones en el plugins :*', m);
    }

    // Mensaje si se detectaron cambios en los plugins
    let message = '✅ *Plugins actualizados correctamente:*\n\n';
    message += pluginChanges.map(f => `🆕 ${f}`).join('\n');
    conn.reply(m.chat, message, m);

  } catch (err) {
    console.error(err);
    conn.reply(m.chat, '❌ Hubo un error al intentar actualizar el bot.', m);
  }
};

handler.command = /^(update|actualizar|gitpull)$/i;
handler.rowner = true;
export default handler;
