import { config } from '@vue/test-utils';
import { validators } from './src/plugins/validation';
import { i18n } from './src/plugins/i18n';
import { DirectivePlugin } from './src/directives/DirectivePlugin';
import { routes } from './src/router';
import { createRouter, createWebHistory } from 'vue-router';

export const testRouter = createRouter({
  history: createWebHistory('/quizzer-app/'),
  routes
});

config.global.plugins = [validators, i18n, DirectivePlugin, testRouter];
config.global.stubs = { teleport: true, transition: true };
