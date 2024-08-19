import { vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

import { useAuthStore } from '@/modules/auth/store/AuthStore';

import { testRouter } from '../../vitest.setup';

import { quizApi } from '@/api/apiInstances';
import {
  CategoryCountReturnDtoMock,
  QuizCategoriesReturnDtoMock,
  ReturnGeneratedQuizDtoMock
} from '@/api/swagger/Quizes/mock';
import { UserReturnDtoMock } from '@/api/swagger/Auth/mock';

import Home from '@/modules/home/pages/Home.vue';

describe('Home component tests', () => {
  const createButtonSelector = '[data-test="create-btn"]';
  const getCategoriesMock = vi
    .fn()
    .mockResolvedValue(QuizCategoriesReturnDtoMock.createMany(4));

  const generateQuizMock = vi
    .fn()
    .mockResolvedValue(ReturnGeneratedQuizDtoMock.create());

  const getCategoriesQuestionCountMock = vi
    .fn()
    .mockResolvedValue(CategoryCountReturnDtoMock.create());

  quizApi.getCategories = getCategoriesMock;
  quizApi.generateQuiz = generateQuizMock;
  quizApi.getCategoriesQuestionCount = getCategoriesQuestionCountMock;

  setActivePinia(createPinia());

  beforeEach(() => {
    generateQuizMock.mockClear();
  });

  it('should render only generation form', async () => {
    const wrapper = mount(Home);

    await flushPromises();

    const createBtn = wrapper.find(createButtonSelector);
    const form = wrapper.find('form');

    expect(createBtn.exists()).toBe(false);
    expect(form.exists()).toBe(true);
  });

  it('should render create btn if authenticated', async () => {
    const wrapper = mount(Home);

    const authStore = useAuthStore();

    authStore.user = UserReturnDtoMock.create();

    await flushPromises();

    const createBtn = wrapper.find(createButtonSelector);
    const form = wrapper.find('form');

    expect(createBtn.exists()).toBe(true);
    expect(form.exists()).toBe(true);
  });

  it('should redirect to quiz page after generating', async () => {
    const wrapper = mount(Home);

    const routerSpy = vi.spyOn(testRouter, 'push');

    await flushPromises();

    const form = wrapper.find('form');

    await form.trigger('submit');

    await flushPromises();

    expect(routerSpy).toHaveBeenCalled();
  });

  it('should not redirect to quiz page after unsuccess generating', async () => {
    generateQuizMock.mockResolvedValueOnce(null);
    const wrapper = mount(Home);

    const routerSpy = vi.spyOn(testRouter, 'push');

    await flushPromises();

    const form = wrapper.find('form');

    await form.trigger('submit');

    await flushPromises();

    expect(routerSpy).not.toHaveBeenCalled();
  });

  it('should validate correctly', async () => {
    const wrapper = mount(Home);

    await flushPromises();

    const amountInput = wrapper.find('[data-test="app-input"]');

    await amountInput.setValue('0');

    await flushPromises();

    const form = wrapper.find('form');

    await form.trigger('submit');

    expect(generateQuizMock).not.toHaveBeenCalled();
  });

  it('should validate maxCount correctly', async () => {
    getCategoriesQuestionCountMock.mockResolvedValue(
      CategoryCountReturnDtoMock.create({ total_easy_question_count: 10 })
    );

    const wrapper = mount(Home);

    await flushPromises();

    const difficultySelect = wrapper.find('#select_difficulty');

    await difficultySelect.setValue('easy');

    const amountInput = wrapper.find('[data-test="app-input"]');

    await amountInput.setValue('11');

    await flushPromises();

    const form = wrapper.find('form');

    await form.trigger('submit');

    expect(generateQuizMock).not.toHaveBeenCalled();
  });

  it('should validate default maxCount correctly', async () => {
    getCategoriesQuestionCountMock.mockResolvedValue(
      CategoryCountReturnDtoMock.create({ total_question_count: 10 })
    );

    const wrapper = mount(Home);

    await flushPromises();

    const amountInput = wrapper.find('[data-test="app-input"]');

    await amountInput.setValue('11');

    await flushPromises();

    const form = wrapper.find('form');

    await form.trigger('submit');

    expect(generateQuizMock).not.toHaveBeenCalled();
  });

  it('should change category correctly', async () => {
    const wrapper = mount(Home);

    await flushPromises();

    const categorySelect = wrapper.find('[data-test="app-select"]');

    await categorySelect.setValue('1');

    await flushPromises();

    expect(getCategoriesQuestionCountMock).toHaveBeenCalled();
  });
});
