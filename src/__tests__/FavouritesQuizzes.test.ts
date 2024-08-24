import { createPinia, setActivePinia } from 'pinia';
import { vi } from 'vitest';
import { quizApi } from '@/api/apiInstances';
import { flushPromises, mount } from '@vue/test-utils';
import FavouritesQuizzes from '@/modules/quizes/pages/FavouritesQuizzes.vue';

describe('Favourites Quizzes', () => {
  const getFavoritesQuizesMock = vi.fn();
  quizApi.getFavouritesQuizes = getFavoritesQuizesMock;

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Should call get favorites quizes method on mounted', async () => {
    mount(FavouritesQuizzes);

    await flushPromises();

    expect(getFavoritesQuizesMock).toHaveBeenCalled();
  });
});
