import './assets/styles/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import messages from './locales/index';
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import App from './modules/app/App.vue';
import router from './router';

const i18n = createI18n({
  availableLocales: ['rus', 'eng'],
  locale: localStorage.getItem('lang') || 'eng',
  fallbackLocale: 'rus',
  messages
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(Vue3Toasity, {
  autoClose: 2500,
  theme: 'dark'
} as ToastContainerOptions);

app.mount('#app');
