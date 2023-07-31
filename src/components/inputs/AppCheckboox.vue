<template>
  <div>
    <input
      :id="id"
      v-model="modelValue"
      :disabled="disabled"
      class="checkbox-input"
      type="checkbox"
    />
    <label
      class="label"
      :for="id"
    >
      <span class="checkbox">
        <Transition name="checkbox">
          <Icon
            v-if="modelValue"
            icon="radix-icons:check"
            color="#2264ab"
            width="22"
            height="22"
          />
        </Transition>
      </span>
      <span>{{ label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

const modelValue = defineModel<boolean>();

withDefaults(
  defineProps<{
    id: string;
    label: string;
    disabled?: boolean;
  }>(),
  {
    disabled: false
  }
);
</script>

<style lang="scss" scoped>
@import '../../assets/styles/colors';

.label {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 18px;
  gap: 8px;
}

.checkbox {
  height: 20px;
  width: 20px;
  border: 1px solid $color-blue;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
}

.checkbox-input {
  display: none;

  &:disabled + label {
    cursor: not-allowed;

    & .checkbox {
      background: lightskyblue;
    }
  }
}
</style>
<style>
.checkbox-enter-active,
.checkbox-leave-active {
  transition: opacity 0.19s ease;
}

.checkbox-enter-from,
.checkbox-leave-to {
  opacity: 0;
}
</style>
