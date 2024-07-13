import type { App, Plugin } from 'vue';
import { clickOutside } from '@/directives/clickOutside';

export const DirectivePlugin: Plugin = {
  install(app: App) {
    app.directive('click-outside', clickOutside);
  }
};
