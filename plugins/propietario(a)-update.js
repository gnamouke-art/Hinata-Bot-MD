import { execSync } from 'child_process';

const handler = async (m, { conn, text }) => {
  try {
    // Ejecutar git pull
    const stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''));
    const output = stdout.toString();

    // Verifica si ya está actualizado
    if (output.includes('Already up to date.') || output.includes('Ya está actualizado')) {
      return conn.reply(m.chat, '❌ *no encontré actualizaciones en el plugins :*', m);
    }

    // Detectar cambios en archivos específicos de /plugins/
    let changed;
    try {
      changed = execSync('git diff --name-only HEAD@{1} HEAD').toString().split('\n');
    } catch (e) {
      return conn.reply(m.chat, '❌ Error al detectar cambios. ¿Tienes historial de commits?', m);
    }

    const pluginsActualizados = changed.filter(file => file.startsWith('plugins/') && file.endsWith('.js'));

    if (pluginsActualizados.length === 0) {
      return conn.reply(m.chat, '❌ *no encontré actualizaciones en el plugins :*', m);
    }

    let mensaje = '✅ *Plugins actualizados correctamente:*\n\n';
    mensaje += pluginsActualizados.map(f => `🆕 ${f}`).join('\n');
    conn.reply(m.chat, mensaje, m);

  } catch (err) {
    console.error('[ERROR en gitpull]:', err?.message || err);
    conn.reply(m.chat, `❌ Error al actualizar el bot:\n${err.message || 'Error desconocido'}`, m);
  }
};

handler.command = /^(update|actualizar|gitpull)$/i;
handler.rowner = true;
export default handler;
