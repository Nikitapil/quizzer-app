<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { useDocTitle } from '@/composables/useDocTitle';
import { useBreadCrumbs } from '@/modules/app/composables/useBreadCrumbs';
import { BREADCRUMBS } from '@/modules/app/domain/breadcrumbs';

import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { useQuizzesStore } from '@/modules/quizes/store/QuizzesStore';

import type { GetAllQuizesDto } from '@/api/swagger/Quizes/data-contracts';

import QuizzesList from '@/modules/quizes/components/QuizzesList.vue';

const { t } = useI18n();

const route = useRoute();

const authStore = useAuthStore();
const quizzesStore = useQuizzesStore();

const isMyQuizzesPage = computed(() => +route.params.id === authStore.user?.id);

const dynamicBreadCrumb = computed(() =>
  isMyQuizzesPage.value ? BREADCRUMBS.MY_QUIZZES : BREADCRUMBS.USER_QUIZZES
);

const docTitle = computed(() =>
  isMyQuizzesPage.value ? 'my_quizzes' : 'user_quizzes'
);

useBreadCrumbs([BREADCRUMBS.MAIN, dynamicBreadCrumb.value]);
useDocTitle(t(docTitle.value));

const onGetQuizzes = async (data: GetAllQuizesDto) => {
  await quizzesStore.getUserQuizzes({
    data,
    userId: +route.params.id
  });
};

watch(
  () => route.params.id,
  () => {
    onGetQuizzes({
      page: 1,
      limit: 10,
      search: ''
    });
  }
);
</script>

<template>
  <QuizzesList
    :title="$t(docTitle)"
    @get-quizzes="onGetQuizzes"
  />
</template>
