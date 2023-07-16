<template>
  <div>
    <h1 class="title">All Quizzes</h1>
  </div>
</template>

<script setup lang="ts">
import { useBreadCrumbs } from '@/composables/useBreadCrumbs';
import { BREADCRUMBS } from '@/constants/breadcrumbs';
import { useDocTitle } from '@/composables/useDocTitle';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.ALL_QUIZZES]);
useDocTitle(t('all_quizzes'));
</script>

<style scoped>
.title {
  font-size: 32px;
  text-align: center;
}
</style>
