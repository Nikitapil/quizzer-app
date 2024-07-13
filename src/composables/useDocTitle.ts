import { onMounted } from 'vue';

export const useDocTitle = (title: string) => {
  onMounted(() => {
    document.title = title ? `Quizzer | ${title}` : 'Quizzer';
  });
};
