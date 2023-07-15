import { defineRule } from 'vee-validate';
import { i18n } from '@/main';
export const validators = () => {
  defineRule('required', (value: string) => {
    if (!value?.toString()?.trim() || !value?.toString()?.length) {
      return i18n.global.t('required_field');
    }

    return true;
  });

  defineRule('max_value', (value: number, [max]: [number]) => {
    if (value > max) {
      return i18n.global.t('value_less_than') + ` ${max + 1}`;
    }

    return true;
  });

  defineRule('min_value', (value: number, [min]: [number]) => {
    if (value < min) {
      return i18n.global.t('value_more_than') + ` ${min - 1}`;
    }

    return true;
  });
};
