import type {
  TQuizFormQuestion,
  TQuizFormValues
} from '@/modules/quizes/domain/types';
import type {
  QuizQuestionReturnDto,
  SingleQuizReturnDto
} from '@/api/swagger/Quizes/data-contracts';

const mapQuizQuestionsToFormQuestion = (
  questions: QuizQuestionReturnDto[]
): TQuizFormQuestion[] => {
  return questions.map(({ question, correctAnswer, incorrectAnswers }) => ({
    question,
    correctAnswer,
    incorrectAnswers
  }));
};

export const mapQuizResponseToQuizForm = (
  quiz: SingleQuizReturnDto
): TQuizFormValues => {
  const { name, isPrivate, questions } = quiz;
  return {
    name,
    isPrivate,
    questions: mapQuizQuestionsToFormQuestion(questions)
  };
};
