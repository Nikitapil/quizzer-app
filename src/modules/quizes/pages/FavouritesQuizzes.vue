<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import type { GetAllQuizesDto } from '@/api/swagger/Quizes/data-contracts';

import { useDocTitle } from '@/composables/useDocTitle';
import { useBreadCrumbs } from '@/modules/app/composables/useBreadCrumbs';
import { BREADCRUMBS } from '@/modules/app/domain/breadcrumbs';

import { useQuizzesStore } from '@/modules/quizes/store/QuizzesStore';

import QuizzesList from '@/modules/quizes/components/QuizzesList.vue';

const { t } = useI18n();

useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.FAVOURITES]);
useDocTitle(t('favourites'));

const quizzesStore = useQuizzesStore();

const onGetQuizzes = async (params: GetAllQuizesDto) => {
  await quizzesStore.getFavouritesQuizzes(params);
};
</script>

<template>
  <QuizzesList
    :title="$t('favourites')"
    @get-quizzes="onGetQuizzes"
  />
</template>
