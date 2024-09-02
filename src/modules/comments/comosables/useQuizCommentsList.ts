import { computed, ref } from 'vue';

import type { EditQuizCommentDto } from '@/api/swagger/Quizes/data-contracts';
import type { IQuizComment } from '@/modules/comments/domain';

import { useApiMethod } from '@/api/useApiMethod';
import { extendQuizCommentWithClientData } from '@/modules/comments/mappers';

import { quizCommentsApi } from '@/api/apiInstances';
import { DEFAULT_COMMENTS_REQUEST_LIMIT } from '@/modules/comments/constants';

interface IUseQuizCommentsParams {
  quizId: string;
  parentComment?: IQuizComment;
}

export const useQuizCommentsList = ({
  quizId,
  parentComment
}: IUseQuizCommentsParams) => {
  const quizComments = ref<IQuizComment[]>([]);
  const totalQuizCommentsCount = ref<number>(0);
  const page = ref(1);
  const limit = ref(DEFAULT_COMMENTS_REQUEST_LIMIT);

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

  const replyToId = computed(() => parentComment?.id);

  const loadQuizComments = async () => {
    const response = await getQuizComments({
      page: page.value,
      limit: limit.value,
      replyToId: replyToId.value,
      quizId
    });

    quizComments.value = (response?.comments || []).map(
      extendQuizCommentWithClientData
    );
    totalQuizCommentsCount.value = response?.totalCount || 0;
  };

  const loadMoreQuizComments = async () => {
    page.value++;
    const response = await getQuizComments({
      page: page.value,
      limit: limit.value,
      replyToId: replyToId.value,
      quizId
    });

    if (response?.comments.length) {
      quizComments.value.push(
        ...(response?.comments || []).map(extendQuizCommentWithClientData)
      );
    }
  };

  const onChangePage = async (p: number) => {
    page.value = p;
    await loadQuizComments();
  };

  const createQuizComment = async (text: string) => {
    await createQuizCommentApi({ quizId, text, replyToId: replyToId.value });
    totalQuizCommentsCount.value++;
    if (parentComment) {
      parentComment.repliesCount++;
    }
    await onChangePage(1);
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

  const deleteQuizComment = async (id: string) => {
    const isDeleted = await deleteQuizCommentApi(id);
    if (isDeleted) {
      if (parentComment) {
        parentComment.repliesCount--;
      }
      await onChangePage(1);
    }
  };

  const init = async () => {
    await loadQuizComments();
  };

  return {
    page,
    limit,
    quizComments,
    isQuizCommentsLoading,
    isCreateQuizCommentInProgress,
    totalQuizCommentsCount,
    isQuizCommentDeleteInProgress,
    isEditQuizCommentInProgress,
    loadQuizComments,
    init,
    createQuizComment,
    deleteQuizComment,
    editQuizComment,
    onChangePage,
    loadMoreQuizComments
  };
};
