<template>
  <div class="centered-page">
    <RoundLoader v-if="store.isQuizLoading" />
    <div
      v-else-if="!store.quizForm"
      class="not-found"
    >
      {{ $t('quiz_not_found') }}
    </div>
    <QuizForm
      v-else
      :title="$t('edit_quiz')"
      :is-loading="store.isLoading"
      :initial-values="store.quizForm"
      @submit="onEdit"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useQuizFormStore } from '@/modules/quizes/store/QuizFormStore';
import { useAuthRedirect } from '@/composables/useAuthRedirect';
import { useBreadCrumbs } from '@/composables/useBreadCrumbs';
import { BREADCRUMBS } from '@/constants/breadcrumbs';
import { onMounted } from 'vue';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import RoundLoader from '@/components/loaders/RoundLoader.vue';
import QuizForm from '@/modules/quizes/components/quiz-form/QuizForm.vue';
import { IQuizFormValues } from '@/modules/quizes/domain/types';
import { ERoutesNames } from '@/router/routes-names';

useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.EDIT]);
useAuthRedirect();

const route = useRoute();
const router = useRouter();

const store = useQuizFormStore();
const authStore = useAuthStore();

const onEdit = async (data: IQuizFormValues) => {
  const isEditted = await store.editQuiz(data);
  if (isEditted) {
    // TODO change route to my quizes page
    await router.push({ name: ERoutesNames.ALL_QUIZES });
  }
};

onMounted(async () => {
  await store.getQuizForm({
    quizId: route.params.id as string,
    userId: authStore.user?.id || 0
  });
});
</script>

<style lang="scss" scoped>
.not-found {
  font-size: 24px;
  font-weight: 700;
}
</style>
