<template>
  <div>
    <h1 class="title">{{ $t('all_quizzes') }}</h1>
    <div
      v-if="store.isQuizzesLoading"
      class="loader"
    >
      <RoundLoader />
    </div>
    <div v-else-if="!store.quizzes.length">{{ $t('no_quizzes_yet') }}.</div>
    <div
      v-else
      class="quizzes-container"
    >
      <div class="controls">
        <AppInput
          v-model="search"
          :placeholder="$t('search')"
        />
        <AppButton
          :text="$t('search')"
          @click="onSearch"
        />
      </div>
      <QuizzesListItem
        v-for="quiz in store.quizzes"
        :key="quiz.id"
        :quiz="quiz"
      />
      <Pagination
        :total-items-count="store.totalCount"
        :limit="10"
        :current-page="page"
        @change-page="onChangePage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBreadCrumbs } from '@/composables/useBreadCrumbs';
import { BREADCRUMBS } from '@/constants/breadcrumbs';
import { useDocTitle } from '@/composables/useDocTitle';
import { useI18n } from 'vue-i18n';
import { onMounted, ref } from 'vue';
import { useQuizzesStore } from '@/modules/quizes/store/QuizzesStore';
import RoundLoader from '@/components/loaders/RoundLoader.vue';
import QuizzesListItem from '@/modules/quizes/components/QuizzesListItem.vue';
import Pagination from '@/components/Pagination.vue';
import AppInput from '@/components/inputs/AppInput.vue';
import AppButton from '@/components/AppButton.vue';

const { t } = useI18n();
useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.ALL_QUIZZES]);
useDocTitle(t('all_quizzes'));

const store = useQuizzesStore();

const page = ref(1);
const search = ref('');

const getQuizzes = async () => {
  await store.getAllQuizes({
    page: page.value,
    search: search.value
  });
};

const onSearch = async () => {
  page.value = 1;
  await getQuizzes();
};

const onChangePage = async (p: number) => {
  page.value = p;
  await getQuizzes();
};

onMounted(async () => {
  await getQuizzes();
});
</script>

<style scoped>
.title {
  font-size: 32px;
  text-align: center;
  margin-bottom: 16px;
}

.loader {
  margin: 0 auto;
  width: fit-content;
}

.quizzes-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 16px;
}

.controls {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
