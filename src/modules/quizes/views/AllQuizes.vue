<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { BREADCRUMBS } from '@/modules/app/domain/breadcrumbs';
import { useBreadCrumbs } from '@/modules/app/composables/useBreadCrumbs';

import { useDocTitle } from '@/composables/useDocTitle';

import { useQuizzesStore } from '@/modules/quizes/store/QuizzesStore';

import QuizzesList from '@/modules/quizes/components/QuizzesList.vue';

const { t } = useI18n();
useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.ALL_QUIZZES]);
useDocTitle(t('all_quizzes'));

const store = useQuizzesStore();
</script>

<template>
  <QuizzesList
    :title="$t('all_quizzes')"
    @get-quizzes="store.getAllQuizes"
  />
</template>
