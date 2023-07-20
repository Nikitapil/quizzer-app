<template>
  <label
    v-if="label"
    class="label"
    data-test="app-input-label"
    :for="id"
  >
    {{ label }}
  </label>
  <input
    :id="id"
    v-model="modelValue"
    class="input"
    data-test="app-input"
    :class="{ error: isError }"
    :type="type"
    :placeholder="placeholder"
    :name="name"
    :disabled="disabled"
  />
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';

const modelValue = defineModel();

withDefaults(
  defineProps<{
    type?: 'text' | 'email' | 'password' | 'number';
    placeholder?: string;
    isError?: boolean;
    name?: string;
    id?: string;
    label?: string;
    disabled?: boolean;
  }>(),
  {
    type: 'text',
    placeholder: '',
    isError: false,
    name: '',
    id: uuidv4()
  }
);
</script>

<style lang="scss" scoped>
@import './styles';

.error {
  border-color: $color-red;
}
</style>
