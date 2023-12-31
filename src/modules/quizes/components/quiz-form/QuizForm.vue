<template>
  <form
    class="form"
    @submit.prevent="onSubmit"
  >
    <h2 class="title">{{ title }}</h2>
    <FormField
      name="quiz-name"
      rules="required"
      :model-value="formValues.name"
    >
      <template #default="{ invalid }">
        <div class="input">
          <AppInput
            id="quiz-name"
            v-model="formValues.name"
            :placeholder="$t('quiz_name_placeholder')"
            :label="$t('quiz_name_label')"
            :is-error="invalid"
            :disabled="isLoading"
          />
        </div>
      </template>
    </FormField>
    <AppCheckboox
      id="is-private"
      v-model="formValues.isPrivate"
      :label="$t('access_only_by_link')"
      :disabled="isLoading"
    />

    <QuizFormQuestion
      v-for="(_, index) in formValues.questions"
      :key="`question-${index}`"
      v-model="formValues.questions[index]"
      :question-number="index + 1"
      :is-loading="isLoading"
      @delete-question="onDeleteQuestion(index)"
    />
    <AppButton
      :text="$t('add_question')"
      data-test="add-question"
      appearence="dark"
      :disabled="isLoading"
      @click="onAddQuestion"
    />
    <AppButton
      appearence="success"
      type="submit"
      size="lg"
      :text="title"
      :disabled="isLoading"
    />
  </form>
</template>

<script setup lang="ts">
import FormField from '@/components/inputs/FormField.vue';
import AppInput from '@/components/inputs/AppInput.vue';
import { onMounted, ref } from 'vue';
import AppCheckboox from '@/components/inputs/AppCheckbox.vue';
import QuizFormQuestion from '@/modules/quizes/components/quiz-form/QuizFormQuestion.vue';
import type { IQuizFormValues } from '@/modules/quizes/domain/types';
import AppButton from '@/components/AppButton.vue';
import { useFormValidate } from '@/composables/useFormValidate';

const props = defineProps<{
  title: string;
  isLoading: boolean;
  initialValues?: IQuizFormValues;
}>();

const emit = defineEmits<{
  submit: [data: IQuizFormValues];
}>();

const { validate } = useFormValidate();

const formValues = ref<IQuizFormValues>({
  name: '',
  isPrivate: false,
  questions: [
    {
      question: '',
      correctAnswer: '',
      incorrectAnswers: ['']
    },
    {
      question: '',
      correctAnswer: '',
      incorrectAnswers: ['']
    },
    {
      question: '',
      correctAnswer: '',
      incorrectAnswers: ['']
    }
  ]
});

const onAddQuestion = () =>
  formValues.value.questions.push({
    question: '',
    correctAnswer: '',
    incorrectAnswers: ['']
  });

const onDeleteQuestion = (index: number) =>
  formValues.value.questions.splice(index, 1);

const onSubmit = async () => {
  const { valid } = await validate();
  if (valid) {
    emit('submit', formValues.value);
  }
};

onMounted(() => {
  if (props.initialValues) {
    formValues.value = {
      ...props.initialValues,
      questions: [...props.initialValues.questions]
    };
  }
});
</script>

<style lang="scss" scoped>
@import '../../../../assets/styles/colors';
.form {
  max-width: 650px;
  width: 100%;
  background: $color-white;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 16px;
  box-shadow: $shadow-black-common, inset 0 65px 45px -15px $color-blue;
  color: $color-blue;
}

.title {
  font-size: 24px;
  font-weight: 700;
  align-self: center;
  color: $color-white;
}
</style>
