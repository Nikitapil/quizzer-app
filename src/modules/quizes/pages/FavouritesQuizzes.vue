<template>
  <QuizzesList
    :title="$t('favourites')"
    @get-quizzes="onGetQuizzes"
    @toggle-favourites="onGetQuizzes"
  />
</template>

<script setup lang="ts">
import { useQuizzesStore } from '@/modules/quizes/store/QuizzesStore';
import QuizzesList from '@/modules/quizes/components/QuizzesList.vue';
import { useI18n } from 'vue-i18n';
import { useBreadCrumbs } from '@/modules/app/composables/useBreadCrumbs';
import { BREADCRUMBS } from '@/modules/app/domain/breadcrumbs';
import { useDocTitle } from '@/composables/useDocTitle';
import type { GetAllQuizesDto } from '@/api/swagger/Quizes/data-contracts';

const { t } = useI18n();

useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.FAVOURITES]);
useDocTitle(t('favourites'));

const quizzesStore = useQuizzesStore();

const onGetQuizzes = async (params: GetAllQuizesDto) => {
  await quizzesStore.getFavouritesQuizzes(params);
};
</script>
