<template>
  <QuizzesList
    :title="$t('favourites')"
    @get-quizzes="onGetQuizzes"
    @toggle-favourites="onGetQuizzes"
  />
</template>

<script setup lang="ts">
import type { IGetQuizzesRequest } from '@/modules/quizes/domain/types';
import { useQuizzesStore } from '@/modules/quizes/store/QuizzesStore';
import QuizzesList from '@/modules/quizes/components/QuizzesList.vue';
import { useI18n } from 'vue-i18n';
import { useBreadCrumbs } from '@/composables/useBreadCrumbs';
import { BREADCRUMBS } from '@/constants/breadcrumbs';
import { useDocTitle } from '@/composables/useDocTitle';
import { useAuthRedirect } from '@/composables/useAuthRedirect';

const { t } = useI18n();

useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.FAVOURITES]);
useDocTitle(t('favourites'));
useAuthRedirect();

const quizzesStore = useQuizzesStore();

const onGetQuizzes = async (params: IGetQuizzesRequest) => {
  await quizzesStore.getFavouritesQuizzes(params);
};
</script>
