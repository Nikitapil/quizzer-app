<template>
  <div></div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useQuizFormStore } from '@/modules/quizes/store/QuizFormStore';
import { useAuthRedirect } from '@/composables/useAuthRedirect';

useAuthRedirect();

const route = useRoute();

const store = useQuizFormStore();
</script>

<style scoped></style>
