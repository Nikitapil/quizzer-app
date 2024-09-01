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
  }>(),
  {
    type: 'button',
    dataTest: '',
    disabled: false,
    color: 'black',
    size: '24px',
    appearance: 'transparent'
  }
);
</script>

<template>
  <AppButton
    class="p-5"
    :appearence="appearance"
    with-icon
    :type="props.type"
    :data-test="props.dataTest"
    :disabled="props.disabled"
  >
    <Icon
      :icon="props.icon"
      :color="props.color"
      :width="props.size"
      :height="props.size"
    />
  </AppButton>
</template>
