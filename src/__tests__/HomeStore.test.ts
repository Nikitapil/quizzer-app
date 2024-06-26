import { createTestingPinia } from '@pinia/testing';
import { useHomeStore } from '@/modules/home/store/HomeStore';
import { flushPromises } from '@vue/test-utils';
import { beforeAll } from 'vitest';
import type { TestingPinia } from '@pinia/testing';
import { quizApi } from '@/api/apiInstances';

describe('HomeStore tests', () => {
  const categories = [
    {
      id: 1,
      name: 'category 1'
    },
    {
      id: 2,
      name: 'category 2'
    }
  ];

  let pinia: TestingPinia;
  let store: ReturnType<typeof useHomeStore>;

  beforeAll(() => {
    quizApi.getCategories = async () => categories;
    pinia = createTestingPinia({
      stubActions: false
    });

    store = useHomeStore(pinia);
  });

  it('should set correct categories in getCategories method', async () => {
    const options = [
      { name: 'All', value: '' },
      {
        value: '1',
        name: 'category 1'
      },
      {
        value: '2',
        name: 'category 2'
      }
    ];

    await store.getCategories();

    await flushPromises();

    expect(store.questionCategories).toStrictEqual(options);

    expect(store.isLoading).toBe(false);
  });
});
