<template>
  <div class="page">
    <h1 class="title">{{ store.quizName }}</h1>
    <div class="quiz-info">
      <RoundLoader v-if="store.isPageLoading" />
      <div v-else-if="!store.game">
        <h2 class="not-found">{{ $t('quiz_not_found') }}</h2>
      </div>
      <div v-else-if="currentQuestion">
        <p class="total">
          {{ currentQuestionIndex + 1 }}/{{ store.totalQuestionsCount }}
        </p>
        <GameQuestion
          :is-loading="store.isAnswerLoading"
          :correct-answer="currentCorrectAnswer"
          :question="currentQuestion"
          @answer="onAnswer"
        />
      </div>
      <div
        v-else
        class="result"
      >
        <p class="result-text">
          {{ $t('your_result') }}: {{ correctAnswersCount }}/{{
            store.totalQuestionsCount
          }}
        </p>
        <AppButton
          :text="$t('play_again')"
          appearence="white"
          size="lg"
          @click="restart"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { useGameStore } from '@/modules/game/store/GameStore';
import RoundLoader from '@/components/loaders/RoundLoader.vue';
import GameQuestion from '@/modules/game/components/GameQuestion.vue';
import AppButton from '@/components/AppButton.vue';
import { useBreadCrumbs } from '@/composables/useBreadCrumbs';
import { BREADCRUMBS } from '@/constants/breadcrumbs';

useBreadCrumbs([BREADCRUMBS.main, BREADCRUMBS.game]);

const route = useRoute();
const store = useGameStore();

const currentQuestionIndex = ref(0);
const correctAnswersCount = ref(0);
const currentCorrectAnswer = ref<string | null>(null);

const currentQuestion = computed(
  () => store.game?.questions[currentQuestionIndex.value] || null
);

const goToNextQuestion = () => {
  currentQuestionIndex.value++;
  currentCorrectAnswer.value = null;
};

const onAnswer = async (answer: string) => {
  if (currentQuestion.value && !currentCorrectAnswer.value) {
    currentCorrectAnswer.value = await store.getCorrectAnswer(
      currentQuestion.value?.id
    );
    if (answer === currentCorrectAnswer.value) {
      correctAnswersCount.value++;
    }
    setTimeout(() => {
      goToNextQuestion();
    }, 2000);
  }
};

const restart = () => {
  currentQuestionIndex.value = 0;
  correctAnswersCount.value = 0;
  currentCorrectAnswer.value = null;
};

onMounted(async () => {
  const { id } = route.params;
  if (id) {
    await store.getGame(id as string);
  }
});
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/vars';

.page {
  min-height: $main-height;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.title {
  font-size: 24px;
  font-weight: 700;
}

.quiz-info {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.not-found {
  font-size: 34px;
}

.total {
  font-size: 20px;
  margin-bottom: 16px;
  text-align: center;
}

.result-text {
  font-size: 32px;
  margin-bottom: 16px;
}

.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
</style>
