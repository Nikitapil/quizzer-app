<template>
  <label
    v-if="label"
    class="label"
    data-test="app-select-label"
    :for="id"
  >
    {{ label }}
  </label>
  <select
    :id="id"
    v-model="modelValue"
    class="input"
    data-test="app-select"
    :disabled="disabled"
    @change="$emit('change', modelValue)"
  >
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { defineModel } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { IOption } from '@/types/types';

withDefaults(
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

const modelValue = defineModel();
</script>

<style lang="scss" scoped>
@import './styles';
</style>
