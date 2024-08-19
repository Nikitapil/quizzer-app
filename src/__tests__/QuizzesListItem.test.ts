import { vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import QuizzesListItem from '@/modules/quizes/components/QuizzesListItem.vue';
import { testRouter } from '../../vitest.setup';
import { QuizDtoMock } from '@/api/swagger/Quizes/mock';
import { createPinia, setActivePinia } from 'pinia';

describe('QuizzesList item tests', () => {
  const ratingSelector = '[data-test="rating"]';
  const authorSelector = '[data-test="author"]';
  const editButtonSelector = '[data-test="edit"]';
  const deleteButtonSelector = '[data-test="delete"]';

  const defaultProps = {
    userId: 0,
    isDeleteInProgress: false,
    isToggleFavouritesInProgress: false,
    isAdmin: false
  };

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should not render quiz rating if it does not exists', () => {
    const wrapper = mount(QuizzesListItem, {
      props: {
        quiz: QuizDtoMock.create({ rating: null }),
        ...defaultProps
      }
    });

    const rating = wrapper.find(ratingSelector);

    expect(rating.exists()).toBe(false);
  });

  it('should render quiz rating if rating in quiz', () => {
    const wrapper = mount(QuizzesListItem, {
      props: {
        quiz: QuizDtoMock.create({ rating: 5 }),
        ...defaultProps
      }
    });

    const rating = wrapper.find(ratingSelector);

    expect(rating.exists()).toBe(true);
  });

  it('should not render quiz author if no author in quiz', () => {
    const wrapper = mount(QuizzesListItem, {
      props: {
        quiz: QuizDtoMock.create({ author: null }),
        ...defaultProps
      }
    });

    const author = wrapper.find(authorSelector);

    expect(author.exists()).toBe(false);
  });

  it('should render quiz author if author in quiz', async () => {
    const wrapper = mount(QuizzesListItem, {
      props: {
        quiz: QuizDtoMock.create(),
        ...defaultProps
      }
    });

    const author = wrapper.find(authorSelector);

    expect(author.exists()).toBe(true);
  });

  it('should not render fav button if no userId', async () => {
    const wrapper = mount(QuizzesListItem, {
      props: {
        quiz: QuizDtoMock.create(),
        ...defaultProps
      }
    });

    const favBtn = wrapper.find('[data-test="fav-button"]');

    expect(favBtn.exists()).toBe(false);
  });

  it('should not render userBtns if canEdit and canDelete false', async () => {
    const wrapper = mount(QuizzesListItem, {
      props: {
        quiz: QuizDtoMock.create({ canEdit: false, canDelete: false }),
        ...defaultProps
      }
    });

    const editBtn = wrapper.find(editButtonSelector);
    const deleteBtn = wrapper.find(deleteButtonSelector);

    expect(editBtn.exists()).toBe(false);
    expect(deleteBtn.exists()).toBe(false);
  });

  it('should  render userBtns if canEdit and canDelete is true', async () => {
    const wrapper = mount(QuizzesListItem, {
      props: {
        ...defaultProps,
        quiz: QuizDtoMock.create({ canEdit: true, canDelete: true })
      }
    });

    const editBtn = wrapper.find(editButtonSelector);
    const deleteBtn = wrapper.find(deleteButtonSelector);

    expect(editBtn.exists()).toBe(true);
    expect(deleteBtn.exists()).toBe(true);
  });

  it('should open delete modal', async () => {
    const wrapper = mount(QuizzesListItem, {
      props: {
        ...defaultProps,
        quiz: QuizDtoMock.create({ canDelete: true })
      }
    });

    const deleteBtn = wrapper.find(deleteButtonSelector);

    await deleteBtn.trigger('click');

    await flushPromises();

    const deleteModal = wrapper.find('[data-test="modal"]');

    expect(deleteModal.exists()).toBe(true);
  });

  it('should open play quiz', async () => {
    const routerSpy = vi.spyOn(testRouter, 'push');
    const wrapper = mount(QuizzesListItem, {
      props: {
        ...defaultProps,
        quiz: QuizDtoMock.create()
      }
    });

    const playBtn = wrapper.find('[data-test="play"]');

    await playBtn.trigger('click');

    await flushPromises();

    expect(routerSpy).toHaveBeenCalled();
  });

  it('should open edit quiz', async () => {
    const routerSpy = vi.spyOn(testRouter, 'push');
    const wrapper = mount(QuizzesListItem, {
      props: {
        ...defaultProps,
        quiz: QuizDtoMock.create({ canEdit: true })
      }
    });

    const editBtn = wrapper.find(editButtonSelector);

    await editBtn.trigger('click');

    await flushPromises();

    expect(routerSpy).toHaveBeenCalled();
  });
});
