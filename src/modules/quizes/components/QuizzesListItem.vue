<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

import { ERoutesNames } from '@/router/routes-names';
import type { QuizDto } from '@/api/swagger/Quizes/data-contracts';

import Tooltip from '@/components/Tooltip.vue';
import AppButton from '@/components/buttons/AppButton.vue';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';
import AddQuizToFavoritesButton from '@/modules/shared/AddQuizToFavoritesButton/AddQuizToFavoritesButton.vue';

const router = useRouter();

const isDeleteModalOpened = ref(false);

defineEmits<{
  delete: [id: string];
}>();

const props = defineProps<{
  quiz: QuizDto;
  userId: number;
  isDeleteInProgress: boolean;
}>();

const goToQuiz = () => {
  router.push({ name: ERoutesNames.QUIZ, params: { id: props.quiz.id } });
};
</script>

<template>
  <li class="quiz-item">
    <div>
      <h3 class="quiz-item__title">{{ props.quiz.name }}</h3>

      <p class="quiz-item__text">
        {{ props.quiz.questionsCount }} {{ $t('questions_pl') }}
      </p>

      <p
        v-if="props.quiz.rating"
        class="quiz-item__text"
        data-test="rating"
      >
        {{ $t('rating') }}: {{ props.quiz.rating }}
        <Icon
          icon="ic:round-star"
          color="#d2e000"
          width="20"
          height="20"
        />
      </p>

      <p
        v-if="props.quiz.author"
        class="quiz-item__text"
        data-test="author"
      >
        <span>{{ $t('author') }}: </span>

        <RouterLink
          class="user-link"
          :to="{
            name: ERoutesNames.USER_QUIZES,
            params: { id: props.quiz.userId }
          }"
        >
          {{ props.quiz.author }}
        </RouterLink>
      </p>

      <RouterLink
        class="quiz-item__text"
        :to="{
          name: ERoutesNames.COMMENTS,
          params: { id: props.quiz.id }
        }"
      >
        {{ $t('comments') }}: {{ props.quiz.commentsCount }}
      </RouterLink>
    </div>

    <div
      data-test="fav-block"
      class="controls"
    >
      <AddQuizToFavoritesButton
        v-if="props.userId"
        :quiz="props.quiz"
      />

      <Tooltip
        v-if="props.quiz.canEdit"
        :tip="$t('edit')"
      >
        <AppButton
          class="tool-btn"
          data-test="edit"
          with-icon
          @click="
            router.push({
              name: ERoutesNames.EDIT_QUIZ,
              params: { id: props.quiz.id }
            })
          "
        >
          <Icon
            icon="ic:twotone-edit"
            color="#fff"
            width="25"
            height="25"
          />
        </AppButton>
      </Tooltip>

      <Tooltip
        v-if="props.quiz.canDelete"
        :tip="$t('delete')"
      >
        <AppButton
          class="tool-btn"
          data-test="delete"
          appearence="error"
          with-icon
          @click="isDeleteModalOpened = true"
        >
          <Icon
            icon="ic:round-delete"
            color="#fff"
            width="25"
            height="25"
          />
        </AppButton>
      </Tooltip>

      <AppButton
        appearence="dark"
        data-test="play"
        :text="$t('play')"
        @click="goToQuiz"
      />
    </div>
  </li>

  <ConfirmModal
    v-model="isDeleteModalOpened"
    :title="$t('delete_quiz_question')"
    :is-loading="props.isDeleteInProgress"
    :confirm-btn-text="$t('delete')"
    @confirm="$emit('delete', props.quiz.id)"
  />
</template>

<style lang="scss" scoped>
@import '../../../assets/styles/vars';

.quiz-item {
  max-width: 800px;
  width: 100%;
  border-radius: 15px;
  padding: 16px;
  background: $bg-white;
  box-shadow: $shadow-black-common;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__title {
    color: $color-blue;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  &__text {
    color: $color-medium-blue;
    display: flex;
    gap: 3px;
    align-items: center;
    line-height: 1.2;
  }
}

.controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tool-btn {
  padding: 2px !important;
}

.user-link {
  color: inherit;
}
</style>
