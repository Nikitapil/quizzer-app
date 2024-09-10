<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useBreadCrumbs } from '@/modules/app/composables/useBreadCrumbs';
import { BREADCRUMBS } from '@/modules/app/domain/breadcrumbs';

import type { TQuizFormValues } from '@/modules/quizes/domain/types';
import { ERoutesNames } from '@/router/routes-names';

import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { useQuizFormStore } from '@/modules/quizes/store/QuizFormStore';

import QuizForm from '@/modules/quizes/components/quiz-form/QuizForm.vue';
import RoundLoader from '@/components/loaders/RoundLoader.vue';
import QuizNotFound from '@/modules/shared/components/QuizNotFound.vue';

useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.EDIT]);

const route = useRoute();
const router = useRouter();

const store = useQuizFormStore();
const authStore = useAuthStore();

const onEdit = async (data: TQuizFormValues) => {
  const isEditted = await store.editQuiz(data);
  if (isEditted) {
    await router.push({
      name: ERoutesNames.USER_QUIZES,
      params: { id: authStore.user?.id }
    });
  }
};

onMounted(async () => {
  await store.getQuizForm({
    quizId: route.params.id as string
  });
});
</script>

<template>
  <div class="centered-page">
    <RoundLoader v-if="store.isQuizLoading" />

    <QuizNotFound v-else-if="!store.quizForm" />

    <QuizForm
      v-else
      :title="$t('edit_quiz')"
      :is-loading="store.isLoading"
      :initial-values="store.quizForm"
      @submit="onEdit"
    />
  </div>
</template>
