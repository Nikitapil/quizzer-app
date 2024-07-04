import { config } from '@vue/test-utils';
import { validators } from './src/plugins/validation';

config.global.plugins = [validators];
