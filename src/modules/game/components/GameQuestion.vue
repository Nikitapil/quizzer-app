<script setup lang="ts">
import AppButton from '@/components/buttons/AppButton.vue';
import DynamicVHtml from '@/components/DynamicVHtml.vue';
import type { PlayQuestionDto } from '@/api/swagger/Quizes/data-contracts';

const props = defineProps<{
  question: PlayQuestionDto;
  correctAnswer: string | null;
  isLoading: boolean;
  isGenerated: boolean;
}>();

defineEmits<{
  answer: [answer: string];
}>();
</script>

<template>
  <div class="question">
    <h3 class="question-text">
      <DynamicVHtml
        :content="props.question.question"
        :use-v-html="props.isGenerated"
      />
    </h3>

    <div class="answers">
      <AppButton
        v-for="answer in props.question.answers"
        :key="answer"
        :appearence="answer === props.correctAnswer ? 'success' : 'white'"
        :disabled="props.isLoading"
        full
        @click="$emit('answer', answer)"
      >
        <DynamicVHtml
          :content="answer"
          :use-v-html="props.isGenerated"
        />
      </AppButton>
    </div>
  </div>
</template>

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
