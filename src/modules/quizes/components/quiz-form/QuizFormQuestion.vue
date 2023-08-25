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
    <FormField
      :name="localId"
      rules="required"
      :model-value="questionFormValues.question"
    >
      <template #default="{ invalid }">
        <div class="input">
          <AppInput
            :id="localId"
            v-model="questionFormValues.question"
            :placeholder="$t('question_placeholder')"
            :label="$t('question_label')"
            :is-error="invalid"
            :disabled="isLoading"
          />
        </div>
      </template>
    </FormField>
    <FormField
      :name="`correct-${localId}`"
      rules="required"
      :model-value="questionFormValues.correctAnswer"
    >
      <template #default="{ invalid }">
        <div class="input">
          <AppInput
            :id="`correct-${localId}`"
            v-model="questionFormValues.correctAnswer"
            :placeholder="$t('correct_answer_placeholder')"
            :label="$t('correct_answer_label')"
            :is-error="invalid"
            :disabled="isLoading"
          />
        </div>
      </template>
    </FormField>
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

<script setup lang="ts">
import { computed } from 'vue';
import FormField from '@/components/inputs/FormField.vue';
import AppInput from '@/components/inputs/AppInput.vue';
import type { IQuizFormQuestion } from '@/modules/quizes/domain/types';
import AppButton from '@/components/AppButton.vue';
import QuizFormIncorrectAnswer from '@/modules/quizes/components/quiz-form/QuizFormIncorrectAnswer.vue';
import { Icon } from '@iconify/vue';

const questionFormValues = defineModel<IQuizFormQuestion>({ required: true });

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

<style lang="scss" scoped>
@import '../../../../assets/styles/colors';
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
