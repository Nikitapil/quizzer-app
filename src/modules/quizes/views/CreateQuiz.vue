<template>
  <div class="centered-page">
    <QuizForm
      :title="$t('create_quiz')"
      :is-loading="store.isLoading"
      @submit="onCreate"
    />
  </div>
</template>

<script lang="ts" setup>
import QuizForm from '@/modules/quizes/components/quiz-form/QuizForm.vue';
import { useAuthRedirect } from '@/composables/useAuthRedirect';
import { useQuizFormStore } from '@/modules/quizes/store/QuizFormStore';
import type { IQuizFormValues } from '@/modules/quizes/domain/types';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
import { ERoutesNames } from '@/router/routes-names';
import { useBreadCrumbs } from '@/composables/useBreadCrumbs';
import { BREADCRUMBS } from '@/constants/breadcrumbs';
import { useAuthStore } from '@/modules/auth/store/AuthStore';

useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.CREATE]);
useAuthRedirect();

const router = useRouter();

const store = useQuizFormStore();
const authStore = useAuthStore();

const onCreate = async (data: IQuizFormValues) => {
  const isCreated = await store.createQuiz(data);
  if (isCreated) {
    toast.success('quiz_created');
    await router.push({
      name: ERoutesNames.USER_QUIZES,
      params: { id: authStore.user?.id }
    });
  }
};
</script>
