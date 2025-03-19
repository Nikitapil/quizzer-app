<script setup lang="ts">
import AppButton, {
  type ButtonAppearance
} from '@/components/buttons/AppButton.vue';
import { Icon } from '@iconify/vue';
import type { ButtonType } from '@/components/buttons/domain';

const props = withDefaults(
  defineProps<{
    type?: ButtonType;
    dataTest?: string;
    disabled?: boolean;
    size?: `${string}px`;
    icon: string;
    color: string;
    appearance?: ButtonAppearance;
    isLoading?: boolean;
  }>(),
  {
    type: 'button',
    dataTest: '',
    disabled: false,
    color: 'black',
    size: '24px',
    appearance: 'transparent',
    isLoading: false
  }
);
</script>

<template>
  <AppButton
    class="p-5"
    :appearence="appearance"
    with-icon
    size="sm"
    :type="props.type"
    :data-test="props.dataTest"
    :disabled="props.disabled"
    :isLoading="isLoading"
  >
    <Icon
      :icon="props.icon"
      :color="props.color"
      :width="props.size"
      :height="props.size"
    />
  </AppButton>
</template>
