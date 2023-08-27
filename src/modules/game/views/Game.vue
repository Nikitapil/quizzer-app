<template>
  <div class="page">
    <h1 class="title">{{ store.quizName }}</h1>
    <div class="quiz-info">
      <RoundLoader v-if="store.isPageLoading" />
      <div v-else-if="!store.game">
        <h2
          class="not-found"
          data-test="error-text"
        >
          {{ $t('quiz_not_found') }}
        </h2>
      </div>
      <div v-else-if="currentQuestion">
        <p
          class="total"
          data-test="total-info"
        >
          {{ currentQuestionIndex + 1 }}/{{ store.totalQuestionsCount }}
        </p>
        <div class="progress">
          <ProgressBar :progress="progress" />
        </div>
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
        data-test="result"
      >
        <p
          class="result-text"
          data-test="result-text"
        >
          {{ $t('your_result') }}: {{ correctAnswersCount }}/{{
            store.totalQuestionsCount
          }}
        </p>
        <div
          v-if="authStore.user"
          data-test="user-btns"
        >
          <div class="rating">
            <span>{{ $t('rate_quiz') }}</span>
            <StarRating
              :is-loading="store.isRateInProgress"
              @select="store.rateQuiz"
            />
          </div>
          <AppButton
            class="fav-btn"
            data-test="fav-button"
            appearence="dark"
            :disabled="store.isToggleFavouritesInProgress"
            @click="store.toggleFavouriteQuiz"
          >
            <span>{{ favouritesBtnText }}</span>
            <Icon
              :icon="favouritesBtnIcon"
              color="#d2e000"
              width="24"
              height="24"
            />
          </AppButton>
        </div>
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
import { useDocTitle } from '@/composables/useDocTitle';
import { useI18n } from 'vue-i18n';
import StarRating from '@/components/StarRating.vue';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import ProgressBar from '@/components/ProgressBar.vue';
import { Icon } from '@iconify/vue';

const { t } = useI18n();
useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.GAME]);
useDocTitle(t('play_quiz'));

const route = useRoute();
const store = useGameStore();
const authStore = useAuthStore();

const currentQuestionIndex = ref(0);
const correctAnswersCount = ref(0);
const currentCorrectAnswer = ref<string | null>(null);

const currentQuestion = computed(
  () => store.game?.questions[currentQuestionIndex.value] || null
);

const progress = computed(
  () => (currentQuestionIndex.value / (store.totalQuestionsCount - 1)) * 100
);

const favouritesBtnIcon = computed(() =>
  store.game?.isInFavourites ? 'ion:star' : 'ion:star-outline'
);

const favouritesBtnText = computed(() =>
  store.game?.isInFavourites
    ? t('remove_from_favourites')
    : t('add_to_favourites')
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

.rating {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 18px;
}

.progress {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 16px;
}

.fav-btn {
  margin: 8px auto 0 auto;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
