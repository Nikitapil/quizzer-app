<script setup lang="ts">
const props = defineProps<{
  useVHtml: boolean;
  content: string;
}>();
</script>

<template>
  <span
    v-if="props.useVHtml"
    data-test="span-v-html"
    v-html="props.content"
  ></span>

  <span v-else>{{ props.content }}</span>
</template>
