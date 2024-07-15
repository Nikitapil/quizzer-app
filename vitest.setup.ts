import { config } from '@vue/test-utils';
import { validators } from './src/plugins/validation';
import { i18n } from './src/plugins/i18n';
import { DirectivePlugin } from './src/directives/DirectivePlugin';
import router from './src/router';

config.global.plugins = [validators, i18n, DirectivePlugin, router];
config.global.stubs = { teleport: true, transition: true };
