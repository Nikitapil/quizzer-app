import { toRef, watch } from 'vue';

export const useDocTitle = (title: string) => {
  watch(
    toRef(title),
    () => {
      document.title = title ? `Quizzer | ${title}` : 'Quizzer';
    },
    { immediate: true }
  );
};
