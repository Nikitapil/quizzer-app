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
      </p>
      <p
        v-if="quiz.author"
        class="quiz-item__text"
      >
        {{ $t('author') }}: {{ quiz.author }}
      </p>
    </div>
    <div>
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

const router = useRouter();

const props = defineProps<{
  quiz: IQuiz;
}>();

const goToQuiz = () => {
  router.push({ name: ERoutesNames.QUIZ, params: { id: props.quiz.id } });
};
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
  }
}
</style>
