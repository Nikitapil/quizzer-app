import { validators } from '@/plugins/validation';
import { validate } from 'vee-validate';

describe('validation', () => {
  validators();
  it('should not validate email input without value', async () => {
    const { valid } = await validate('', 'email');

    expect(valid).toBe(true);
  });

  it('should not validate minLength input without value', async () => {
    const { valid } = await validate('', 'minLength');

    expect(valid).toBe(true);
  });
});
