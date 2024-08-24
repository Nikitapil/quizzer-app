import { vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

import { quizApi } from '@/api/apiInstances';
import { testRouter } from '../../vitest.setup';
import { BREADCRUMBS } from '@/modules/app/domain/breadcrumbs';

import { AllQuizesReturnDtoMock } from '@/api/swagger/Quizes/mock';
import { UserReturnDtoMock } from '@/api/swagger/Auth/mock';

import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { useAppStore } from '@/modules/app/store/AppStore';

import UsersQuizes from '@/modules/quizes/pages/UsersQuizes.vue';

describe('UserQuizes', () => {
  const userQuizerResponseMock = vi
    .fn()
    .mockResolvedValue(AllQuizesReturnDtoMock.create({ totalCount: 10 }));
  quizApi.getQuizesByUser = userQuizerResponseMock;

  beforeEach(() => {
    setActivePinia(createPinia());
    userQuizerResponseMock.mockReset();
  });

  it('should get user quizzes on mount and if id changed', async () => {
    mount(UsersQuizes);

    await flushPromises();

    await testRouter.push({ params: { id: 2 } });
    expect(userQuizerResponseMock).toHaveBeenCalledTimes(2);
  });

  it('should detect myQuizzes page', async () => {
    const user = UserReturnDtoMock.create();
    await testRouter.push({ params: { id: user.id } });
    const authStore = useAuthStore();
    authStore.user = user;
    mount(UsersQuizes);

    await flushPromises();

    const appStore = useAppStore();

    expect(appStore.breadcrumbs.at(-1)).toEqual(BREADCRUMBS.MY_QUIZZES);
  });
});
