import { useApiMethod } from '@/api/useApiMethod';
import { quizApi } from '@/api/apiInstances';
import { computed, ref } from 'vue';
import type {
  IGetQuizFormParams,
  TEditQuizParams,
  TQuizFormValues
} from '@/modules/quizes/domain/types';
import type { CreateQuizDto } from '@/api/swagger/Quizes/data-contracts';
import { mapQuizResponseToQuizForm } from '@/modules/quizes/helpers/mapers';
import { defineStore } from 'pinia';

export const useQuizFormStore = defineStore('quizFormStore', () => {
  const quizForm = ref<TQuizFormValues | null>();
  const isQuizLoading = ref<boolean>(false);
  const quizId = ref<string>('');

  const { call: createQuizApi, isLoading: isCreateQuizLoading } = useApiMethod(
    quizApi.createQuiz
  );

  const { call: editQuizApi, isLoading: isEditQuizLoading } = useApiMethod(
    quizApi.editQuiz
  );

  const { call: getQuiz } = useApiMethod(quizApi.getQuiz);

  const isLoading = computed(
    () => isCreateQuizLoading.value || isEditQuizLoading.value
  );

  const createQuiz = async (data: CreateQuizDto) => {
    const isCreated = await createQuizApi(data);
    return !!isCreated;
  };

  const editQuiz = async (data: TEditQuizParams) => {
    const isEdited = await editQuizApi({ ...data, id: quizId.value });
    return !!isEdited;
  };

  // TODO check on backend that quiz belongs to user
  const getQuizForm = async ({ quizId: id, userId }: IGetQuizFormParams) => {
    isQuizLoading.value = true;
    const quiz = await getQuiz(id);

    if (quiz?.userId !== userId || !quiz) {
      quizForm.value = null;
      isQuizLoading.value = false;
      return;
    }

    quizForm.value = mapQuizResponseToQuizForm(quiz);
    quizId.value = id;
    isQuizLoading.value = false;
  };

  return {
    isLoading,
    isQuizLoading,
    quizForm,
    quizId,
    createQuiz,
    editQuiz,
    getQuizForm
  };
});
