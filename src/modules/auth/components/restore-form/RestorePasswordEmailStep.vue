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
        full-width
        :placeholder="$t('email_placeholder')"
        label="Email:"
      />

      <AppButton
        :text="$t('next')"
        type="submit"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import AppInput from '@/components/inputs/AppInput.vue';
import { ref } from 'vue';
import { useFormValidate } from '@/composables/useFormValidate';
import AppButton from '@/components/buttons/AppButton.vue';

const emit = defineEmits<{
  submit: [email: string];
}>();

const { validate } = useFormValidate();

const email = ref('');

const onSubmit = async () => {
  const { valid } = await validate();
  if (valid) {
    emit('submit', email.value);
  }
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
}
</style>
