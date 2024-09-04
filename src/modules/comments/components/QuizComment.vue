<script setup lang="ts">
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';

import { formatDateToClient } from '@/helpers/dates';

import type { IQuizComment } from '@/modules/comments/domain';
import type { EditQuizCommentDto } from '@/api/swagger/Quizes/data-contracts';

import IconButton from '@/components/buttons/IconButton.vue';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';
import QuizCommentForm from '@/modules/comments/components/QuizCommentForm.vue';
import AppButton from '@/components/buttons/AppButton.vue';
import RoundLoader from '@/components/loaders/RoundLoader.vue';
import QuizCommentsList from '@/modules/comments/components/QuizCommentsList.vue';

const props = defineProps<{
  comment: IQuizComment;
}>();

const emit = defineEmits<{
  delete: [];
  edit: [EditQuizCommentDto];
}>();

const isDeleteModalOpened = ref(false);
const isEditMode = ref(false);
const isShowReplies = ref(false);

const date = computed(() =>
  formatDateToClient(props.comment.updatedAt || props.comment.createdAt)
);

const onEdit = (text: string) => {
  emit('edit', { id: props.comment.id, text });
  isEditMode.value = false;
};
</script>

<template>
  <article class="quiz-comment">
    <div v-if="props.comment.isEditInProgress">
      <RoundLoader color="blue" />
    </div>

    <QuizCommentForm
      v-else-if="isEditMode"
      :is-loading="props.comment.isEditInProgress"
      :initial-value="props.comment.text"
      @submit="onEdit"
    >
      <template #additional-actions>
        <AppButton
          appearence="error"
          data-test="close-edit-btn"
          :text="$t('cancel')"
          :disabled="props.comment.isEditInProgress"
          @click="isEditMode = false"
        />
      </template>
    </QuizCommentForm>

    <template v-else>
      <div class="quiz-comment__header">
        <div class="quiz-comment__title">
          <p data-testid="comment-date">{{ date }}</p>
          <p class="font-bold">{{ props.comment.authorName }}</p>
        </div>

        <div class="quiz-comment__controls">
          <IconButton
            v-if="props.comment.canEdit"
            icon="ic:twotone-edit"
            appearance="primary"
            color="#fff"
            data-test="edit-btn"
            @click="isEditMode = true"
          />

          <IconButton
            v-if="props.comment.canDelete"
            icon="ic:round-delete"
            appearance="error"
            color="#fff"
            data-test="delete-btn"
            @click="isDeleteModalOpened = true"
          />
        </div>
      </div>

      <ConfirmModal
        v-model="isDeleteModalOpened"
        :title="$t('confirm_delete_comment_question')"
        @confirm="$emit('delete')"
      />

      <p class="quiz-comment__text">{{ props.comment.text }}</p>

      <hr class="mt-s" />

      <div class="mt-s">
        <AppButton
          appearence="dark"
          data-test="replies-btn"
          with-icon
          @click="isShowReplies = !isShowReplies"
        >
          <Icon icon="ri:reply-fill" />
          {{ $t('replies') }} {{ comment.repliesCount }}
        </AppButton>

        <div
          v-if="isShowReplies"
          class="replies"
          data-test="replies"
        >
          <QuizCommentsList
            :quiz-id="props.comment.quizId"
            :parent-comment="props.comment"
            :empty-text="$t('no_replies')"
          />
        </div>
      </div>
    </template>
  </article>
</template>

<style lang="scss" scoped>
@import '../../../assets/styles/vars';

.quiz-comment {
  width: 100%;
  border-radius: $border-radius-md;
  background: $bg-white;
  padding: 1rem;
  color: black;
  box-shadow: $shadow-black-common;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
  }

  &__title {
    display: flex;
    gap: 8px;
    color: $color-dark-md;
    font-size: 0.9rem;
  }

  &__controls {
    display: flex;
    gap: 8px;
  }

  &__text {
    font-size: 1.2rem;
    line-height: 1.2;
  }

  .replies {
    margin-left: 1rem;
    margin-top: 1rem;
    padding-left: 1rem;
    border-left: 1px solid $color-dark-md;
  }

  .no-replies {
    margin-top: 1.5rem;
    font-size: 1.3rem;
    line-height: 1.2rem;
    font-weight: bold;
    text-align: center;
  }
}
</style>
