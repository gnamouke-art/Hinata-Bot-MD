const handler = async (m, { conn, text }) => {
  const command = '.deltakey';
  if (!text) {
    // Si no se proporciona texto (enlace), el bot responde con el enlace de Delta Executor
    return m.reply('Para obtener tu key, visita el siguiente enlace: https://auth.platorelay.com/0V0%2FGnWilVANLTKfJ9mpQti5sTgdnqtx5IBznUKotj6e797%2FcRYIQAqOqhVOe5sZ85nEtMujAjRrxw1B3iJ5co%2BdVCeT9q%2BM0F5GMJjlqg2w5T%2FwT4nH0VccJHfYa3GHy%2BUyRA%2FFU33qc3CXDrlI41N%2F9KmoBvlU6%2BJ8P%2B8oFdbIM%2FPsNGSYy4grgYrjyVujXGxca3YNurzdf4%2BnoPY52WvD3tppRNm%2BmUuS0%2FCUWg7a0C7sA5VHT6K8KM1xpIrNvmwppSeAhNK%2BogncZI4XUp03JMdjvuCl2OE5pGwatYCgZ8kTmZxFuPLMI90WQgs45DWUiLHE34QFZJCqB9YOQwVHzeqN5VyEmQs8eiWjoDp3aLvLxxp%2FOHOAnXvsmsG3Blo4QO6IRgqP2L2yiruoj4%2BawPYSS1S86yLjr7RJ4HA6pDoonIYDBmqSse3uyXCNlzCTlSQ%2FwdOYUX7%2FfWDaZj%2FjiyWy2wxWjva3s%2Bu%2BTmsQHEQjTDMcN32LDfA%3D');
  } else {
    // Si el usuario proporciona un enlace, puedes agregar lógica para verificar el enlace
    // Aquí se asume que el enlace es válido para generar la key, pero debes agregar validaciones si es necesario
    return m.reply(`Recibí tu enlace: ${text}. Procede a seguir las instrucciones para obtener tu clave.`);
  }
};

handler.help = ['deltakey'];
handler.tags = ['tools'];
handler.command = ['deltakey'];
handler.register = true;

export default handler;
