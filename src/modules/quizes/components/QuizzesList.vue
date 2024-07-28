<template>
  <div>
    <h1 class="title">{{ title }}</h1>
    <form
      v-if="isShowSearch"
      class="controls"
      @submit.prevent
    >
      <AppInput
        v-model="search"
        id="search"
        name="search"
        full-width
        :placeholder="$t('search')"
      />
      <AppButton
        type="submit"
        data-test="search"
        :text="$t('search')"
        @click="onSearch"
      />
    </form>
    <div
      v-if="store.isQuizzesLoading"
      class="loader"
    >
      <RoundLoader />
    </div>
    <div
      v-else-if="!store.quizzes.length"
      data-test="no-quizzes"
    >
      {{ $t('no_quizzes_yet') }}.
    </div>
    <ul
      v-else
      class="quizzes-container"
    >
      <QuizzesListItem
        v-for="quiz in store.quizzes"
        :key="quiz.id"
        :quiz="quiz"
        :user-id="userId"
        :is-delete-in-progress="store.isDeleteInProgress"
        :is-toggle-favourites-in-progress="store.isToggleFavouritesInProgress"
        :is-admin="authStore.isAdmin"
        @delete="onDelete"
      />
      <Pagination
        :total-items-count="store.totalCount"
        :limit="10"
        :current-page="page"
        @change-page="onChangePage"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useQuizzesStore } from '@/modules/quizes/store/QuizzesStore';
import RoundLoader from '@/components/loaders/RoundLoader.vue';
import QuizzesListItem from '@/modules/quizes/components/QuizzesListItem.vue';
import Pagination from '@/components/Pagination.vue';
import AppInput from '@/components/inputs/AppInput.vue';
import AppButton from '@/components/buttons/AppButton.vue';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import type { GetAllQuizesDto } from '@/api/swagger/Quizes/data-contracts';

defineProps<{
  title: string;
}>();

const emit = defineEmits<{
  'get-quizzes': [quizParams: GetAllQuizesDto];
  'toggle-favourites': [quizParams: GetAllQuizesDto];
}>();

const store = useQuizzesStore();
const authStore = useAuthStore();

const userId = computed(() => authStore.user?.id || 0);

const page = ref(1);
const search = ref('');
const isSearched = ref(false);

const getQuizzes = async () => {
  emit('get-quizzes', {
    page: page.value,
    search: search.value,
    limit: 10
  });
};

const onDelete = async (id: string) => {
  await store.deleteQuiz(id);
  await getQuizzes();
};

const onSearch = () => {
  page.value = 1;
  isSearched.value = !!search.value;
  getQuizzes();
};

const onChangePage = (p: number) => {
  page.value = p;
  getQuizzes();
};

const isShowSearch = computed(() => {
  return (
    !store.isQuizzesLoading && (!!store.quizzes.length || !!isSearched.value)
  );
});

onMounted(() => {
  getQuizzes();
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
  margin: 0 auto 16px;
  max-width: 800px;
}
</style>
