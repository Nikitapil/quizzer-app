<template>
  <div>
    <form
      class="form"
      @submit.prevent="onSubmit"
    >
      <FormField
        name="restore_email"
        rules="required|email"
        :model-value="email"
      >
        <template #default="{ invalid }">
          <div class="input">
            <AppInput
              id="restore_email"
              v-model="email"
              :placeholder="$t('email_placeholder')"
              label="Email:"
              :is-error="invalid"
            />
          </div>
        </template>
      </FormField>
      <AppButton
        :text="$t('next')"
        type="submit"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import AppInput from '@/components/inputs/AppInput.vue';
import FormField from '@/components/inputs/FormField.vue';
import { ref } from 'vue';
import AppButton from '@/components/AppButton.vue';
import { useForm } from 'vee-validate';

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

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
}
</style>
