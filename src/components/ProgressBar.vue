<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  progress: number;
}>();

const width = computed(() => props.progress + '%');
</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar__bar"></div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/styles/vars';

.progress-bar {
  width: 240px;
  height: 16px;
  border: 1px solid $color-white;
  border-radius: 20px;

  &__bar {
    height: 100%;
    background: $bg-success;
    border-radius: 20px;
    width: v-bind(width);
  }
}
</style>
