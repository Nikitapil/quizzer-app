import { createApp } from 'vue';
import { createPinia } from 'pinia';

import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import './assets/styles/main.scss';

import router from './router';

import { validators } from '@/plugins/validation';
import { i18n } from '@/plugins/i18n';
import { DirectivePlugin } from '@/directives/DirectivePlugin';

import App from './modules/app/App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(Vue3Toasity, {
  autoClose: 2500,
  theme: 'dark'
} as ToastContainerOptions);
app.use(validators);
app.use(DirectivePlugin);

app.mount('#app');
