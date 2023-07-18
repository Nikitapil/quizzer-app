<template>
  <QuizzesList
    :title="$t('all_quizzes')"
    @get-quizzes="store.getAllQuizes"
  />
</template>

<script setup lang="ts">
import { useBreadCrumbs } from '@/composables/useBreadCrumbs';
import { BREADCRUMBS } from '@/constants/breadcrumbs';
import { useDocTitle } from '@/composables/useDocTitle';
import { useI18n } from 'vue-i18n';
import { useQuizzesStore } from '@/modules/quizes/store/QuizzesStore';
import QuizzesList from '@/modules/quizes/components/QuizzesList.vue';

const { t } = useI18n();
useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.ALL_QUIZZES]);
useDocTitle(t('all_quizzes'));

const store = useQuizzesStore();
</script>
