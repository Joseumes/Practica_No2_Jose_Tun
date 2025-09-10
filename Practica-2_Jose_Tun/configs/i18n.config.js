
import i18n from 'i18n';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

i18n.configure({
  locales: ['en', 'es'],
  directory: __dirname + '/../idiomas',
  defaultLocale: 'en',
  autoReload: true,
  syncFiles: true,
  cookie: 'lang',
});

export default i18n;