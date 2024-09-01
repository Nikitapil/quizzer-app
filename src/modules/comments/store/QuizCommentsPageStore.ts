import { ref } from 'vue';
import { defineStore } from 'pinia';

import type {
  EditQuizCommentDto,
  GetQuizCommentsParams,
  PlayQuizDto
} from '@/api/swagger/Quizes/data-contracts';
import type { IQuizComment } from '@/modules/comments/domain';

import { useApiMethod } from '@/api/useApiMethod';
import { extendQuizCommentWithClientData } from '@/modules/comments/mappers';

import { quizApi, quizCommentsApi } from '@/api/apiInstances';
import { DEFAULT_COMMENTS_REQUEST_LIMIT } from '@/modules/comments/constants';

export type TLoadQuizCommentsParams = Omit<GetQuizCommentsParams, 'quizId'>;

export const useQuizCommentsPageStore = defineStore(
  'QuizCommentsPageStore',
  () => {
    const quiz = ref<PlayQuizDto | null>(null);
    const quizComments = ref<IQuizComment[]>([]);
    const totalQuizCommentsCount = ref<number>(0);

    const { call: getQuiz, isLoading: isQuizLoading } = useApiMethod(
      quizApi.getPlayQuiz
    );

    const { call: getQuizComments, isLoading: isQuizCommentsLoading } =
      useApiMethod(quizCommentsApi.getQuizComments);

    const {
      call: createQuizCommentApi,
      isLoading: isCreateQuizCommentInProgress
    } = useApiMethod(quizCommentsApi.createQuizComment);

    const { call: editQuizCommentApi, isLoading: isEditQuizCommentInProgress } =
      useApiMethod(quizCommentsApi.editQuizComment);

    const {
      call: deleteQuizCommentApi,
      isLoading: isQuizCommentDeleteInProgress
    } = useApiMethod(quizCommentsApi.deleteQuizComment);

    const createQuizComment = async (text: string) => {
      if (!quiz.value) {
        return;
      }
      await createQuizCommentApi({ quizId: quiz.value.id, text });
      totalQuizCommentsCount.value++;
    };

    const editQuizComment = async (dto: EditQuizCommentDto) => {
      const quizCommentIndex = quizComments.value.findIndex(
        (comment) => comment.id === dto.id
      );
      if (quizCommentIndex === -1) {
        return;
      }

      quizComments.value[quizCommentIndex].isEditInProgress = true;

      const updated = await editQuizCommentApi(dto);

      if (updated) {
        quizComments.value[quizCommentIndex] =
          extendQuizCommentWithClientData(updated);
      } else {
        quizComments.value[quizCommentIndex].isEditInProgress = false;
      }
    };

    const loadQuizComments = async ({
      page,
      limit
    }: TLoadQuizCommentsParams) => {
      if (!quiz.value) {
        return;
      }
      const response = await getQuizComments({
        page,
        limit,
        quizId: quiz.value.id
      });

      quizComments.value = (response?.comments || []).map(
        extendQuizCommentWithClientData
      );
      totalQuizCommentsCount.value = response?.totalCount || 0;
    };

    const deleteQuizComment = async (id: string) => {
      return await deleteQuizCommentApi(id);
    };

    const init = async (quizId: string) => {
      quiz.value = await getQuiz(quizId);
      await loadQuizComments({
        page: 1,
        limit: DEFAULT_COMMENTS_REQUEST_LIMIT
      });
    };

    return {
      quiz,
      quizComments,
      isQuizCommentsLoading,
      isQuizLoading,
      isCreateQuizCommentInProgress,
      totalQuizCommentsCount,
      isQuizCommentDeleteInProgress,
      isEditQuizCommentInProgress,
      loadQuizComments,
      init,
      createQuizComment,
      deleteQuizComment,
      editQuizComment
    };
  }
);
