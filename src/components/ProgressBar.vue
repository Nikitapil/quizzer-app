<template>
  <div class="progress-bar">
    <div
      class="progress-bar__bar"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  progress: number;
}>();
</script>

<style scoped lang="scss">
@import '../assets/styles/colors';

.progress-bar {
  width: 240px;
  height: 16px;
  border: 1px solid $color-white;
  border-radius: 20px;

  &__bar {
    height: 100%;
    background: $bg-success;
    border-radius: 20px;
  }
}
</style>
