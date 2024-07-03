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
        id="select_category"
        v-model="generateQuizValues.category"
        :options="store.questionCategories"
        :label="$t('select_category')"
        :disabled="store.isLoading"
        @change="onChangeCategory"
      />
      <AppSelect
        id="select_difficulty"
        v-model="generateQuizValues.difficulty"
        :options="difficultiesOptions"
        :label="$t('select_difficulty')"
        :disabled="store.isLoading"
      />
      <AppSelect
        id="select_questions_type"
        v-model="generateQuizValues.type"
        :options="questionTypeOptions"
        :label="$t('select_questions_type')"
        :disabled="store.isLoading"
      />
      <FormField
        name="questions-amount"
        :rules="{ max_value: maxQuestionsCount, min_value: 1, required: true }"
        :modelValue="generateQuizValues.amount"
      >
        <template #default="{ invalid }">
          <div class="amount-input">
            <AppInput
              id="set_amount_of_questions"
              v-model="generateQuizValues.amount"
              type="number"
              :label="amountLabel"
              :disabled="store.isLoading"
              :is-error="invalid"
            />
          </div>
        </template>
      </FormField>
      <AppButton
        full
        type="submit"
        :text="$t('lets_go')"
        :disabled="store.isLoading"
      />
    </form>
  </div>
</template>
<script setup lang="ts">
import { useDocTitle } from '@/composables/useDocTitle';
import AppSelect from '@/components/inputs/AppSelect.vue';
import {
  difficultiesOptions,
  questionTypeOptions
} from '@/modules/home/domain/constants';
import AppInput from '@/components/inputs/AppInput.vue';
import { useHomeStore } from '@/modules/home/store/HomeStore';
import { computed, onMounted, ref } from 'vue';
import type {
  IGenerateQuizValues,
  IQuestionsCount
} from '@/modules/home/domain/types';
import { useI18n } from 'vue-i18n';
import FormField from '@/components/inputs/FormField.vue';
import AppButton from '@/components/AppButton.vue';
import { useRouter } from 'vue-router';
import { ERoutesNames } from '@/router/routes-names';
import { useBreadCrumbs } from '@/composables/useBreadCrumbs';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { useFormValidate } from '@/composables/useFormValidate';

useBreadCrumbs([]);

const { t } = useI18n();

useDocTitle('');

const store = useHomeStore();
const authStore = useAuthStore();
const router = useRouter();

const { validate } = useFormValidate();

const generateQuizValues = ref<IGenerateQuizValues>({
  category: '',
  difficulty: '',
  type: '',
  amount: 50
});

const maxQuestionsCount = computed(() => {
  return (
    store.categoryQuestionsCount[
      generateQuizValues.value.difficulty as keyof IQuestionsCount
    ] || store.categoryQuestionsCount.all
  );
});

const amountLabel = computed(() => {
  return `${t('set_amount_of_questions')} (max: ${maxQuestionsCount.value})`;
});

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
<style lang="scss" scoped>
@import '../../../assets/styles/colors';

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
  box-shadow: $shadow-black-common, inset 0 65px 45px -15px $color-blue;
  color: $color-blue;

  &__title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 16px;
    color: $color-white;
  }
}

.amount-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
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
