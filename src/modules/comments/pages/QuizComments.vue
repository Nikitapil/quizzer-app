<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { useQuizCommentsPageStore } from '@/modules/comments/store/QuizCommentsPageStore';

import QuizNotFound from '@/modules/shared/components/QuizNotFound.vue';
import RoundLoader from '@/components/loaders/RoundLoader.vue';
import QuizCommentsList from '@/modules/comments/components/QuizCommentsList.vue';

const route = useRoute();

const store = useQuizCommentsPageStore();

const quizId = computed(() => route.params.id as string);

onMounted(async () => {
  await store.init(quizId.value);
});

onBeforeUnmount(() => {
  store.reset();
});
</script>

<template>
  <div class="page">
    <div
      v-if="store.isQuizLoading"
      class="centered-page"
    >
      <RoundLoader />
    </div>

    <QuizNotFound v-else-if="!store.quiz" />

    <div
      v-else
      class="quiz-comments-container"
    >
      <h2 class="text-center page-title mb-m">
        {{ $t('quiz_discussion') }}: {{ store.quiz.name }}
      </h2>

      <QuizCommentsList :quiz-id="quizId" />
    </div>
  </div>
</template>
