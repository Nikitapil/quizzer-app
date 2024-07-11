import { createI18n } from 'vue-i18n';
import messages from '@/locales';

export const i18n = createI18n({
  availableLocales: ['rus', 'eng'],
  locale: localStorage.getItem('lang') || 'eng',
  fallbackLocale: 'rus',
  legacy: false,
  messages
});
