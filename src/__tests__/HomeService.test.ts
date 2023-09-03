import { vi } from 'vitest';
import $api from '@/api/api';
import { HomeService } from '@/modules/home/HomeService';

describe('HomeService tests', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should return categories in correct format', async () => {
    vi.spyOn($api, 'get').mockImplementation(() => ({
      data: [
        {
          id: '1',
          name: 'category 1'
        },
        {
          id: '1',
          name: 'category 2'
        }
      ]
    }));

    const options = await HomeService.getCategories();

    expect(options).toStrictEqual([
      { name: 'All', value: '' },
      {
        value: '1',
        name: 'category 1'
      },
      {
        value: '1',
        name: 'category 2'
      }
    ]);
  });

  it('should return categories question counts in correct format', async () => {
    vi.spyOn($api, 'get').mockImplementation(() => ({
      data: {
        total_easy_question_count: 42,
        total_medium_question_count: 43,
        total_hard_question_count: 44,
        total_question_count: 45
      }
    }));

    const categoryQuestionsCount = await HomeService.getCategoryQuestionCount(
      '123'
    );

    expect(categoryQuestionsCount).toStrictEqual({
      easy: 42,
      medium: 43,
      hard: 44,
      all: 45
    });
  });

  it('should return default values if error in getCategoryQuestionCount method', async () => {
    vi.spyOn($api, 'get').mockImplementation(() => {
      throw new Error();
    });

    const categoryQuestionsCount = await HomeService.getCategoryQuestionCount(
      '123'
    );

    expect(categoryQuestionsCount).toStrictEqual({
      easy: 50,
      medium: 50,
      hard: 50,
      all: 50
    });
  });

  it('should call generateQuiz method with correct params', async () => {
    const apiMock = vi.spyOn($api, 'post').mockImplementation(() => {});

    const quizParams = {
      amount: 5
    };

    await HomeService.generateQuiz(quizParams);

    expect(apiMock).toHaveBeenCalledWith('/quizes/generate', quizParams);
  });
});
