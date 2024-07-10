<script setup lang="ts">
import { type MaybeRef, onMounted, ref } from 'vue';
import { type RuleExpression, useField } from 'vee-validate';

import type { TInputType } from '@/components/inputs/types';

import ErrorMessage from '@/components/ErrorMessage.vue';

const modelValue = defineModel<string | number>();

const props = withDefaults(
  defineProps<{
    type?: TInputType;
    placeholder?: string;
    name: string;
    id: string;
    label?: string;
    disabled?: boolean;
    focusOnMount?: boolean;
    rules?: MaybeRef<RuleExpression<unknown>>;
    fullWidth?: boolean;
  }>(),
  {
    type: 'text',
    placeholder: '',
    rules: '',
    focusOnMount: false,
    fullWidth: false
  }
);

const inputRef = ref<HTMLInputElement | null>(null);

const { errorMessage, handleBlur } = useField(props.name, props.rules, {
  syncVModel: true,
  validateOnValueUpdate: false
});

onMounted(() => {
  if (props.focusOnMount) {
    inputRef.value?.focus();
  }
});
</script>

<template>
  <div :class="{ full: props.fullWidth }">
    <label
      v-if="props.label"
      class="label"
      data-test="app-input-label"
      :for="id"
    >
      {{ props.label }}
    </label>

    <input
      ref="inputRef"
      v-model="modelValue"
      :id="id"
      class="input"
      data-test="app-input"
      :class="{ error: errorMessage, full: props.fullWidth }"
      :type="props.type"
      :placeholder="props.placeholder"
      :name="props.name"
      :disabled="props.disabled"
      @blur="handleBlur($event, true)"
    />

    <ErrorMessage
      v-if="errorMessage"
      class="mt-s"
      :message="errorMessage"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './styles';

.error {
  border-color: $color-red;
}
</style>
