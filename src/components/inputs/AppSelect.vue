<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import type { IOption } from '@/types/types';

const modelValue = defineModel<string>({ default: '' });

const props = withDefaults(
  defineProps<{
    options: IOption[];
    id?: string;
    label?: string;
    disabled?: boolean;
  }>(),
  {
    id: uuidv4()
  }
);

defineEmits<{
  change: [value: string];
}>();
</script>

<template>
  <label
    v-if="props.label"
    class="label"
    data-test="app-select-label"
    :for="props.id"
  >
    {{ props.label }}
  </label>

  <select
    v-model="modelValue"
    :id="props.id"
    class="input cursor-pointer"
    data-test="app-select"
    :disabled="props.disabled"
    @change="$emit('change', modelValue)"
  >
    <option
      v-for="option in props.options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
@import './styles';
</style>
