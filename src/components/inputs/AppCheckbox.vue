<script setup lang="ts">
import { Icon } from '@iconify/vue';

const modelValue = defineModel<boolean>();

const props = withDefaults(
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

<template>
  <div>
    <input
      v-model="modelValue"
      :id="props.id"
      :disabled="props.disabled"
      class="checkbox-input"
      type="checkbox"
    />

    <label
      class="label"
      :for="props.id"
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

      <span data-test="checkbox-label">{{ props.label }}</span>
    </label>
  </div>
</template>

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
