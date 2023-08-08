<template>
  <button
    class="button"
    :class="{
      [appearence]: true,
      [size]: true,
      'full-width': full,
      'with-icon': withIcon
    }"
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string | number;
    type?: 'button' | 'submit';
    full?: boolean;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    withIcon?: boolean;
    appearence?:
      | 'primary'
      | 'dark'
      | 'transparent'
      | 'success'
      | 'error'
      | 'white';
  }>(),
  {
    appearence: 'primary',
    type: 'button',
    full: false,
    withIcon: false,
    size: 'md'
  }
);

defineEmits(['click']);
</script>

<style lang="scss" scoped>
@import '../assets/styles/colors';
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
    padding: 0;
  }
}
</style>
