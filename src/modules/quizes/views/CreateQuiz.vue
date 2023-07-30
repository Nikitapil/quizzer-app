<template>
  <div class="centered-page">
    <QuizForm :title="$t('create_quiz')" />
  </div>
</template>

<script lang="ts" setup>
import QuizForm from '@/modules/quizes/components/quiz-form/QuizForm.vue';
import { useAuthRedirect } from '@/composables/useAuthRedirect';

useAuthRedirect();
</script>

<style scoped></style>
