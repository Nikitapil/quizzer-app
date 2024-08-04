<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

import AppInput from '@/components/inputs/AppInput.vue';
import QuizFormIncorrectAnswer from '@/modules/quizes/components/quiz-form/QuizFormIncorrectAnswer.vue';
import AppButton from '@/components/buttons/AppButton.vue';
import type { CreateQuizQuestionDto } from '@/api/swagger/Quizes/data-contracts';

const questionFormValues = defineModel<CreateQuizQuestionDto>({
  required: true
});

const props = defineProps<{
  questionNumber: number;
  isLoading: boolean;
}>();

defineEmits(['delete-question']);

const localId = computed(() => `question-${props.questionNumber}`);

const onAddIncorrectAnswer = () =>
  questionFormValues.value.incorrectAnswers.push('');

const onDeleteIncorrectAnswer = (index: number) =>
  questionFormValues.value.incorrectAnswers.splice(index, 1);
</script>

<template>
  <div class="question">
    <h3 class="title">{{ $t('question_number') }}{{ questionNumber }}</h3>

    <AppButton
      v-if="questionNumber > 3"
      data-test="delete-question"
      class="delete-btn"
      with-icon
      appearence="transparent"
      :disabled="isLoading"
      @click="$emit('delete-question')"
    >
      <Icon
        icon="iwwa:delete"
        color="#2264ab"
        width="24"
        height="24"
      />
    </AppButton>

    <AppInput
      v-model="questionFormValues.question"
      :id="localId"
      :name="localId"
      :placeholder="$t('question_placeholder')"
      :label="$t('question_label')"
      :disabled="isLoading"
      rules="required"
    />

    <AppInput
      v-model="questionFormValues.correctAnswer"
      :id="`correct-${localId}`"
      :name="`correct-${localId}`"
      :placeholder="$t('correct_answer_placeholder')"
      :label="$t('correct_answer_label')"
      :disabled="isLoading"
      rules="required"
    />

    <h4 class="incorrect-title">{{ $t('incorrect_answers') }}</h4>

    <QuizFormIncorrectAnswer
      v-for="(_, index) in questionFormValues.incorrectAnswers"
      :key="`incorrect-${index}`"
      v-model="questionFormValues.incorrectAnswers[index]"
      :index="index"
      :question-id="localId"
      :is-loading="isLoading"
      @delete-answer="onDeleteIncorrectAnswer(index)"
    />

    <AppButton
      v-if="questionFormValues.incorrectAnswers.length < 5"
      data-test="add-incorrect-answer"
      full
      :text="$t('add_incorrect_answer')"
      :disabled="isLoading"
      @click="onAddIncorrectAnswer"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '../../../../assets/styles/vars';

.title {
  font-size: 24px;
  text-align: center;
}

.incorrect-title {
  font-size: 20px;
  text-align: center;
}

.question {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid $color-blue;
  padding: 8px;
  border-radius: 5px;
  position: relative;
}

.delete-btn {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>
