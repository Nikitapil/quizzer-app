<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { useGameStore } from '@/modules/game/store/GameStore';
import { useAuthStore } from '@/modules/auth/store/AuthStore';

import { useDocTitle } from '@/composables/useDocTitle';
import { useBreadCrumbs } from '@/modules/app/composables/useBreadCrumbs';
import { BREADCRUMBS } from '@/modules/app/domain/breadcrumbs';

import AppButton from '@/components/buttons/AppButton.vue';
import StarRating from '@/components/StarRating.vue';
import GameQuestion from '@/modules/game/components/GameQuestion.vue';
import RoundLoader from '@/components/loaders/RoundLoader.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import HorizontalLoader from '@/components/loaders/HorizontalLoader.vue';
import AddQuizToFavoritesButton from '@/modules/shared/AddQuizToFavoritesButton/AddQuizToFavoritesButton.vue';
import { ERoutesNames } from '@/router/routes-names';

const { t } = useI18n();
useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.GAME]);
useDocTitle(t('play_quiz'));

const route = useRoute();
const store = useGameStore();
const authStore = useAuthStore();

onMounted(async () => {
  const { id } = route.params;
  if (id) {
    await store.init(id as string);
  }
});
</script>

<template>
  <div class="centered-page">
    <HorizontalLoader v-if="store.isPageLoading" />

    <h1
      v-else
      class="title"
    >
      {{ store.quizName }}
    </h1>

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

      <div v-else-if="store.currentQuestion">
        <p
          class="total"
          data-test="total-info"
        >
          {{ store.currentQuestionIndex + 1 }}/{{ store.totalQuestionsCount }}
        </p>

        <div class="progress">
          <ProgressBar :progress="store.progress" />
        </div>

        <GameQuestion
          :is-loading="store.isAnswerLoading"
          :correct-answer="store.currentCorrectAnswer"
          :question="store.currentQuestion"
          :is-generated="store.game.isGenerated"
          @answer="store.onAnswer"
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
          {{ $t('your_result') }}: {{ store.correctAnswersCount }}/{{
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

          <AddQuizToFavoritesButton
            :quiz="store.game"
            class="favorite-btn"
            with-text
          />

          <RouterLink
            class="comment-link"
            :to="{
              name: ERoutesNames.COMMENTS,
              params: { id: store.game.id }
            }"
          >
            {{ $t('comments') }}
          </RouterLink>
        </div>

        <AppButton
          :text="$t('play_again')"
          data-test="restart-btn"
          appearence="white"
          size="lg"
          @click="store.resetGameValues"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-size: 24px;
  font-weight: 700;
  align-self: flex-start;
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

.favorite-btn {
  margin: 8px auto 0 auto;
}

.comment-link {
  display: block;
  text-align: center;
  margin-top: 0.5rem;
  color: #fff;
}
</style>
