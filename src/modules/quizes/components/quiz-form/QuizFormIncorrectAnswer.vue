<script setup lang="ts">
import { Icon } from '@iconify/vue';
import AppInput from '@/components/inputs/AppInput.vue';
import AppButton from '@/components/buttons/AppButton.vue';

const modelValue = defineModel<string>();

const props = defineProps<{
  index: number;
  questionId: string;
  isLoading: boolean;
}>();

defineEmits(['delete-answer']);
</script>

<template>
  <div class="incorrect-answer">
    <AppInput
      v-model="modelValue"
      :id="`incorrect-${props.index}-${props.questionId}`"
      :name="`incorrect-${props.index}-${props.questionId}`"
      :placeholder="$t('incorrect_answer_placeholder')"
      :label="`${$t('incorrect_answer_label')}${props.index + 1}:`"
      :disabled="isLoading"
      full-width
      rules="required"
    />

    <AppButton
      v-if="props.index > 0"
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
