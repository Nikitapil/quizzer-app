<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useQuizCommentsPageStore } from '@/modules/comments/store/QuizCommentsPageStore';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { DEFAULT_COMMENTS_REQUEST_LIMIT } from '@/modules/comments/constants';

import QuizNotFound from '@/modules/shared/components/QuizNotFound.vue';
import RoundLoader from '@/components/loaders/RoundLoader.vue';
import HorizontalLoader from '@/components/loaders/HorizontalLoader.vue';
import QuizCommentForm from '@/modules/comments/components/QuizCommentForm.vue';
import QuizComment from '@/modules/comments/components/QuizComment.vue';
import Pagination from '@/components/Pagination.vue';

const route = useRoute();

const authStore = useAuthStore();

const store = useQuizCommentsPageStore();
const page = ref(1);

const onChangePage = async (p: number) => {
  page.value = p;
  await store.loadQuizComments({
    page: page.value,
    limit: DEFAULT_COMMENTS_REQUEST_LIMIT
  });
};

const onCreateQuizComment = async (text: string) => {
  await store.createQuizComment(text);
  await onChangePage(1);
};

const onDeleteQuizComment = async (id: string) => {
  const isDeleted = await store.deleteQuizComment(id);
  if (isDeleted) {
    const nextPage = store.quizComments.length === 1 ? 1 : page.value;
    await onChangePage(nextPage);
  }
};

onMounted(async () => {
  await store.init(route.params.id as string);
});
</script>

<template>
  <div class="page">
    <div
      v-if="store.isQuizLoading"
      class="centered-page"
    >
      <RoundLoader />
    </div>

    <QuizNotFound v-else-if="!store.quiz" />

    <div
      v-else
      class="quiz-comments-container"
    >
      <h2 class="text-center page-title">
        {{ $t('quiz_discussion') }}: {{ store.quiz.name }}
      </h2>

      <QuizCommentForm
        v-if="authStore.user"
        :is-loading="store.isCreateQuizCommentInProgress"
        @submit="onCreateQuizComment"
      />

      <HorizontalLoader v-if="store.isQuizCommentsLoading" />

      <div v-else-if="!store.quizComments.length">{{ $t('no_comments') }}</div>

      <template v-else>
        <QuizComment
          v-for="comment in store.quizComments"
          :key="comment.id"
          :comment="comment"
          @delete="onDeleteQuizComment(comment.id)"
          @edit="store.editQuizComment"
        />
      </template>

      <Pagination
        :total-items-count="store.totalQuizCommentsCount"
        :limit="DEFAULT_COMMENTS_REQUEST_LIMIT"
        :current-page="page"
        @change-page="onChangePage"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.quiz-comments-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
}
</style>
