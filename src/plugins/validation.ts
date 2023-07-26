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

  defineRule('email', (value: string) => {
    if (!value || !value.length) {
      return true;
    }
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      )
    ) {
      return i18n.global.t('email_error');
    }
    return true;
  });

  defineRule('minLength', (value: string, [limit]: [number]) => {
    if (!value || !value.length) {
      return true;
    }
    if (value.length < limit) {
      return i18n.global.t('field_min_length', { limit });
    }
    return true;
  });
};
