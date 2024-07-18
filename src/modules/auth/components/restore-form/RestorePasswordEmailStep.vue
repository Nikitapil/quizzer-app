<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';

import AppInput from '@/components/inputs/AppInput.vue';
import AppButton from '@/components/buttons/AppButton.vue';

const emit = defineEmits<{
  submit: [email: string];
}>();

const { validate } = useForm();

const email = ref('');

const onSubmit = async () => {
  const { valid } = await validate();
  if (valid) {
    emit('submit', email.value);
  }
};
</script>

<template>
  <div>
    <form
      class="form"
      @submit.prevent="onSubmit"
    >
      <AppInput
        v-model="email"
        id="restore_email"
        name="restore_email"
        rules="required|email"
        label="Email:"
        full-width
        :placeholder="$t('email_placeholder')"
      />

      <AppButton
        :text="$t('next')"
        type="submit"
      />
    </form>
  </div>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
}
</style>
