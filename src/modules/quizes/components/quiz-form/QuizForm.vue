<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useForm } from 'vee-validate';

import { QuizFormQuestionDto } from '@/modules/quizes/components/quiz-form/dtos';
import type { CreateQuizDto } from '@/api/swagger/Quizes/data-contracts';

import QuizFormQuestion from '@/modules/quizes/components/quiz-form/QuizFormQuestion.vue';
import AppButton from '@/components/buttons/AppButton.vue';
import AppCheckbox from '@/components/inputs/AppCheckbox.vue';
import AppInput from '@/components/inputs/AppInput.vue';

const props = defineProps<{
  title: string;
  isLoading: boolean;
  initialValues?: CreateQuizDto;
}>();

const emit = defineEmits<{
  submit: [data: CreateQuizDto];
}>();

const { validate } = useForm();

const formValues = ref<CreateQuizDto>({
  name: '',
  isPrivate: false,
  questions: [
    new QuizFormQuestionDto(),
    new QuizFormQuestionDto(),
    new QuizFormQuestionDto()
  ]
});

const onAddQuestion = () =>
  formValues.value.questions.push(new QuizFormQuestionDto());

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

<template>
  <form
    class="form"
    @submit.prevent="onSubmit"
  >
    <h2 class="title">{{ props.title }}</h2>

    <AppInput
      v-model="formValues.name"
      id="quiz-name"
      name="name"
      rules="required"
      :placeholder="$t('quiz_name_placeholder')"
      :label="$t('quiz_name_label')"
      :disabled="props.isLoading"
    />

    <AppCheckbox
      v-model="formValues.isPrivate"
      id="is-private"
      :label="$t('access_only_by_link')"
      :disabled="props.isLoading"
    />

    <QuizFormQuestion
      v-for="(_, index) in formValues.questions"
      :key="`question-${index}`"
      v-model="formValues.questions[index]"
      :question-number="index + 1"
      :is-loading="props.isLoading"
      @delete-question="onDeleteQuestion(index)"
    />

    <AppButton
      :text="$t('add_question')"
      data-test="add-question"
      appearence="dark"
      :disabled="props.isLoading"
      @click="onAddQuestion"
    />

    <AppButton
      appearence="success"
      type="submit"
      size="lg"
      :text="title"
      :isLoading="props.isLoading"
    />
  </form>
</template>

<style lang="scss" scoped>
@import '../../../../assets/styles/vars';
.form {
  max-width: 650px;
  width: 100%;
  background: $color-white;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 16px;
  box-shadow: $form-shadow;
  color: $color-blue;
}

.title {
  font-size: 24px;
  font-weight: 700;
  align-self: center;
  color: $color-white;
}
</style>
