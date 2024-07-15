<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

import AppButton from '@/components/buttons/AppButton.vue';
import HorizontalLoader from '@/components/loaders/HorizontalLoader.vue';

const props = withDefaults(
  defineProps<{
    starsCount?: number;
    isLoading?: boolean;
    defaultValue?: number;
  }>(),
  {
    starsCount: 5,
    defaultValue: 0,
    isLoading: false
  }
);

const emit = defineEmits<{
  select: [rating: number];
}>();

const selectedNum = ref(props.defaultValue);

const onSelect = (num: number) => {
  selectedNum.value = num;
  emit('select', num);
};
</script>

<template>
  <HorizontalLoader v-if="props.isLoading" />

  <div v-else>
    <AppButton
      v-for="star in props.starsCount"
      :key="star"
      class="star"
      :class="{ selected: star <= selectedNum }"
      with-icon
      appearence="transparent"
      @click="onSelect(star)"
    >
      <Icon
        icon="ion:star-outline"
        color="#d2e000"
        width="32"
        height="32"
      />
    </AppButton>
  </div>
</template>

<style lang="scss">
@import '../assets/styles/vars';
.star {
  &:hover,
  &:has(~ .star:hover),
  &.selected {
    path {
      fill: $color-yellow;
    }
  }
}
</style>
