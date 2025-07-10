import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { conn, text }) => {
  if (!text) {
    // Si no se proporciona un enlace, el bot responde con un mensaje.
    return m.reply('Para obtener tu key, visita el siguiente enlace: https://auth.platorelay.com/0V0%2FGnWilVANLTKfJ9mpQti5sTgdnqtx5IBznUKotj6e797%2FcRYIQAqOqhVOe5sZ85nEtMujAjRrxw1B3iJ5co%2BdVCeT9q%2BM0F5GMJjlqg2w5T%2FwT4nH0VccJHfYa3GHy%2BUyRA%2FFU33qc3CXDrlI41N%2F9KmoBvlU6%2BJ8P%2B8oFdbIM%2FPsNGSYy4grgYrjyVujXGxca3YNurzdf4%2BnoPY52WvD3tppRNm%2BmUuS0%2FCUWg7a0C7sA5VHT6K8KM1xpIrNvmwppSeAhNK%2BogncZI4XUp03JMdjvuCl2OE5pGwatYCgZ8kTmZxFuPLMI90WQgs45DWUiLHE34QFZJCqB9YOQwVHzeqN5VyEmQs8eiWjoDp3aLvLxxp%2FOHOAnXvsmsG3Blo4QO6IRgqP2L2yiruoj4%2BawPYSS1S86yLjr7RJ4HA6pDoonIYDBmqSse3uyXCNlzCTlSQ%2FwdOYUX7%2FfWDaZj%2FjiyWy2wxWjva3s%2Bu%2BTmsQHEQjTDMcN32LDfA%3D');
  }

  try {
    // Realizamos la solicitud GET al enlace proporcionado
    const response = await axios.get(text);
    const $ = cheerio.load(response.data);

    // Aquí buscamos la key en el HTML (esto dependerá de la estructura de la página)
    // Asegúrate de conocer la estructura exacta de la página para extraer el valor correcto
    const key = $('selector-para-la-key').text().trim();

    if (key) {
      // Si encontramos la key, respondemos con ella.
      return m.reply(`Tu nueva key es: ${key}`);
    } else {
      // Si no encontramos la key, informamos al usuario.
      return m.reply('No se pudo encontrar la key. Asegúrate de que el enlace sea correcto.');
    }
  } catch (error) {
    console.error(error);
    return m.reply('Hubo un error al intentar obtener la key. Intenta nuevamente.');
  }
};

handler.help = ['deltakey'];
handler.tags = ['tools'];
handler.command = ['deltakey'];
handler.register = true;

export default handler;
