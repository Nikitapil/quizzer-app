<script setup lang="ts">
import { Icon } from '@iconify/vue';

const props = defineProps<{
  text: string;
}>();
</script>

<template>
  <div class="centered-page">
    <Icon
      icon="noto:sad-but-relieved-face"
      width="112"
    />
    <h2 class="text">{{ props.text }}</h2>
  </div>
</template>

<style scoped lang="scss">
.text {
  font-size: 2rem;
}
</style>
