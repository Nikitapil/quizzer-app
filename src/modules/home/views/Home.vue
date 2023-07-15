<template>
  <div class="home-page">
    <form class="generation-form">
      <h2 class="generation-form__title">{{ $t('generate_quiz') }}</h2>
      <AppSelect
        id="select_category"
        v-model="generateQuizValues.category"
        :options="store.questionCategories"
        :label="$t('select_category')"
        :disabled="store.isCategoriesLoading"
        @change="onChangeCategory"
      />
      <AppSelect
        id="select_difficulty"
        v-model="generateQuizValues.difficulty"
        :options="difficultiesOptions"
        :label="$t('select_difficulty')"
        :disabled="store.isCategoriesLoading"
      />
      <AppSelect
        id="select_questions_type"
        v-model="generateQuizValues.questionsType"
        :options="questionTypeOptions"
        :label="$t('select_questions_type')"
        :disabled="store.isCategoriesLoading"
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
              :disabled="store.isCategoriesLoading"
              :is-error="invalid"
            />
          </div>
        </template>
      </FormField>
      <AppButton
        full
        :text="$t('lets_go')"
        :disabled="store.isCategoriesLoading"
        @click="onSubmit"
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
import {
  IGenerateQuizValues,
  IQuestionsCount
} from '@/modules/home/domain/types';
import { useI18n } from 'vue-i18n';
import FormField from '@/components/inputs/FormField.vue';
import { useForm } from 'vee-validate';
import AppButton from '@/components/AppButton.vue';

const { t } = useI18n();

useDocTitle('');

const store = useHomeStore();

const { validate } = useForm();

const generateQuizValues = ref<IGenerateQuizValues>({
  category: '',
  difficulty: '',
  questionsType: '',
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
  const isValid = await validate();
  if (isValid.valid) {
    const id = await store.generateQuiz({
      ...generateQuizValues.value,
      category: +generateQuizValues.value.category
    });
    console.log(id);
  }
};

onMounted(async () => {
  await store.getCategories();
});
</script>
<style lang="scss" scoped>
@import '../../../assets/styles/vars';
@import '../../../assets/styles/colors';

.home-page {
  width: 100%;
  min-height: $main-height;
  display: flex;
  align-items: center;
  justify-content: center;
}

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
</style>
