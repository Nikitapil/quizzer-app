import { config } from '@vue/test-utils';
import { validators } from './src/plugins/validation';
import { i18n } from './src/plugins/i18n';
import { DirectivePlugin } from './src/directives/DirectivePlugin';

config.global.plugins = [validators, i18n, DirectivePlugin];
config.global.stubs = { teleport: true, transition: true };
