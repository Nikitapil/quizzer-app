import type {
  IQuizFormQuestion,
  IQuizFormValues,
  ISingleQuiz,
  ISingleQuizQuestion
} from '@/modules/quizes/domain/types';

const mapQuizQuestionsToFormQuestion = (
  questions: ISingleQuizQuestion[]
): IQuizFormQuestion[] => {
  return questions.map(({ question, correctAnswer, incorrectAnswers }) => ({
    question,
    correctAnswer,
    incorrectAnswers
  }));
};

export const mapQuizResponseToQuizForm = (
  quiz: ISingleQuiz
): IQuizFormValues => {
  const { name, isPrivate, questions } = quiz;
  return {
    name,
    isPrivate,
    questions: mapQuizQuestionsToFormQuestion(questions)
  };
};
