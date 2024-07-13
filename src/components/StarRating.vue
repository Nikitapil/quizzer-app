<template>
  <HorizontalLoader v-if="isLoading" />
  <div v-else>
    <AppButton
      v-for="star in starsCount"
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

<script setup lang="ts">
import AppButton from '@/components/buttons/AppButton.vue';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import HorizontalLoader from '@/components/loaders/HorizontalLoader.vue';

withDefaults(
  defineProps<{
    starsCount?: number;
    isLoading?: boolean;
  }>(),
  {
    starsCount: 5,
    isLoading: false
  }
);

const emit = defineEmits<{
  select: [rating: number];
}>();

const selectedNum = ref(0);

const onSelect = (num: number) => {
  selectedNum.value = num;
  emit('select', num);
};
</script>

<style lang="scss">
@import '../assets/styles/colors';
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
