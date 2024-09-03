<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { useQuizCommentsList } from '@/modules/comments/comosables/useQuizCommentsList';

import type { IQuizComment } from '@/modules/comments/domain';

import QuizCommentForm from '@/modules/comments/components/QuizCommentForm.vue';
import HorizontalLoader from '@/components/loaders/HorizontalLoader.vue';
import QuizComment from '@/modules/comments/components/QuizComment.vue';
import Pagination from '@/components/Pagination.vue';
import AppButton from '@/components/buttons/AppButton.vue';

const props = withDefaults(
  defineProps<{
    quizId: string;
    parentComment?: IQuizComment;
    emptyText?: string;
  }>(),
  {
    emptyText: ''
  }
);

const authStore = useAuthStore();

const {
  page,
  limit,
  quizComments,
  isCreateQuizCommentInProgress,
  isQuizCommentsLoading,
  totalQuizCommentsCount,
  createQuizComment,
  deleteQuizComment,
  editQuizComment,
  onChangePage,
  loadMoreQuizComments,
  init
} = useQuizCommentsList({
  quizId: props.quizId,
  parentComment: props.parentComment
});

const isAllShowed = computed(
  () => quizComments.value.length === totalQuizCommentsCount.value
);

onMounted(() => {
  init();
});
</script>

<template>
  <div class="quiz-comments-container">
    <QuizCommentForm
      v-if="authStore.user"
      :is-loading="isCreateQuizCommentInProgress"
      @submit="createQuizComment"
    />

    <HorizontalLoader v-if="isQuizCommentsLoading" />

    <div
      v-else-if="!quizComments.length"
      data-testid="empty-text"
    >
      {{ props.emptyText || $t('no_comments') }}
    </div>

    <template v-else>
      <QuizComment
        v-for="comment in quizComments"
        :key="comment.id"
        :comment="comment"
        @delete="deleteQuizComment(comment.id)"
        @edit="editQuizComment"
      />
    </template>

    <Pagination
      v-if="!props.parentComment"
      :total-items-count="totalQuizCommentsCount"
      :limit="limit"
      :current-page="page"
      @change-page="onChangePage"
    />

    <AppButton
      v-else-if="!isAllShowed"
      appearence="dark"
      data-testid="show-more-btn"
      :text="$t('show_more')"
      @click="loadMoreQuizComments"
    />
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
