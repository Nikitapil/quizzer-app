import { required, max_value } from '@vee-validate/rules';
import { defineRule } from 'vee-validate';
export const validators = () => {
  defineRule('required', required);
  defineRule('max_value', max_value);
};
