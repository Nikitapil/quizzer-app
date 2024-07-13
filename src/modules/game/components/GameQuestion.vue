<template>
  <div class="question">
    <h3
      class="question-text"
      v-html="question.question"
    ></h3>
    <div class="answers">
      <AppButton
        v-for="answer in question.answers"
        :key="answer"
        :appearence="answer === correctAnswer ? 'success' : 'white'"
        :disabled="isLoading"
        full
        @click="$emit('answer', answer)"
        v-html="answer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IQuestion } from '@/modules/game/domain/types';
import AppButton from '@/components/buttons/AppButton.vue';

defineProps<{
  question: IQuestion;
  correctAnswer: string | null;
  isLoading: boolean;
}>();

defineEmits<{
  answer: [answer: string];
}>();
</script>

<style lang="scss" scoped>
.question {
  max-width: 800px;
  width: 100%;
}

.question-text {
  font-size: 24px;
  margin-bottom: 24px;
  text-align: center;
}

.answers {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
