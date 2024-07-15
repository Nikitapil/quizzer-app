<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonType } from '@/components/buttons/domain';

type ButtonAppearance =
  | 'primary'
  | 'dark'
  | 'transparent'
  | 'success'
  | 'error'
  | 'white';

const props = withDefaults(
  defineProps<{
    text?: string | number;
    type?: ButtonType;
    full?: boolean;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    withIcon?: boolean;
    appearence?: ButtonAppearance;
  }>(),
  {
    appearence: 'primary',
    type: 'button',
    full: false,
    withIcon: false,
    disabled: false,
    size: 'md'
  }
);

defineEmits(['click']);

const classes = computed(() => ({
  [props.appearence]: true,
  [props.size]: true,
  'full-width': props.full,
  'with-icon': props.withIcon
}));
</script>

<template>
  <button
    class="button"
    :class="classes"
    :type="props.type"
    :disabled="props.disabled"
    @click="$emit('click')"
  >
    <slot>{{ props.text }}</slot>
  </button>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/vars';
.button {
  border: none;
  background: none;
  outline: none;
  padding: 5px 10px;
  color: $color-white;
  box-shadow: $shadow-black-common;
  transition: 0.4s;
  border-radius: 5px;
  font-size: 18px;

  &.full-width {
    width: 100%;
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 1;
  }

  &.primary {
    background: $bg-medium-blue;
  }

  &.dark {
    background: $bg-dark-blue;
  }

  &.transparent {
    background: none;
    box-shadow: none;

    &:hover {
      background: $bg-transparent-dark;
    }
  }

  &.success {
    background: $bg-success;
  }

  &.error {
    background: $bg-error;
  }

  &.white {
    background: $bg-white;
    color: $color-dark-blue;

    &:hover {
      background: $bg-medium-blue;
    }
  }

  &.sm {
    font-size: 14px;
  }

  &.lg {
    font-size: 22px;
  }

  &:disabled {
    background: $bg-gray;
    cursor: not-allowed;
  }

  &.with-icon {
    line-height: 0;
    padding: 3px;
  }
}
</style>
