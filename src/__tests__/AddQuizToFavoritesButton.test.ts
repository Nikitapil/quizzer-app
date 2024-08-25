import { vi } from 'vitest';
import { quizApi } from '@/api/apiInstances';
import { flushPromises, mount } from '@vue/test-utils';

import type { IQuizWithInFavoritesFlag } from '@/modules/shared/AddQuizToFavoritesButton/domain';

import AddQuizToFavoritesButton from '@/modules/shared/AddQuizToFavoritesButton/AddQuizToFavoritesButton.vue';

describe('AddQuizToFavoritesButton', () => {
  quizApi.toggleQuizInFavourites = vi.fn();

  it('should toggle favorites correctly', async () => {
    const quiz: IQuizWithInFavoritesFlag = {
      id: '1',
      isInFavourites: false
    };
    const wrapper = mount(AddQuizToFavoritesButton, {
      props: {
        quiz,
        withText: true
      }
    });
    await flushPromises();
    const btn = wrapper.find('button');

    await btn.trigger('click');

    await flushPromises();

    expect(quiz.isInFavourites).toBe(true);
  });
});
