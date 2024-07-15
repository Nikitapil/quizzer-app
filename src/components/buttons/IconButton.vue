<script setup lang="ts">
import AppButton from '@/components/buttons/AppButton.vue';
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
  }>(),
  {
    type: 'button',
    dataTest: '',
    disabled: false,
    color: 'black',
    size: '24px'
  }
);
</script>

<template>
  <AppButton
    class="p-5"
    appearence="transparent"
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
