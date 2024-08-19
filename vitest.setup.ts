import { config } from '@vue/test-utils';
import { validators } from '@/plugins/validation';
import { i18n } from '@/plugins/i18n';
import { DirectivePlugin } from '@/directives/DirectivePlugin';
import { routes } from '@/router';
import { createMemoryHistory, createRouter } from 'vue-router';

export const testRouter = createRouter({
  history: createMemoryHistory('/quizzer-app/'),
  routes
});

config.global.plugins = [validators, i18n, DirectivePlugin, testRouter];
config.global.stubs = { teleport: true, transition: true };
