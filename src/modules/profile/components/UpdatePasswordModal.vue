<script setup lang="ts">
import AppModal from '@/components/AppModal.vue';
import FormField from '@/components/inputs/FormField.vue';
import AppInput from '@/components/inputs/AppInput.vue';
import { ref } from 'vue';
import AppButton from '@/components/AppButton.vue';
import { useFormValidate } from '@/composables/useFormValidate';

const modelValue = defineModel<boolean>({ required: true });

defineProps<{
  isLoading: boolean;
}>();

const emit = defineEmits<{
  submit: [password: string];
}>();

const { validate } = useFormValidate();

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
        <FormField
          name="password"
          :rules="{ required: true, minLength: 8 }"
          :model-value="password"
        >
          <template #default="{ invalid }">
            <div class="input">
              <AppInput
                id="password"
                v-model="password"
                :placeholder="$t('password_placeholder')"
                type="password"
                :label="$t('password_label')"
                :is-error="invalid"
                :disabled="isLoading"
              />
            </div>
          </template>
        </FormField>
        <FormField
          name="repeated-password"
          :rules="{ isEqual: password }"
          :model-value="repeatedPassword"
        >
          <template #default="{ invalid }">
            <div class="input">
              <AppInput
                id="repeated-password"
                v-model="repeatedPassword"
                :placeholder="$t('password_placeholder')"
                type="password"
                :label="$t('repeat_password')"
                :is-error="invalid"
                :disabled="isLoading"
              />
            </div>
          </template>
        </FormField>
        <div class="controls">
          <AppButton
            full
            appearence="error"
            :text="$t('cancel')"
            :disabled="isLoading"
            @click="closeModal"
          />
          <AppButton
            full
            type="submit"
            :text="$t('change')"
            :disabled="isLoading"
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
