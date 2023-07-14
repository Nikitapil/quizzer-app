import { required } from '@vee-validate/rules';
import { defineRule } from 'vee-validate';
export const validators = () => {
  defineRule('required', required);
};
