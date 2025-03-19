<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';

import { useDocTitle } from '@/composables/useDocTitle';
import { useBreadCrumbs } from '@/modules/app/composables/useBreadCrumbs';

import { useHomeStore } from '@/modules/home/store/HomeStore';
import { useAuthStore } from '@/modules/auth/store/AuthStore';

import {
  difficultiesOptions,
  questionTypeOptions
} from '@/modules/home/domain/constants';

import type {
  IGenerateQuizValues,
  QuestionCountKeys
} from '@/modules/home/domain/types';

import { ERoutesNames } from '@/router/routes-names';

import AppButton from '@/components/buttons/AppButton.vue';
import AppSelect from '@/components/inputs/AppSelect.vue';
import AppInput from '@/components/inputs/AppInput.vue';

useBreadCrumbs([]);

const { t } = useI18n();

useDocTitle('');

const store = useHomeStore();
const authStore = useAuthStore();
const router = useRouter();

const { validate } = useForm();

const generateQuizValues = ref<IGenerateQuizValues>({
  category: '',
  difficulty: '',
  type: '',
  amount: 50
});

const maxQuestionsCount = computed(() => {
  return (
    store.categoryQuestionsCount[
      generateQuizValues.value.difficulty as QuestionCountKeys
    ] || store.categoryQuestionsCount.all
  );
});

const amountLabel = computed(() => {
  return `${t('set_amount_of_questions')} (max: ${maxQuestionsCount.value})`;
});

const amountRules = computed(() => ({
  max_value: maxQuestionsCount.value,
  min_value: 1,
  required: true
}));

const onChangeCategory = async () => {
  await store.getCategoryQuestionsCount(generateQuizValues.value.category);
};

const onSubmit = async () => {
  const { valid } = await validate();
  if (valid) {
    const id = await store.generateQuiz({
      amount: generateQuizValues.value.amount,
      category: +generateQuizValues.value.category || undefined,
      difficulty: generateQuizValues.value.difficulty || undefined,
      type: generateQuizValues.value.type || undefined
    });
    if (id) {
      await router.push({ name: ERoutesNames.QUIZ, params: { id } });
    }
  }
};

onMounted(async () => {
  await store.getCategories();
});
</script>

<template>
  <div class="centered-page">
    <div
      v-if="authStore.user"
      class="create-button"
      data-test="create-btn"
    >
      <AppButton
        full
        appearence="success"
        size="lg"
        :text="$t('create_quiz')"
        @click="router.push({ name: ERoutesNames.CREATE_QUIZ })"
      />
      <p>{{ $t('or') }}</p>
    </div>

    <form
      class="generation-form"
      @submit.prevent="onSubmit"
    >
      <h2 class="generation-form__title">{{ $t('generate_quiz') }}</h2>

      <AppSelect
        v-model="generateQuizValues.category"
        id="select_category"
        :options="store.questionCategories"
        :label="$t('select_category')"
        :disabled="store.isLoading"
        @change="onChangeCategory"
      />

      <AppSelect
        v-model="generateQuizValues.difficulty"
        id="select_difficulty"
        :options="difficultiesOptions"
        :label="$t('select_difficulty')"
        :disabled="store.isLoading"
      />

      <AppSelect
        v-model="generateQuizValues.type"
        id="select_questions_type"
        :options="questionTypeOptions"
        :label="$t('select_questions_type')"
        :disabled="store.isLoading"
      />

      <AppInput
        :key="maxQuestionsCount"
        v-model="generateQuizValues.amount"
        id="set_amount_of_questions"
        class="amount-input"
        name="questions-amount"
        type="number"
        full-width
        :rules="amountRules"
        :label="amountLabel"
        :disabled="store.isLoading"
      />

      <AppButton
        full
        type="submit"
        :text="$t('lets_go')"
        :isLoading="store.isLoading"
      />
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../assets/styles/vars';

.generation-form {
  max-width: 400px;
  width: 100%;
  background: $color-white;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 16px;
  box-shadow: $form-shadow;
  color: $color-blue;

  &__title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 16px;
    color: $color-white;
  }
}

.amount-input:deep(label) {
  text-align: center;
  margin-bottom: 10px;
}

.create-button {
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
  align-items: center;

  p {
    font-size: 24px;
  }
}
</style>
