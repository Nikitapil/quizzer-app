<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

import type { TQuizFormValues } from '@/modules/quizes/domain/types';
import { ERoutesNames } from '@/router/routes-names';

import { useBreadCrumbs } from '@/modules/app/composables/useBreadCrumbs';
import { BREADCRUMBS } from '@/modules/app/domain/breadcrumbs';

import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { useQuizFormStore } from '@/modules/quizes/store/QuizFormStore';

import QuizForm from '@/modules/quizes/components/quiz-form/QuizForm.vue';

useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.CREATE]);

const router = useRouter();

const store = useQuizFormStore();
const authStore = useAuthStore();

const onCreate = async (data: TQuizFormValues) => {
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

<template>
  <div class="centered-page">
    <QuizForm
      :title="$t('create_quiz')"
      :is-loading="store.isLoading"
      @submit="onCreate"
    />
  </div>
</template>
