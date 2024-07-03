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
    ref="inputRef"
    v-model="modelValue"
    :id="id"
    class="input"
    data-test="app-input"
    :class="{ error: isError }"
    :type="type"
    :placeholder="placeholder"
    :name="name"
    :disabled="disabled"
    @blur="$parent?.$emit('blur')"
  />
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import type { TInputType } from '@/components/inputs/types';
import { onMounted, ref } from 'vue';

const modelValue = defineModel();

defineEmits(['blur']);

const props = withDefaults(
  defineProps<{
    type?: TInputType;
    placeholder?: string;
    isError?: boolean;
    name?: string;
    id?: string;
    label?: string;
    disabled?: boolean;
    focusOnMount?: boolean;
  }>(),
  {
    type: 'text',
    placeholder: '',
    isError: false,
    name: '',
    id: uuidv4(),
    focusOnMount: false
  }
);

const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  if (props.focusOnMount) {
    inputRef.value?.focus();
  }
});
</script>

<style lang="scss" scoped>
@import './styles';

.error {
  border-color: $color-red;
}
</style>
