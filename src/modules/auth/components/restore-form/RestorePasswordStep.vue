<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';

import type { IRestorePasswordRequest } from '@/modules/auth/domain/types';

import AppInput from '@/components/inputs/AppInput.vue';
import AppButton from '@/components/buttons/AppButton.vue';

const emit = defineEmits<{
  submit: [data: IRestorePasswordRequest];
}>();

const { validate } = useForm();

const secretKey = ref('');
const newPassword = ref('');

const onSubmit = async () => {
  const { valid } = await validate();

  if (valid) {
    emit('submit', {
      key: secretKey.value,
      password: newPassword.value
    });
  }
};
</script>

<template>
  <form
    class="form"
    @submit.prevent="onSubmit"
  >
    <p class="restore-key-description">{{ $t('secret_key_description') }}</p>

    <AppInput
      v-model="secretKey"
      id="restore_key"
      name="restore_key"
      rules="required"
      full-width
      :placeholder="$t('secret_key_placeholder')"
      type="text"
      :label="$t('secret_key_label')"
    />

    <AppInput
      v-model="newPassword"
      id="new_password"
      name="new_password"
      full-width
      :placeholder="$t('new_password_placeholder')"
      :rules="{ required: true, minLength: 8 }"
      type="password"
      :label="$t('new_password_label')"
    />

    <AppButton
      full
      type="submit"
      :text="$t('update_password')"
    />
  </form>
</template>

<style lang="scss" scoped>
@import '../../../../assets/styles/vars';
.restore-key-description {
  color: $color-medium-blue;
  font-size: 18px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
