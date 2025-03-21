<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';

import AppModal from '@/components/modals/AppModal.vue';
import AppInput from '@/components/inputs/AppInput.vue';
import AppButton from '@/components/buttons/AppButton.vue';

const modelValue = defineModel<boolean>({ required: true });

const props = defineProps<{
  isLoading: boolean;
}>();

const emit = defineEmits<{
  submit: [password: string];
}>();

const { validate } = useForm();

const password = ref('');
const repeatedPassword = ref('');

const closeModal = () => (modelValue.value = false);

const onSubmit = async () => {
  const { valid } = await validate();

  if (valid) {
    emit('submit', password.value);
  }
};
</script>

<template>
  <AppModal
    v-model="modelValue"
    :title="$t('edit_password')"
  >
    <template #content>
      <form
        class="form"
        @submit.prevent="onSubmit"
      >
        <AppInput
          v-model="password"
          id="password"
          :placeholder="$t('password_placeholder')"
          type="password"
          name="password"
          :rules="{ required: true, minLength: 8 }"
          :label="$t('password_label')"
          :disabled="isLoading"
        />

        <AppInput
          v-model="repeatedPassword"
          id="repeated-password"
          :placeholder="$t('password_placeholder')"
          type="password"
          name="repeated-password"
          rules="confirmed:password"
          :label="$t('repeat_password')"
          :disabled="props.isLoading"
        />

        <div class="controls">
          <AppButton
            full
            appearence="error"
            data-test="cancel-btn"
            :text="$t('cancel')"
            :isLoading="props.isLoading"
            @click="closeModal"
          />

          <AppButton
            full
            type="submit"
            :text="$t('change')"
            :isLoading="props.isLoading"
          />
        </div>
      </form>
    </template>
  </AppModal>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
}

.controls {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
}
</style>
