<template>
  <QuizzesList
    :title="$t(docTitle)"
    @get-quizzes="onGetQuizzes"
  />
</template>

<script setup lang="ts">
import { useBreadCrumbs } from '@/composables/useBreadCrumbs';
import { BREADCRUMBS } from '@/constants/breadcrumbs';
import { useDocTitle } from '@/composables/useDocTitle';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { useRoute } from 'vue-router';
import { computed, watch } from 'vue';
import { useQuizzesStore } from '@/modules/quizes/store/QuizzesStore';
import type { IGetQuizzesRequest } from '@/modules/quizes/domain/types';
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

const onGetQuizzes = async (params: IGetQuizzesRequest) => {
  await quizzesStore.getUserQuizzes(params, route.params.id as string);
};

watch(
  () => route.params.id,
  () => {
    onGetQuizzes({});
  }
);
</script>
