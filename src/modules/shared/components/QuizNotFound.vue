<script setup lang="ts">
import EmptyState from '@/components/EmptyState.vue';
</script>

<template>
  <EmptyState
    :text="$t('quiz_not_found')"
    data-test="quiz-not-found"
  />
</template>
