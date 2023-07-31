<template>
  <li class="quiz-item">
    <div>
      <h3 class="quiz-item__title">{{ quiz.name }}</h3>
      <p class="quiz-item__text">
        {{ quiz.questionsCount }} {{ $t('questions_pl') }}
      </p>
      <p
        v-if="quiz.rating"
        class="quiz-item__text"
      >
        {{ $t('rating') }}: {{ quiz.rating }}
        <Icon
          icon="ic:round-star"
          color="#d2e000"
          width="20"
          height="20"
        />
      </p>
      <p
        v-if="quiz.author"
        class="quiz-item__text"
      >
        {{ $t('author') }}: {{ quiz.author }}
      </p>
    </div>
    <div class="controls">
      <template v-if="isShowQuizUserBtns">
        <AppButton
          class="tool-btn"
          with-icon
          @click="
            router.push({
              name: ERoutesNames.EDIT_QUIZ,
              params: { id: quiz.id }
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
      </template>
      <AppButton
        appearence="dark"
        :text="$t('play')"
        @click="goToQuiz"
      />
    </div>
  </li>
</template>

<script setup lang="ts">
import type { IQuiz } from '@/modules/quizes/domain/types';
import AppButton from '@/components/AppButton.vue';
import { useRouter } from 'vue-router';
import { ERoutesNames } from '@/router/routes-names';
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

const router = useRouter();

const props = defineProps<{
  quiz: IQuiz;
  userId: number;
}>();

const goToQuiz = () => {
  router.push({ name: ERoutesNames.QUIZ, params: { id: props.quiz.id } });
};

const isShowQuizUserBtns = computed(() => props.quiz.userId === props.userId);
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/colors';

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
    align-items: center;
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
</style>
