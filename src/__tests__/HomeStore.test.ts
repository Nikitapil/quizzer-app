import { createTestingPinia } from '@pinia/testing';
import { useHomeStore } from '@/modules/home/store/HomeStore';
import { flushPromises } from '@vue/test-utils';
import { HomeService } from '@/modules/home/HomeService';
import { beforeAll } from 'vitest';
import type { TestingPinia } from '@pinia/testing';

describe('HomeStore tests', () => {
  let pinia: TestingPinia;
  let store: ReturnType<typeof useHomeStore>;

  beforeAll(() => {
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
        value: '1',
        name: 'category 2'
      }
    ];

    HomeService.getCategories = async () => options;

    await store.getCategories();

    await flushPromises();

    expect(store.questionCategories).toStrictEqual(options);

    expect(store.isCategoriesLoading).toBe(false);
  });
});
