<script setup lang="ts">
const props = defineProps<{
  message: string;
}>();
</script>

<template>
  <p class="error">
    {{ props.message }}
  </p>
</template>

<style scoped>
.error {
  color: red;
}
</style>
