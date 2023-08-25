<template>
  <div class="incorrect-answer">
    <FormField
      :name="`incorrect-${index}-${questionId}`"
      rules="required"
      :model-value="modelValue"
    >
      <template #default="{ invalid }">
        <div class="input">
          <AppInput
            :id="`incorrect-${index}-${questionId}`"
            v-model="modelValue"
            :placeholder="$t('incorrect_answer_placeholder')"
            :label="`${$t('incorrect_answer_label')}${index + 1}:`"
            :disabled="isLoading"
            :is-error="invalid"
          />
        </div>
      </template>
    </FormField>
    <AppButton
      v-if="index > 0"
      class="delete-btn"
      with-icon
      appearence="transparent"
      :disabled="isLoading"
      @click="$emit('delete-answer')"
    >
      <Icon
        icon="iwwa:delete"
        color="#2264ab"
        width="24"
        height="24"
      />
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import FormField from '@/components/inputs/FormField.vue';
import AppInput from '@/components/inputs/AppInput.vue';
import AppButton from '@/components/AppButton.vue';
import { Icon } from '@iconify/vue';

const modelValue = defineModel<string>();

defineProps<{
  index: number;
  questionId: string;
  isLoading: boolean;
}>();

defineEmits(['delete-answer']);
</script>

<style lang="scss" scoped>
.incorrect-answer {
  display: flex;
  align-items: center;
  gap: 8px;
}

.delete-btn {
  margin-top: 16px;
}
</style>
