import { flushPromises, mount } from '@vue/test-utils';
import QuizzesListItem from '@/modules/quizes/components/QuizzesListItem.vue';
import { i18n } from '@/main';
import router from '@/router';
import { RouterLink } from 'vue-router';
import { ERoutesNames } from '@/router/routes-names';
import Tooltip from '@/components/Tooltip.vue';

describe('QuizzesList item tests', () => {
  let quiz;
  beforeEach(() => {
    quiz = {
      id: 'string-id',
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Test quiz',
      isPrivate: false,
      userId: 1,
      isInFavourites: false,
      questionsCount: 4,
      author: 'Test user',
      rating: null
    };
  });
  it('should not render quiz rating if it does not exists', () => {
    const wrapper = mount(QuizzesListItem, {
      global: {
        plugins: [i18n, router]
      },
      props: {
        quiz,
        userId: 0,
        isDeleteInProgress: false,
        isToggleFavouritesInProgress: false
      }
    });

    const rating = wrapper.find('[data-test="rating"]');

    expect(rating.exists()).toBe(false);
  });

  it('should render quiz rating if rating in quiz', () => {
    const wrapper = mount(QuizzesListItem, {
      global: {
        plugins: [i18n, router]
      },
      props: {
        quiz: { ...quiz, rating: 5 },
        userId: 0,
        isDeleteInProgress: false,
        isToggleFavouritesInProgress: false
      }
    });

    const rating = wrapper.find('[data-test="rating"]');

    expect(rating.exists()).toBe(true);
  });

  it('should not render quiz author if no author in quiz', () => {
    const wrapper = mount(QuizzesListItem, {
      global: {
        plugins: [i18n, router]
      },
      props: {
        quiz: { ...quiz, author: null },
        userId: 0,
        isDeleteInProgress: false,
        isToggleFavouritesInProgress: false
      }
    });

    const author = wrapper.find('[data-test="author"]');

    expect(author.exists()).toBe(false);
  });

  it('should render quiz author if author in quiz', async () => {
    const wrapper = mount(QuizzesListItem, {
      global: {
        plugins: [i18n, router]
      },
      props: {
        quiz: { ...quiz },
        userId: 0,
        isDeleteInProgress: false,
        isToggleFavouritesInProgress: false
      }
    });

    const author = wrapper.find('[data-test="author"]');

    expect(author.exists()).toBe(true);

    const authorLink = author.getComponent(RouterLink);

    await authorLink.trigger('click');

    await flushPromises();

    expect(router.currentRoute.value.name).toBe(ERoutesNames.USER_QUIZES);
    expect(router.currentRoute.value.params.id).toBe('1');
  });

  it('should not render fav button if no userId', async () => {
    const wrapper = mount(QuizzesListItem, {
      global: {
        plugins: [i18n, router]
      },
      props: {
        quiz: { ...quiz },
        userId: 0,
        isDeleteInProgress: false,
        isToggleFavouritesInProgress: false
      }
    });

    const favBtn = wrapper.find('[data-test="fav-button"]');

    expect(favBtn.exists()).toBe(false);
  });

  it('should render fav button userId', async () => {
    const wrapper = mount(QuizzesListItem, {
      global: {
        plugins: [i18n, router]
      },
      props: {
        quiz,
        userId: 1,
        isDeleteInProgress: false,
        isToggleFavouritesInProgress: false
      }
    });

    const favBtn = wrapper.find('[data-test="fav-button"]');

    expect(favBtn.exists()).toBe(true);

    await favBtn.trigger('click');

    expect(wrapper.emitted('toggleFavourites')).toBeTruthy();
    expect(wrapper.emitted('toggleFavourites')?.[0]).toEqual([quiz]);

    const favblock = wrapper.get('[data-test="fav-block"]');

    let favTooltip = favblock.getComponent(Tooltip);

    expect(favTooltip.props().tip).toBe('Add to favourites');

    wrapper.props().quiz.isInFavourites = true;

    await flushPromises();

    favTooltip = favblock.getComponent(Tooltip);
    expect(favTooltip.props().tip).toBe('Remove from favourites');
  });

  it('should not render userBtns if userIds are not equal', async () => {
    const wrapper = mount(QuizzesListItem, {
      global: {
        plugins: [i18n, router]
      },
      props: {
        quiz: { ...quiz },
        userId: 0,
        isDeleteInProgress: false,
        isToggleFavouritesInProgress: false
      }
    });

    const editBtn = wrapper.find('[data-test="edit"]');
    const deleteBtn = wrapper.find('[data-test="edit"]');

    expect(editBtn.exists()).toBe(false);
    expect(deleteBtn.exists()).toBe(false);
  });

  it('should  render userBtns if userIds are equal', async () => {
    const wrapper = mount(QuizzesListItem, {
      global: {
        plugins: [i18n, router]
      },
      props: {
        quiz: { ...quiz },
        userId: 1,
        isDeleteInProgress: false,
        isToggleFavouritesInProgress: false
      }
    });

    const editBtn = wrapper.find('[data-test="edit"]');
    const deleteBtn = wrapper.find('[data-test="edit"]');

    expect(editBtn.exists()).toBe(true);
    expect(deleteBtn.exists()).toBe(true);
  });

  it('should  redirect to edit quiz page on edit click', async () => {
    const wrapper = mount(QuizzesListItem, {
      global: {
        plugins: [i18n, router]
      },
      props: {
        quiz: { ...quiz },
        userId: 1,
        isDeleteInProgress: false,
        isToggleFavouritesInProgress: false
      }
    });

    const editBtn = wrapper.find('[data-test="edit"]');

    expect(editBtn.exists()).toBe(true);

    await editBtn.trigger('click');

    await flushPromises();

    expect(router.currentRoute.value.name).toBe(ERoutesNames.EDIT_QUIZ);
    expect(router.currentRoute.value.params.id).toBe('string-id');
  });

  it('should  open delete modal', async () => {
    const wrapper = mount(QuizzesListItem, {
      global: {
        plugins: [i18n, router]
      },
      props: {
        quiz: { ...quiz },
        userId: 1,
        isDeleteInProgress: false,
        isToggleFavouritesInProgress: false
      }
    });

    const deleteBtn = wrapper.find('[data-test="delete"]');

    await deleteBtn.trigger('click');

    await flushPromises();

    const deleteModal = wrapper.find('[data-test="modal"]');

    expect(deleteModal.exists()).toBe(true);
  });

  it('should open play quiz', async () => {
    const wrapper = mount(QuizzesListItem, {
      global: {
        plugins: [i18n, router]
      },
      props: {
        quiz: { ...quiz },
        userId: 1,
        isDeleteInProgress: false,
        isToggleFavouritesInProgress: false
      }
    });

    const playBtn = wrapper.find('[data-test="play"]');

    await playBtn.trigger('click');

    await flushPromises();

    expect(router.currentRoute.value.name).toBe(ERoutesNames.QUIZ);
    expect(router.currentRoute.value.params.id).toBe('string-id');
  });
});
