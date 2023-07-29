<template>
  <form
    class="form"
    @submit.prevent
  >
    <p class="restore-key-description">{{ $t('secret_key_description') }}</p>
    <FormField
      name="restore_key"
      :rules="{ required: true }"
      :model-value="secretKey"
    >
      <template #default="{ invalid }">
        <div class="input">
          <AppInput
            id="restore_key"
            v-model="secretKey"
            :placeholder="$t('secret_key_placeholder')"
            type="text"
            :label="$t('secret_key_label')"
            :is-error="invalid"
          />
        </div>
      </template>
    </FormField>
    <FormField
      name="new_password"
      :rules="{ required: true, minLength: 8 }"
      :model-value="newPassword"
    >
      <template #default="{ invalid }">
        <div class="input">
          <AppInput
            id="new_password"
            v-model="newPassword"
            :placeholder="$t('new_password_placeholder')"
            type="password"
            :label="$t('new_password_label')"
            :is-error="invalid"
          />
        </div>
      </template>
    </FormField>
    <AppButton
      full
      :text="$t('update_password')"
    />
  </form>
</template>

<script setup lang="ts">
import FormField from '@/components/inputs/FormField.vue';
import AppInput from '@/components/inputs/AppInput.vue';
import { ref } from 'vue';
import AppButton from '@/components/AppButton.vue';

const secretKey = ref('');
const newPassword = ref('');
</script>

<style lang="scss" scoped>
@import '../../../../assets/styles/colors';
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
